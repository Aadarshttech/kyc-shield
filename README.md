# KYC Shield 🛡️
**Advanced Multi-Layered Risk Scoring System (MLRSS) for Identity Fraud Prevention**

KYC Shield is a next-generation KYC validation pipeline designed to combat sophisticated identity fraud, synthetic identities, and deepfakes. It was built for the eSewa x WWF Hackathon 2026.

## 🚀 Features

KYC Shield evaluates user identities across three independent vectors to generate a robust **Fraud Risk Score (0-100)**:

### 1. Vector 1: Document & Identity Analysis
- **YOLOv8 Segmentation**: Isolates the portrait, hologram, and text fields.
- **Tamper Detection**: Uses Error Level Analysis (ELA) to detect copy-move regions and font inconsistencies.
- **OCR Cross-Validation**: Extracts text (Devanagari + Latin) using EasyOCR and validates rules (DOB vs Expiry, age >= 16).

### 2. Vector 2: Biometric Liveness Analysis
- **MediaPipe Edge Pre-Screening**: Real-time 478-point facial mesh tracking for pose consistency.
- **rPPG Heartbeat Extraction**: Extracts the user's blood-volume pulse (BPM) via Remote Photoplethysmography to guarantee biological liveness (defeating deepfakes).
- **Face-to-Document Match**: ArcFace mapping matches the live face to the document portrait.

### 3. Vector 3: Behavioural & Occlusion Analysis
- **Hand Occlusion Detection**: Ensures users can physically interact with the camera (e.g., covering their nose) to defeat printed photo attacks.
- **Form-Fill Behavioural Biometrics**: Tracks keystroke dynamics and mouse velocity during manual entry to detect automated bots.

## 💻 Tech Stack
- **Frontend**: React, Vite, Framer Motion (for dynamic UI & glassmorphism)
- **Computer Vision**: MediaPipe (Face Mesh, Hand Tracking)
- **Styling**: Vanilla CSS with modern custom properties.

## 🛠️ How to Run Locally

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 👥 User Flow
The project includes a complete end-to-end prototype:
1. **Welcome Screen**: Initial entry point.
2. **Document Scan**: YOLOv8 visual segmentation simulation.
3. **Liveness Detection**: Real-time face mesh mapping and rPPG extraction.
4. **Occlusion Test**: Interactive liveness check.
5. **Personal Details Form**: Final data entry tracking behavioral metrics.

## 📊 Admin Dashboard
A robust compliance panel for KYC officers featuring:
- **Live Queue**: Real-time feed of incoming applications.
- **Application Details**: Extracted demographic and identity data.
- **Evidence Analysis**: Visual breakdown of Risk Vectors, extracted faces, and match percentages.
- **One-Click Decisions**: Approve or Reject with full audit logging.
