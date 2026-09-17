import argparse
import os
import time
from datetime import datetime
from typing import Dict, List, Tuple

import cv2
import numpy as np
import torch
from ultralytics import YOLO

# ---------------------------------------------------------------------------
# Hardware Acceleration Verification
# ---------------------------------------------------------------------------
print("=" * 70)
print(f"CUDA Available : {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"GPU Device     : {torch.cuda.get_device_name(0)}")
    print(f"CUDA Version   : {torch.version.cuda}")
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Active Engine  : {device}")
print("=" * 70 + "\n")

# ---------------------------------------------------------------------------
# E-Waste Configuration (Weights in kg, Rates in INR / kg)
# ---------------------------------------------------------------------------
EWASTE_CONFIG = {
    "cell phone": {"name": "Mobile Phone", "min_wt": 0.12, "avg_wt": 0.18, "max_wt": 0.25, "rate_per_kg": 400},
    "laptop": {"name": "Laptop", "min_wt": 1.60, "avg_wt": 2.10, "max_wt": 2.60, "rate_per_kg": 320},
    "tv": {"name": "Monitor / Screen", "min_wt": 4.50, "avg_wt": 7.00, "max_wt": 12.00, "rate_per_kg": 40},
    "keyboard": {"name": "Keyboard", "min_wt": 0.50, "avg_wt": 0.80, "max_wt": 1.10, "rate_per_kg": 60},
    "mouse": {"name": "Mouse", "min_wt": 0.08, "avg_wt": 0.12, "max_wt": 0.18, "rate_per_kg": 50},
    "motherboard": {"name": "Motherboard", "min_wt": 0.45, "avg_wt": 0.60, "max_wt": 0.85, "rate_per_kg": 480},
    "power_supply": {"name": "SMPS / PSU", "min_wt": 1.10, "avg_wt": 1.40, "max_wt": 1.80, "rate_per_kg": 120},
    "router": {"name": "Router / Modem", "min_wt": 0.35, "avg_wt": 0.55, "max_wt": 0.85, "rate_per_kg": 180},
    "printer": {"name": "Printer / Scanner", "min_wt": 4.20, "avg_wt": 6.00, "max_wt": 8.50, "rate_per_kg": 70},
    "charger": {"name": "Charger / Adapter", "min_wt": 0.12, "avg_wt": 0.25, "max_wt": 0.45, "rate_per_kg": 120},
    "speaker": {"name": "Speaker", "min_wt": 0.85, "avg_wt": 1.20, "max_wt": 2.00, "rate_per_kg": 110},
    "tablet": {"name": "Tablet / iPad", "min_wt": 0.35, "avg_wt": 0.55, "max_wt": 0.75, "rate_per_kg": 300},
    "headphones": {"name": "Headphones", "min_wt": 0.08, "avg_wt": 0.15, "max_wt": 0.30, "rate_per_kg": 150},
    "camera": {"name": "Camera / Webcam", "min_wt": 0.30, "avg_wt": 0.45, "max_wt": 0.75, "rate_per_kg": 170},
    "hard_drive": {"name": "Storage / HDD", "min_wt": 0.35, "avg_wt": 0.60, "max_wt": 0.95, "rate_per_kg": 240},
    "miscellaneous": {"name": "Misc Electronics", "min_wt": 0.25, "avg_wt": 0.45, "max_wt": 0.80, "rate_per_kg": 100},
}

# Mapping COCO detection names to E-waste catalog
CLASS_ALIASES = {
    "cell phone": [
        "cell phone", "cell_phone", "cellphone", "mobile phone", "smartphone",
        "phone", "mobile", "remote", "remote control"  # Keypad phones are frequently tagged as remote
    ],
    "laptop": ["laptop", "notebook", "computer laptop", "portable computer"],
    "tv": ["tv", "television", "tvmonitor", "monitor", "screen", "lcd monitor", "led monitor"],
    "keyboard": ["keyboard", "computer keyboard"],
    "mouse": ["mouse", "computer mouse"],
    "motherboard": ["motherboard", "mainboard", "desktop motherboard", "circuit board", "pcb"],
    "power_supply": ["power supply", "psu", "smps", "power_supply"],
    "router": ["router", "modem", "wifi router", "network router"],
    "printer": ["printer", "scanner", "fax machine"],
    "charger": ["charger", "adapter", "power charger", "usb charger", "cable", "wire"],
    "speaker": ["speaker", "stereo speaker", "audio speaker", "soundbar"],
    "tablet": ["tablet", "ipad", "tablet computer"],
    "headphones": ["headphones", "earphones", "headset", "earbuds"],
    "camera": ["camera", "webcam", "digital camera", "security camera"],
    "hard_drive": ["hard drive", "hdd", "external hard drive", "ssd", "storage drive"],
}

BOX_COLORS = {
    "cell phone": (0, 140, 255),
    "laptop": (255, 200, 0),
    "tv": (0, 220, 255),
    "keyboard": (120, 255, 0),
    "mouse": (0, 255, 120),
    "motherboard": (255, 0, 255),
    "power_supply": (255, 140, 0),
    "router": (0, 160, 255),
    "printer": (255, 80, 80),
    "charger": (80, 220, 210),
    "speaker": (180, 180, 180),
    "tablet": (255, 150, 50),
    "headphones": (210, 150, 255),
    "camera": (130, 0, 255),
    "hard_drive": (60, 160, 255),
    "miscellaneous": (180, 180, 180),
}


def normalize_class_name(raw_name: str) -> str:
    text = (raw_name or "").strip().lower().replace("_", " ")
    text = " ".join(text.split())

    for canonical, aliases in CLASS_ALIASES.items():
        if text == canonical or text in aliases:
            return canonical

    generic_keywords = [
        "router", "modem", "adapter", "charger", "usb", "hub", "switch",
        "speaker", "printer", "camera", "webcam", "tablet", "headphones",
        "earphone", "hard drive", "storage", "console", "device", "gadget"
    ]
    if any(k in text for k in generic_keywords):
        return "miscellaneous"

    return text


def compute_estimate(detected_counts: Dict[str, int]) -> Dict[str, float]:
    totals = {
        "min_wt": 0.0, "avg_wt": 0.0, "max_wt": 0.0,
        "min_payout": 0.0, "expected_payout": 0.0, "max_payout": 0.0
    }
    for item_name, count in detected_counts.items():
        cfg = EWASTE_CONFIG.get(item_name)
        if not cfg or count <= 0:
            continue
        totals["min_wt"] += count * cfg["min_wt"]
        totals["avg_wt"] += count * cfg["avg_wt"]
        totals["max_wt"] += count * cfg["max_wt"]
        totals["min_payout"] += count * cfg["min_wt"] * cfg["rate_per_kg"]
        totals["expected_payout"] += count * cfg["avg_wt"] * cfg["rate_per_kg"]
        totals["max_payout"] += count * cfg["max_wt"] * cfg["rate_per_kg"]
    return totals


class EWasteEstimator:
    def __init__(self, weights_path: str = "yolov8m.pt", conf_threshold: float = 0.10, iou_threshold: float = 0.50, imgsz: int = 1280):
        self.conf_threshold = conf_threshold
        self.iou_threshold = iou_threshold
        self.imgsz = imgsz
        print(f"[+] Initializing YOLO ({weights_path}) on {device}")
        print(f"[+] Params: Resolution={imgsz}px | Min Conf={conf_threshold} | NMS IoU={iou_threshold}")
        self.model = YOLO(weights_path)
        self.model.to(device)
        self.fps = 0.0
        self.frame_count = 0
        self.start_time = time.time()
        self.latest_frame_counts: Dict[str, int] = {name: 0 for name in EWASTE_CONFIG}
        self.cap = None

    def update_fps(self):
        self.frame_count += 1
        elapsed = time.time() - self.start_time
        if elapsed > 0:
            self.fps = self.frame_count / elapsed

    def open_video(self, video_path: str):
        self.cap = cv2.VideoCapture(video_path)
        if not self.cap.isOpened():
            print(f"[-] Error: Could not open video file {video_path}")
            return False
        return True

    def get_color(self, class_name: str):
        return BOX_COLORS.get(class_name, (0, 255, 0))

    def draw_hud(self, frame: np.ndarray, counts: Dict[str, int]):
        active_items = [(name, count) for name, count in counts.items() if count > 0]
        estimate = compute_estimate(counts)

        line_height = 20
        num_items = max(1, len(active_items))
        panel_w = 420
        panel_h = min(95 + (num_items * line_height) + 65, frame.shape[0] - 25)
        panel_x, panel_y = 15, 15

        overlay = frame.copy()
        cv2.rectangle(overlay, (panel_x, panel_y), (panel_x + panel_w, panel_y + panel_h), (20, 20, 20), -1)
        cv2.addWeighted(overlay, 0.78, frame, 0.22, 0, frame)

        # Header
        cv2.putText(frame, "E-WASTE SCANNER", (panel_x + 10, panel_y + 24), cv2.FONT_HERSHEY_SIMPLEX, 0.65, (0, 255, 255), 2)
        status_text = f"FPS: {self.fps:.1f} | {str(device).upper()}" if self.fps > 0 else str(device).upper()
        cv2.putText(frame, status_text, (panel_x + 250, panel_y + 24), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (200, 200, 200), 1)

        # Columns
        cv2.line(frame, (panel_x + 10, panel_y + 32), (panel_x + panel_w - 10, panel_y + 32), (100, 100, 100), 1)
        cv2.putText(frame, "Item", (panel_x + 10, panel_y + 48), cv2.FONT_HERSHEY_SIMPLEX, 0.42, (180, 180, 180), 1)
        cv2.putText(frame, "Qty", (panel_x + 165, panel_y + 48), cv2.FONT_HERSHEY_SIMPLEX, 0.42, (180, 180, 180), 1)
        cv2.putText(frame, "Weight", (panel_x + 215, panel_y + 48), cv2.FONT_HERSHEY_SIMPLEX, 0.42, (180, 180, 180), 1)
        cv2.putText(frame, "Est. Value", (panel_x + 310, panel_y + 48), cv2.FONT_HERSHEY_SIMPLEX, 0.42, (180, 180, 180), 1)
        cv2.line(frame, (panel_x + 10, panel_y + 54), (panel_x + panel_w - 10, panel_y + 54), (80, 80, 80), 1)

        y = panel_y + 72
        if not active_items:
            cv2.putText(frame, "No target devices detected", (panel_x + 10, y), cv2.FONT_HERSHEY_SIMPLEX, 0.48, (140, 140, 140), 1)
            y += line_height
        else:
            for item_name, count in active_items[:7]:
                cfg = EWASTE_CONFIG[item_name]
                sub_wt = count * cfg["avg_wt"]
                sub_val = sub_wt * cfg["rate_per_kg"]

                color = self.get_color(item_name)
                cv2.putText(frame, f"{cfg['name'][:16]}", (panel_x + 10, y), cv2.FONT_HERSHEY_SIMPLEX, 0.42, color, 1)
                cv2.putText(frame, f"x{count}", (panel_x + 165, y), cv2.FONT_HERSHEY_SIMPLEX, 0.42, (255, 255, 255), 1)
                cv2.putText(frame, f"{sub_wt:.2f}kg", (panel_x + 215, y), cv2.FONT_HERSHEY_SIMPLEX, 0.42, (255, 255, 255), 1)
                cv2.putText(frame, f"Rs.{sub_val:,.0f}", (panel_x + 310, y), cv2.FONT_HERSHEY_SIMPLEX, 0.42, (0, 255, 120), 1)
                y += line_height

        # Totals
        cv2.line(frame, (panel_x + 10, y), (panel_x + panel_w - 10, y), (100, 100, 100), 1)
        y += 18
        total_items = sum(counts.values())
        cv2.putText(frame, f"Total Devices: {total_items} | Approx: {estimate['avg_wt']:.2f} kg", (panel_x + 10, y), cv2.FONT_HERSHEY_SIMPLEX, 0.48, (255, 255, 255), 1)
        y += 20
        cv2.putText(frame, f"EST. PAYOUT: Rs. {estimate['min_payout']:,.0f} - {estimate['max_payout']:,.0f}", (panel_x + 10, y), cv2.FONT_HERSHEY_SIMPLEX, 0.52, (0, 255, 100), 2)
        y += 16
        cv2.putText(frame, f"(Expected: Rs. {estimate['expected_payout']:,.0f})", (panel_x + 10, y), cv2.FONT_HERSHEY_SIMPLEX, 0.42, (0, 220, 255), 1)

    def _extract_boxes_from_result(self, result, offset_x: int = 0, offset_y: int = 0) -> List[Tuple[int, int, int, int, float, str]]:
        detections = []
        if result is None or result.boxes is None:
            return detections

        boxes = result.boxes
        cls_values = boxes.cls.cpu().tolist()
        conf_values = boxes.conf.cpu().tolist()
        xyxy_values = boxes.xyxy.cpu().tolist()

        for cls_id, conf, coords in zip(cls_values, conf_values, xyxy_values):
            cls_index = int(cls_id)
            raw_name = result.names.get(cls_index, str(cls_index))
            item_name = normalize_class_name(raw_name)

            if item_name not in EWASTE_CONFIG:
                continue

            x1, y1, x2, y2 = [int(v) for v in coords[:4]]
            detections.append((x1 + offset_x, y1 + offset_y, x2 + offset_x, y2 + offset_y, float(conf), item_name))
        return detections

    def detect_image_tiled(self, frame: np.ndarray) -> np.ndarray:
        """Runs full-scale and quadrant-tiled inference to capture dense, packed objects."""
        h, w = frame.shape[:2]
        all_raw_boxes: List[Tuple[int, int, int, int, float, str]] = []

        # 1. Full image inference
        full_res = self.model(
            frame,
            verbose=False,
            conf=self.conf_threshold,
            iou=self.iou_threshold,
            imgsz=self.imgsz,
            max_det=300,
            device=device
        )
        all_raw_boxes.extend(self._extract_boxes_from_result(full_res[0]))

        # 2. Quadrant slicing (with 20% overlap) if image is sufficiently large
        if w >= 640 and h >= 640:
            mid_x, mid_y = w // 2, h // 2
            overlap_x, overlap_y = int(w * 0.10), int(h * 0.10)

            quadrants = [
                (0, 0, mid_x + overlap_x, mid_y + overlap_y),                      # Top-Left
                (max(0, mid_x - overlap_x), 0, w, mid_y + overlap_y),              # Top-Right
                (0, max(0, mid_y - overlap_y), mid_x + overlap_x, h),              # Bottom-Left
                (max(0, mid_x - overlap_x), max(0, mid_y - overlap_y), w, h),      # Bottom-Right
            ]

            for qx1, qy1, qx2, qy2 in quadrants:
                crop = frame[qy1:qy2, qx1:qx2]
                if crop.shape[0] < 100 or crop.shape[1] < 100:
                    continue
                q_res = self.model(
                    crop,
                    verbose=False,
                    conf=self.conf_threshold,
                    iou=self.iou_threshold,
                    imgsz=self.imgsz,
                    max_det=150,
                    device=device
                )
                all_raw_boxes.extend(self._extract_boxes_from_result(q_res[0], offset_x=qx1, offset_y=qy1))

        # 3. Global Non-Maximum Suppression to filter duplicates across tiles
        frame_counts = {name: 0 for name in EWASTE_CONFIG}
        if not all_raw_boxes:
            self.latest_frame_counts = frame_counts
            self.draw_hud(frame, frame_counts)
            return frame

        boxes_xywh = []
        confidences = []
        class_names = []
        for x1, y1, x2, y2, conf, name in all_raw_boxes:
            boxes_xywh.append([x1, y1, x2 - x1, y2 - y1])
            confidences.append(conf)
            class_names.append(name)

        indices = cv2.dnn.NMSBoxes(boxes_xywh, confidences, score_threshold=self.conf_threshold, nms_threshold=0.50)

        if len(indices) > 0:
            for idx in indices.flatten():
                x, y, bw, bh = boxes_xywh[idx]
                conf = confidences[idx]
                item_name = class_names[idx]
                x1, y1, x2, y2 = x, y, x + bw, y + bh

                color = self.get_color(item_name)
                label = f"{EWASTE_CONFIG[item_name]['name']} {conf:.2f}"

                cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
                tag_w = len(label) * 8 + 6
                cv2.rectangle(frame, (x1, max(0, y1 - 20)), (x1 + tag_w, max(20, y1)), color, -1)
                cv2.putText(frame, label, (x1 + 3, max(15, y1 - 5)), cv2.FONT_HERSHEY_SIMPLEX, 0.40, (0, 0, 0), 1, cv2.LINE_AA)

                frame_counts[item_name] += 1

        self.latest_frame_counts = frame_counts
        self.draw_hud(frame, frame_counts)
        return frame

    def detect_video_frame(self, frame: np.ndarray) -> np.ndarray:
        """Fast single-pass inference for video streams."""
        results = self.model(
            frame,
            verbose=False,
            conf=self.conf_threshold,
            iou=self.iou_threshold,
            imgsz=self.imgsz,
            max_det=200,
            device=device,
        )

        frame_counts = {name: 0 for name in EWASTE_CONFIG}
        boxes_list = self._extract_boxes_from_result(results[0])

        for x1, y1, x2, y2, conf, item_name in boxes_list:
            color = self.get_color(item_name)
            label = f"{EWASTE_CONFIG[item_name]['name']} {conf:.2f}"

            cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
            tag_w = len(label) * 8 + 6
            cv2.rectangle(frame, (x1, max(0, y1 - 20)), (x1 + tag_w, max(20, y1)), color, -1)
            cv2.putText(frame, label, (x1 + 3, max(15, y1 - 5)), cv2.FONT_HERSHEY_SIMPLEX, 0.40, (0, 0, 0), 1, cv2.LINE_AA)

            frame_counts[item_name] += 1

        self.latest_frame_counts = frame_counts
        self.update_fps()
        self.draw_hud(frame, frame_counts)
        return frame

    def print_terminal_summary(self, counts: Dict[str, int]):
        active_counts = {k: v for k, v in counts.items() if v > 0}
        if not active_counts:
            print("\n[!] No target e-waste devices identified in this run.")
            return

        print("\n" + "=" * 88)
        print("               E-WASTE DETECTION & PAYOUT BREAKDOWN")
        print("=" * 88)
        print(f"{'Item':<20} {'Count':<8} {'Total Wt':<12} {'Rate/kg':<10} {'Payout Range':<22} {'Expected':<12}")
        print("-" * 88)

        totals = compute_estimate(counts)
        for item_name, count in active_counts.items():
            cfg = EWASTE_CONFIG[item_name]
            sub_wt = count * cfg["avg_wt"]
            min_pay = count * cfg["min_wt"] * cfg["rate_per_kg"]
            max_pay = count * cfg["max_wt"] * cfg["rate_per_kg"]
            exp_pay = sub_wt * cfg["rate_per_kg"]

            print(f"{cfg['name']:<20} {count:<8} {sub_wt:<12.2f}kg Rs.{cfg['rate_per_kg']:<7} "
                  f"Rs.{min_pay:,.0f} - {max_pay:,.0f}    Rs.{exp_pay:,.0f}")

        print("-" * 88)
        total_items = sum(active_counts.values())
        print(f"{'TOTALS':<20} {total_items:<8} {totals['avg_wt']:<12.2f}kg {'-':<10} "
              f"Rs.{totals['min_payout']:,.0f} - {totals['max_payout']:,.0f}    Rs.{totals['expected_payout']:,.0f}")
        print("=" * 88)
        print(f"-> Total Device Units Detected : {total_items}")
        print(f"-> Estimated Weight Bracket    : {totals['min_wt']:.2f} kg - {totals['max_wt']:.2f} kg (Avg: {totals['avg_wt']:.2f} kg)")
        print(f"-> Estimated Payout Range      : Rs. {totals['min_payout']:,.2f} - Rs. {totals['max_payout']:,.2f}")
        print(f"-> Expected Net Payout         : Rs. {totals['expected_payout']:,.2f}")
        print("=" * 88 + "\n")

    def process_source(self, mode: str, source_path: str):
        if not source_path or not os.path.exists(source_path):
            print(f"[-] Error: File path not found: {source_path}")
            return

        window_title = "E-Waste Estimator (Press 'q' to close, 's' for snapshot)"
        cv2.namedWindow(window_title, cv2.WINDOW_NORMAL)

        if mode == "image":
            frame = cv2.imread(source_path)
            if frame is None:
                print(f"[-] Error: Could not load image from {source_path}")
                return

            print(f"[+] Processing Image with Multi-Scale Tiling: {source_path}")
            processed = self.detect_image_tiled(frame)
            self.print_terminal_summary(self.latest_frame_counts)

            cv2.imshow(window_title, processed)
            cv2.waitKey(0)
            cv2.destroyAllWindows()

        elif mode == "video":
            if not self.open_video(source_path):
                return
            print(f"[+] Processing Video: {source_path} (Press 'q' to stop)")

            while True:
                ret, frame = self.cap.read()
                if not ret:
                    break

                processed = self.detect_video_frame(frame)
                cv2.imshow(window_title, processed)
                key = cv2.waitKey(1) & 0xFF
                if key == ord('q'):
                    break
                elif key == ord('s'):
                    snapshot_file = f"snapshot_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png"
                    cv2.imwrite(snapshot_file, processed)
                    print(f"[+] Snapshot saved: {snapshot_file}")
                    self.print_terminal_summary(self.latest_frame_counts)

            self.cap.release()
            cv2.destroyAllWindows()
            self.print_terminal_summary(self.latest_frame_counts)


def prompt_for_mode() -> Tuple[str, str]:
    print("Select Media Input:")
    print("1. Static Image")
    print("2. Video File")
    choice = input("Enter choice (1 or 2) [Default 1]: ").strip()

    if choice == "2":
        path = input("Enter video file path: ").strip().strip('"')
        return "video", path

    path = input("Enter image file path: ").strip().strip('"')
    return "image", path


def parse_args():
    parser = argparse.ArgumentParser(description="E-Waste Weight & Payout Estimator (Images & Video)")
    parser.add_argument("--source", choices=["image", "video"], help="Input media source")
    parser.add_argument("--path", help="Path to input image or video file")
    parser.add_argument("--weights", default="yolov8m.pt", help="YOLO model path (.pt) [Default: yolov8m.pt]")
    parser.add_argument("--conf", type=float, default=0.10, help="Confidence threshold [Default: 0.10]")
    parser.add_argument("--iou", type=float, default=0.50, help="NMS IoU threshold [Default: 0.50]")
    parser.add_argument("--imgsz", type=int, default=1280, help="Inference resolution [Default: 1280]")
    return parser.parse_args()


def main():
    args = parse_args()
    mode = args.source
    media_path = args.path

    if mode is None or media_path is None:
        mode, media_path = prompt_for_mode()

    estimator = EWasteEstimator(
        weights_path=args.weights,
        conf_threshold=args.conf,
        iou_threshold=args.iou,
        imgsz=args.imgsz,
    )
    estimator.process_source(mode, media_path)


if __name__ == "__main__":
    main()