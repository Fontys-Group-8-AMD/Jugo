from typing import Literal

from pydantic import BaseModel


class RulePrediction(BaseModel):
    rule: Literal["AC", "PY", "PL", "FC"]
    label: str
    prediction: int
    status: Literal["compliant", "non-compliant"]
    confidence: float
    probability_compliant: float
    probability_non_compliant: float
    explanation: str


class PredictionResponse(BaseModel):
    prediction: int
    label_name: Literal["compliant", "non-compliant"]
    score: int
    probability_compliant: float
    probability_non_compliant: float
    rules: list[RulePrediction]