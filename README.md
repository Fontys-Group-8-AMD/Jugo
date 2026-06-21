# Jugo

## Overview
Jugo is a dashboard analysis app with a React frontend and FastAPI backend.
The backend loads the final notebook model from `model/ibcs_final_model.pth` and predicts four IBCS rules per image:

- AC (Actual)
- PY (Previous Year)
- PL (Plan)
- FC (Forecast)

The API returns an overall status and score plus per-rule confidence and explanation.

## Tech Stack
- Frontend: React + TypeScript + Vite + TailwindCSS
- Backend: FastAPI + PyTorch
- Model runtime: torchvision ResNet18 (4-output multi-label head)

## Repository Structure
- `frontend/`: React app
- `backend/`: FastAPI app
- `model/`: trained checkpoints and notebooks
- `images_data/`: sample images and labels

## Local Setup

### 1. Backend
Windows PowerShell:

```powershell
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

Backend runs on `http://127.0.0.1:8000`.

### 2. Frontend
In a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

## API

### Health
- `GET /health`

### Predict
- `POST /predict`
- accepts `multipart/form-data` with field `file`
- accepts PNG and JPG/JPEG

Response includes:
- `prediction`, `label_name`, `score`
- `probability_compliant`, `probability_non_compliant`
- `rules[]` with `AC`, `PY`, `PL`, `FC`

## Verification Checklist

1. Start backend and frontend.
2. Upload an image on the Analyze page.
3. Confirm the Results page shows all four rules with status and confidence.
4. Run frontend tests:

```powershell
cd frontend
npm run test:run
```

5. Optional API smoke test:

```powershell
cd ..
python test_e2e.py
```

## Notes for Team Members
- `test_e2e.py` uses `requests` (included in backend requirements).
- The model file expected by backend is `model/ibcs_final_model.pth`.



