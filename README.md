# Jugo

## Tech Stack
- Frontend: React + TypeScript, TailwindCSS
- Backend: FastAPI (Python)
- AI Model: PyTorch / pretrained model

---

## Overview
This application has three main components:

### Frontend
- Uploads images and displays predictions.

### Backend
- Receives requests, preprocesses images, calls the AI model, and returns predictions as JSON.

### AI Model
- Trained separately and loaded into the backend at runtime.
- Communicates directly via Python function calls (no separate API).

> No database is required; the app processes input and returns results immediately.

---

## Getting Started

### Backend
cd backend
python -m venv venv          # optional if venv exists
source venv/bin/activate      # Mac/Linux
venv\Scripts\activate         # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload

### Frontend
cd frontend
npm install
npm run dev



