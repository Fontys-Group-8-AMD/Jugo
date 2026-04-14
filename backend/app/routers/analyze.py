from typing import Literal

from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from pydantic import BaseModel

router = APIRouter(prefix="/analyze", tags=["analyze"])
class AnalysisResponse(BaseModel):
    status: str


@router.post("/", response_model=AnalysisResponse)
async def analyze_image(
    file: UploadFile = File(...),
    mock_status: Literal["compliant", "non-compliant"] | None = Form(default=None),
):
    if file.content_type not in {"image/png", "image/jpeg"}:
        raise HTTPException(status_code=400, detail="Only PNG and JPEG images are allowed.")

    _ = await file.read()

    # Temporary test hook until model inference is connected.
    predicted_status = mock_status or "non-compliant"

    return AnalysisResponse(
        status=predicted_status,
    )