from pydantic import BaseModel
class PredictionResponse(BaseModel):
    prediction: int
    label_name: str
    probability_compliant: float
    probability_non_compliant: float