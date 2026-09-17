"""
FastAPI server wrapping the existing EWasteEstimator for image-based detection.
Runs on http://localhost:8000 — does NOT modify ewaste_detct.py.

Usage:
    cd backend
    pip install -r requirements.txt
    uvicorn server:app --host 0.0.0.0 --port 8000 --reload
"""

import sys
import os
import io
import base64
from contextlib import asynccontextmanager

import cv2
import numpy as np
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# ---------------------------------------------------------------------------
# Import EWasteEstimator from the project root (parent directory)
# ---------------------------------------------------------------------------
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, PROJECT_ROOT)

from ewaste_detct import EWasteEstimator, EWASTE_CONFIG, compute_estimate  # noqa: E402

# ---------------------------------------------------------------------------
# Global estimator instance (loaded once at startup)
# ---------------------------------------------------------------------------
estimator: EWasteEstimator = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize the YOLO model once when the server starts."""
    global estimator
    weights_candidate = os.path.join(os.path.dirname(__file__), "yolov8m.pt")
    if not os.path.exists(weights_candidate):
        weights_candidate = os.path.join(PROJECT_ROOT, "yolov8m.pt")
    if not os.path.exists(weights_candidate):
        weights_candidate = "yolov8m.pt"

    print(f"[FastAPI] Loading EWasteEstimator model from {weights_candidate}...")
    estimator = EWasteEstimator(
        weights_path=weights_candidate,
        conf_threshold=0.10,
        iou_threshold=0.50,
        imgsz=1280,
    )
    print("[FastAPI] Model loaded and ready.")
    yield
    print("[FastAPI] Shutting down.")


app = FastAPI(
    title="E-Waste Weight & Payout Estimator API",
    description="YOLOv8-powered e-waste detection with weight and INR payout estimation",
    version="1.0.0",
    lifespan=lifespan,
)

# ---------------------------------------------------------------------------
# CORS — allow the Vite dev server
# ---------------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------------
# Health check
# ---------------------------------------------------------------------------
@app.get("/api/health")
async def health():
    return {"status": "ok", "model_loaded": estimator is not None}


# ---------------------------------------------------------------------------
# Main estimation endpoint
# ---------------------------------------------------------------------------
@app.post("/api/estimate")
async def estimate_ewaste(image: UploadFile = File(...)):
    """
    Accept an uploaded image, run multi-scale YOLOv8 detection,
    and return structured weight + payout estimation.
    """
    if estimator is None:
        raise HTTPException(status_code=503, detail="Model not loaded yet")

    # Validate content type
    content_type = image.content_type or ""
    if not content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail=f"Expected an image file, got: {content_type}",
        )

    # Read and decode image
    try:
        raw_bytes = await image.read()
        np_arr = np.frombuffer(raw_bytes, np.uint8)
        frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        if frame is None:
            raise ValueError("cv2.imdecode returned None")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to decode image: {e}")

    # Run tiled detection (writes annotations onto frame in-place)
    try:
        annotated_frame = estimator.detect_image_tiled(frame)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Detection failed: {e}")

    counts = estimator.latest_frame_counts
    active_counts = {k: v for k, v in counts.items() if v > 0}
    totals = compute_estimate(counts)

    # Build per-category breakdown
    breakdown = []
    for item_key, count in active_counts.items():
        cfg = EWASTE_CONFIG.get(item_key)
        if not cfg:
            continue
        breakdown.append({
            "category": cfg["name"],
            "count": count,
            "avg_weight_kg": round(count * cfg["avg_wt"], 2),
            "rate_per_kg": cfg["rate_per_kg"],
            "estimated_inr": round(count * cfg["avg_wt"] * cfg["rate_per_kg"], 0),
        })

    # Encode annotated image as base64 JPEG
    _, jpeg_buffer = cv2.imencode(".jpg", annotated_frame, [cv2.IMWRITE_JPEG_QUALITY, 85])
    annotated_b64 = base64.b64encode(jpeg_buffer.tobytes()).decode("utf-8")

    total_items = sum(active_counts.values())

    return JSONResponse(content={
        "success": True,
        "total_items": total_items,
        "breakdown": breakdown,
        "weight_bracket": {
            "min_kg": round(totals["min_wt"], 2),
            "avg_kg": round(totals["avg_wt"], 2),
            "max_kg": round(totals["max_wt"], 2),
        },
        "payout_bracket": {
            "min_inr": round(totals["min_payout"], 0),
            "expected_inr": round(totals["expected_payout"], 0),
            "max_inr": round(totals["max_payout"], 0),
        },
        "annotated_image": f"data:image/jpeg;base64,{annotated_b64}",
    })
