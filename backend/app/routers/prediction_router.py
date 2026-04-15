from fastapi import APIRouter, File, HTTPException, UploadFile

from app.schemas.prediction_response import PredictionResponse
from app.services.inference_service import InferenceService

router = APIRouter()

# Allowed file types
ALLOWED_TYPES = {"image/png", "image/jpeg", "image/jpg"}

# Create service once (so model is loaded only once)
inference_service = InferenceService()


@router.get("/health")
def health():
    return {"status": "ok"}


@router.post("/predict", response_model=PredictionResponse)
async def predict(file: UploadFile = File(...)):
    # Validate file type
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Only PNG and JPG/JPEG files are allowed."
        )

    # Read uploaded file
    contents = await file.read()

    if not contents:
        raise HTTPException(
            status_code=400,
            detail="Uploaded file is empty."
        )

    try:
        # Send image to model for prediction
        print(f"Received file: {file.filename}")
        result = inference_service.predict(contents)
        print(f"Prediction result: {result}")
        return result

    except Exception as ex:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(ex)}"
        )