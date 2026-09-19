# SCRAPIT (Kabadiwala Connect) ♻️
### *Verified Doorstep Scrap & Circular E-Waste Platform*

[![React 18](https://img.shields.io/badge/Frontend-React%2018%20%7C%20Vite-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2D9?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![PyTorch & YOLOv8](https://img.shields.io/badge/AI%20Vision-YOLOv8%20%7C%20PyTorch-EE4C2C?logo=pytorch&logoColor=white)](https://ultralytics.com/)
[![OpenCV](https://img.shields.io/badge/Vision-OpenCV-5C3EE8?logo=opencv&logoColor=white)](https://opencv.org/)
[![Compliance](https://img.shields.io/badge/CPCB-E--Waste%20Rules%202022-2E7D32)](https://cpcb.nic.in/)

---

## 📌 Executive Overview

In India, over **95% of e-waste and scrap is processed within the informal sector**. This informal pipeline causes severe vulnerabilities:
1. **Consumer Exploitation**: Rigged mechanical spring scales cause 20%–30% weight manipulation alongside non-transparent pricing.
2. **Hazardous Backyard Processing**: Informal burning of printed circuit boards (PCBs) and acid leaching release carcinogenic dioxins, lead, and mercury into ecosystems.
3. **Logistics Misalignment**: Scrap collectors dispatch bicycles for bulky 80 kg appliances or commercial trucks for a single smartphone.
4. **Supply Chain Disconnection**: Government-authorized CPCB (Central Pollution Control Board) recyclers starve for raw bulk lots, while informal collectors have no direct bridge to formal industrial smelters.

**SCRAPIT (Kabadiwala Connect)** is a closed-loop digital platform connecting **Households**, **Local Kabadiwalas**, and **Authorized Industrial Smelters** into a verifiable, transparent chain of custody backed by **YOLOv8 Computer Vision**, **IoT digital weighing**, and **statutory CPCB Extended Producer Responsibility (EPR) certification**.

---

## 🏗️ System Architecture

```
+-----------------------------------------------------------------------------------+
|                           REACT 18 + VITE FRONTEND (SPA)                          |
|   - Multi-Stakeholder Role Switcher (Citizen | Kabadiwala | Recycler)             |
|   - Tailwind CSS Accessible UI & Lucide Icons                                     |
|   - Vernacular Voice Synthesis (Hindi, Marathi, English) via Web Speech API       |
|   - Resilient Storage Layer (LocalStorage + Memory Fallback)                      |
+-----------------------------------------------------------------------------------+
                  |                                             ^
                  | (HTTP Multipart Image)                      | (JSON Inference &
                  v                                             |  Base64 Annotated HUD)
+-----------------------------------------------------------------------------------+
|                           FASTAPI PYTHON BACKEND SERVER                           |
|   - Async Lifespan Model Loader                                                   |
|   - Endpoint: POST /api/estimate                                                  |
|   - Endpoint: GET  /api/health                                                    |
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                        AI COMPUTER VISION ENGINE (ewaste_detct.py)                |
|   - Ultralytics YOLOv8m Object Detection (PyTorch / CUDA / CPU)                   |
|   - Quadrant-Tiling Inference (20% overlap for dense & small items)               |
|   - Global Non-Maximum Suppression (OpenCV cv2.dnn.NMSBoxes)                      |
|   - Domain Class Normalization (COCO aliases -> E-Waste Catalog)                  |
|   - Empirical Weight & Benchmark INR Payout Computation                           |
+-----------------------------------------------------------------------------------+
```

---

## 🌟 Key Features by Stakeholder

### 1. 🏠 Citizen (Household / Office Consumer)
* **Transparent Scrap Rate Board**: Daily updated scrap benchmark prices indexed to wholesale hubs (Mandi Gobindgarh and Mayapuri) with anti-rigging advisories.
* **AI E-Waste Scanner**: Live webcam or photo upload that classifies electronics, counts units, calculates expected weight brackets (kg), and predicts fair INR payouts.
* **Vernacular Audio Feedback**: Automatic voice readouts in **Hindi (`hi-IN`)**, **Marathi (`mr-IN`)**, and **Indian English (`en-IN`)** to ensure accessibility for all users.
* **Smart Vehicle Sizing**: Dynamic computation of scrap volume recommending the right vehicle dispatch:
  * 🚲 **Bicycle / 2-Wheeler**: $< 15\text{ kg}$
  * 🛺 **3-Wheeler E-Loader / Cart**: $15\text{--}60\text{ kg}$
  * 🚚 **Mini Commercial Truck (Tata Ace)**: $> 60\text{ kg}$
* **Real-Time Order Tracking**: Digital tracking (`Pending` $\rightarrow$ `Accepted` $\rightarrow$ `Completed`) with tamper-proof digital slips.
* **Eco-Scorecard**: Tracks scrap earnings, green coins, $\text{CO}_2$ emissions avoided, and landfill diversion in kilograms.

### 2. 🚛 Kabadiwala (Local Collector & Micro-Aggregator)
* **Proximity-Based Job Board**: Geolocated pickup requests with distance tags, scrap photo previews, and vehicle sizing advice.
* **Doorstep IoT Digital Scale Integration**: Calibrated digital scale simulation (`#DS-44`) with tare verification ($\pm 0.05\text{ kg}$ precision) and direct UPI transaction settlement.
* **Unbundled Scrap Inventory**: Completed doorstep pickups automatically deposit items into a local inventory for sorting and refurbishment.
* **E-Waste Lot Creation Studio**: Aggregators bundle segregated scrap into commercial wholesale lots (e.g., *Batch #LOT-EW-401: 60kg Grade A Server PCBs @ ₹420/kg*), upload lot photos, declare CPCB non-toxic dismantling, and list them on the B2B marketplace.
* **Escrow Offer Review**: Accept or decline procurement bids from certified recyclers.

### 3. 🏭 Authorized Industrial Recycler (Smelter / Refiner)
* **B2B Wholesale Exchange**: Filter verified lots by category (Motherboards/PCBs, Lithium-Ion Batteries, Copper Windings, Display Units).
* **Material Yield Analytics**: Industrial estimations on precious metal extraction:
  * Copper Recovery ($\%$)
  * Gold / Silver Recovery ($\text{grams/ton}$)
  * Recoverable Polymers ($\%$)
* **Bidding & Instant Procurement**: Submit custom procurement bids or procure at asking price with Escrow settlement.
* **CPCB Extended Producer Responsibility (EPR) Certificate**: Automatic generation and issuance of statutory green recycling certificates with unique serial numbers, CPCB accreditation records, carbon offset figures, and print/PDF export.

---

## 🧠 AI Computer Vision Architecture (`ewaste_detct.py`)

### 1. Multi-Scale Quadrant-Tiling
In real scrap conditions, electronic items are stacked in dense, occluded piles. Standard single-pass inference often misses small components like phones or RAM sticks:
1. The engine performs full-frame inference at $1280\text{px}$ resolution.
2. If image resolution is $\ge 640\times640$, the image is split into **4 quadrants with 20% spatial overlap** ($10\%$ margin per boundary) to prevent cutting objects at crop edges.
3. Inferences from all tiles are projected back into global image coordinates.

### 2. Global Non-Maximum Suppression (NMS)
To eliminate duplicate detections across overlapping tiles, all candidate bounding boxes are filtered using OpenCV DNN NMS:
```python
indices = cv2.dnn.NMSBoxes(
    boxes_xywh, 
    confidences, 
    score_threshold=0.10, 
    nms_threshold=0.50
)
```

### 3. Class Alias Normalization
Translates standard COCO 80-class detections into commercial scrap trade items:
* `remote control` $\rightarrow$ `cell phone` (keypad phones frequently tagged as remotes)
* `tv`, `monitor`, `screen` $\rightarrow$ `tv` (Monitor / Screen)
* `circuit board`, `pcb` $\rightarrow$ `motherboard`

### 4. Valuation & Weight Matrix
Each recognized item is multiplied by an empirical weight distribution ($\text{min}, \text{avg}, \text{max}$) and daily scrap rate (₹/kg):
$$\text{Weight}_{\text{total}} = \sum_{i} (\text{count}_i \times \text{avg\_wt}_i)$$
$$\text{Payout}_{\text{INR}} = \sum_{i} (\text{weight}_i \times \text{rate\_per\_kg}_i)$$

### 5. Client-Side Fallback Engine
If the FastAPI backend is offline or the frontend is deployed as a static preview, [`src/views/EstimatorView.jsx`](src/views/EstimatorView.jsx) engages a client-side computer vision simulation using HTML5 Canvas. It dynamically renders green bounding boxes and domain calculations, ensuring the application remains functional without server connectivity.

---

## 📁 Repository Structure

```
KABADIWALA CONNECT/
├── backend/
│   ├── requirements.txt         # FastAPI, PyTorch, YOLOv8, OpenCV, Uvicorn
│   ├── server.py                # REST API wrapper for the detection model
│   └── yolov8m.pt               # YOLOv8 medium pretrained weights
├── src/
│   ├── main.jsx                 # Application entry point
│   ├── App.jsx                  # Main routing layout and ambient theme
│   ├── index.css                # Tailwind directives and custom animation styles
│   ├── context/
│   │   └── AppContext.jsx       # Universal reactive state (Pickups, Lots, Roles, Stats)
│   ├── types/
│   │   └── data.js              # Scrap rate catalogs, categories, user profiles
│   ├── utils/
│   │   └── storage.js           # Safe storage engine with memory fallback
│   ├── components/
│   │   ├── Navbar.jsx           # Global navigation, role switcher & toast system
│   │   ├── Footer.jsx           # Platform footer & compliance links
│   │   ├── RateCardModal.jsx    # Real-time scrap rate board & calculator
│   │   ├── EPRCertificateModal.jsx # Official printable CPCB EPR certificate
│   │   ├── VehicleRecommendationBadge.jsx # Dynamic transport sizing badge
│   │   └── PrivacyNotice.jsx    # Data privacy and statutory consent banner
│   └── views/
│       ├── LandingHero.jsx      # High-impact landing page & 6-step circular economy journey
│       ├── AuthPortal.jsx       # Multi-role authentication & profile onboarding
│       ├── EstimatorView.jsx    # AI scanner with webcam, upload & voice synthesis
│       ├── CitizenPortal/
│       │   ├── CitizenDashboard.jsx   # Household portal & eco-scorecard
│       │   └── CreatePickupModal.jsx  # Smart scrap pickup scheduler
│       ├── KabadiwalaPortal/
│       │   ├── KabadiwalaDashboard.jsx    # Aggregator hub & job queue
│       │   ├── DoorstepWeighingModal.jsx  # Calibrated digital scale simulation
│       │   └── CreateLotModal.jsx         # B2B lot creation studio
│       └── RecyclerPortal/
│           └── RecyclerDashboard.jsx      # Industrial B2B lot exchange & bidding
├── ewaste_detct.py              # Core computer vision & estimation engine
├── package.json                 # Frontend dependencies & build scripts
├── vite.config.js               # Vite build configuration
├── tailwind.config.js           # Tailwind color palettes & font configurations
└── README.md                    # Project documentation
```

---

## 🚀 Quick Start Guide

### Prerequisites
* **Node.js** (v18.0.0 or higher)
* **Python** (v3.9 or higher)
* **CUDA-compatible GPU** (Optional, falls back to CPU automatically)

---

### Step 1: Frontend Setup

```bash
# Navigate to project directory
cd "d:/PROJECTS/KABADIWALA CONNECT"

# Install frontend dependencies
npm install

# Start the Vite development server
npm run dev
```
> The frontend will launch at: **`http://localhost:5173`** (or `http://localhost:3000`).

---

### Step 2: Backend & AI Vision Setup

```bash
# Open a new terminal in the backend directory
cd "d:/PROJECTS/KABADIWALA CONNECT/backend"

# Install Python requirements
pip install -r requirements.txt

# Start the FastAPI ASGI server
uvicorn server:app --host 0.0.0.0 --port 8000 --reload
```
> The AI Backend will run on: **`http://localhost:8000`**
> * Interactive Swagger Docs: `http://localhost:8000/docs`
> * Health Check: `http://localhost:8000/api/health`

---

## 📡 API Reference

### `GET /api/health`
Checks backend readiness and YOLO model loading status.
* **Response**:
```json
{
  "status": "ok",
  "model_loaded": true
}
```

### `POST /api/estimate`
Accepts an image file, runs quadrant-tiled YOLOv8 detection, and returns item counts, weight estimations, and an annotated base64 image.
* **Content-Type**: `multipart/form-data`
* **Body Parameter**: `image: UploadFile`
* **Sample Response**:
```json
{
  "success": true,
  "total_items": 3,
  "breakdown": [
    {
      "category": "Mobile Phone",
      "count": 2,
      "avg_weight_kg": 0.36,
      "rate_per_kg": 400,
      "estimated_inr": 144
    },
    {
      "category": "Laptop",
      "count": 1,
      "avg_weight_kg": 2.10,
      "rate_per_kg": 320,
      "estimated_inr": 672
    }
  ],
  "weight_bracket": {
    "min_kg": 1.84,
    "avg_kg": 2.46,
    "max_kg": 3.10
  },
  "payout_bracket": {
    "min_inr": 608,
    "expected_inr": 816,
    "max_inr": 1032
  },
  "annotated_image": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```

---

## 📜 Regulatory Compliance & Environmental Impact

* **E-Waste (Management) Rules, 2022**: Supports mass-balanced compliance reporting for registered Producer Responsibility Organizations (PROs) and recyclers.
* **Anti-Tamper Digital Scale Pledge**: Eliminates mechanical tare displacement, protecting consumer rights.
* **Carbon Offset & Green Credits**: Dynamically calculates kilograms of carbon mitigated ($1\text{ kg e-waste} \approx 1.8\text{--}4.8\text{ kg CO}_2\text{ equivalent}$ avoided) and heavy metals diverted from landfills.

---

## 👥 Contributors
Developed for **Smart India Hackathon (SIH)** & Circular Economy Initiatives.
* **Platform**: SCRAPIT / Kabadiwala Connect
* **License**: MIT License
