from typing import Literal

from pydantic import BaseModel


RuleName = Literal[
    "AC-graph",
    "PY-graph",
    "PL-graph",
    "FC-graph",
    "AC-abr",
    "PY-abr",
    "BU-abr",
    "PL-abr",
    "FC-abr",
    "Axis",
]

ComplianceStatus = Literal["compliant", "non-compliant"]

class RulePrediction(BaseModel):
    rule: RuleName
    label: str
    prediction: int
    status: ComplianceStatus
    confidence: float
    probability_compliant: float
    probability_non_compliant: float
    explanation: str


class ScenarioCheck(BaseModel):
    label: str
    present: bool
    status: ComplianceStatus


class AnalysisIssue(BaseModel):
    message: str
    severity: Literal["high", "medium"]


class PredictionResponse(BaseModel):
    prediction: int
    label_name: ComplianceStatus
    score: int
    probability_compliant: float
    probability_non_compliant: float
    rules: list[RulePrediction]
    scenario_checks: list[ScenarioCheck]
    issues: list[AnalysisIssue]
    suggestions: list[str]