from fastapi import APIRouter, File, HTTPException, UploadFile

router = APIRouter()

ALLOWED_TYPES = {"image/png", "image/jpeg", "image/jpg"}


@router.get("/health")
def health():
    return {"status": "ok"}


@router.post("/predict")
async def predict(file: UploadFile = File(...)):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Only PNG and JPG/JPEG files are allowed."
        )

    contents = await file.read()

    if not contents:
        raise HTTPException(
            status_code=400,
            detail="Uploaded file is empty."
        )

    return {
        "prediction": 1,
        "label_name": "compliant",
        "probability_compliant": 0.91,
        "probability_non_compliant": 0.09,
        "filename": file.filename
    }