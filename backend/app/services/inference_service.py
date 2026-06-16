from io import BytesIO
from pathlib import Path
from statistics import mean

import torch
from PIL import Image
from torch import nn
from torchvision import models, transforms

from app.core.prediction_constants import (
    COMPLIANT_SUGGESTIONS,
    MODEL_RULE_NAMES,
    MODEL_TO_API_RULE,
    NON_COMPLIANT_FALLBACK_SUGGESTION,
    RULE_EXPLANATIONS,
    RULE_LABELS,
    SCENARIO_GROUPS,
)

# Decide whether to use GPU or CPU
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

DEFAULT_IMAGE_SIZE = 224
DEFAULT_THRESHOLD = 0.5
DROPOUT_RATE = 0.3
MODEL_OUTPUT_SIZE = 10


class InferenceService:
    def __init__(self):
        # Load the saved model file exported from the final notebook.
        model_path = (
            Path(__file__).resolve().parents[3]
            / "model"
            / "ibcs_final_model.pth"
        )

        checkpoint = torch.load(model_path, map_location=DEVICE)

        # The notebook export is a raw state_dict, but keep compatibility with
        # older wrapped checkpoints in case the file is regenerated later.
        if isinstance(checkpoint, dict) and "model_state_dict" in checkpoint:
            model_state_dict = checkpoint["model_state_dict"]
            self.img_size = checkpoint.get("img_size", DEFAULT_IMAGE_SIZE)
            self.threshold = checkpoint.get("threshold", DEFAULT_THRESHOLD)
        else:
            model_state_dict = checkpoint
            self.img_size = DEFAULT_IMAGE_SIZE
            self.threshold = DEFAULT_THRESHOLD

        # Image preprocessing (must match training!)
        self.transform = transforms.Compose([
            transforms.Resize((self.img_size, self.img_size)),
            transforms.ToTensor(),
        ])

        # Rebuild the same model architecture used during training
        self.model = self._build_model()

        # Load trained weights into the model
        self.model.load_state_dict(model_state_dict)

        # Move model to CPU/GPU and set it to evaluation mode
        self.model.to(DEVICE)
        self.model.eval()

    def _build_model(self) -> nn.Module:
        # Use ResNet18 (same as in training)
        model = models.resnet18(weights=None)

        # Replace final layer for multi-label classification (10 outputs)
        model.fc = nn.Sequential(
            nn.Dropout(DROPOUT_RATE),
            nn.Linear(model.fc.in_features, MODEL_OUTPUT_SIZE),
        )

        return model
    
    def _prepare_image(self, image_bytes: bytes) -> torch.Tensor:
        image = Image.open(BytesIO(image_bytes)).convert("RGB")
        return self.transform(image).unsqueeze(0).to(DEVICE)
    
    def _run_inference(self, image_tensor: torch.Tensor) -> list[float]:
        with torch.no_grad():
            output = self.model(image_tensor)
            return torch.sigmoid(output).squeeze(0).cpu().tolist()

    def _build_rule_prediction(self, model_rule_name: str, probability: float) -> dict:
        api_rule_name = MODEL_TO_API_RULE[model_rule_name]

        mistake_detected = probability >= self.threshold
        predicted_value = 1 if mistake_detected else 0
        is_compliant = not mistake_detected
        confidence = probability if mistake_detected else 1 - probability

        return {
            "rule": api_rule_name,
            "label": RULE_LABELS[api_rule_name],
            "prediction": predicted_value,
            "status": "compliant" if is_compliant else "non-compliant",
            "confidence": round(confidence, 4),
            "probability_compliant": round(1 - probability, 4),
            "probability_non_compliant": round(probability, 4),
            "explanation": RULE_EXPLANATIONS[api_rule_name][
                "correct" if is_compliant else "incorrect"
            ],
        }
    
    def _build_scenario_checks(self, rules: list[dict]) -> list[dict]:
        scenario_checks = []

        for group in SCENARIO_GROUPS:
            group_rules = [
                rule for rule in rules
                if rule["rule"] in group["rules"]
            ]

            has_non_compliant_rule = any(
                rule["status"] == "non-compliant"
                for rule in group_rules
            )

            if not has_non_compliant_rule:
                continue

            scenario_checks.append(
                {
                    "label": group["label"],
                    "evaluated": True,
                    "status": "non-compliant",
                }
            )

        return scenario_checks

    def _build_issues(self, rules: list[dict]) -> list[dict]:
        return [
            {
                "message": f"{rule['label']} is non-compliant. {rule['explanation']}",
                "severity": "high",
            }
            for rule in rules
            if rule["status"] == "non-compliant"
        ]

    def _build_suggestions(self, issues: list[dict], rules: list[dict]) -> list[str]:
        if not issues:
            return COMPLIANT_SUGGESTIONS

        non_compliant_suggestions = [
            rule["explanation"]
            for rule in rules
            if rule["status"] == "non-compliant"
        ]

        return [
            *non_compliant_suggestions,
            NON_COMPLIANT_FALLBACK_SUGGESTION,
        ]

    def predict(self, image_bytes: bytes) -> dict[str, object]:
        image_tensor = self._prepare_image(image_bytes)
        probabilities = self._run_inference(image_tensor)

        if len(probabilities) != len(MODEL_RULE_NAMES):
            raise ValueError(
                f"Model returned {len(probabilities)} outputs, expected {len(MODEL_RULE_NAMES)}."
            )

        rules = [
            self._build_rule_prediction(model_rule_name, probability)
            for model_rule_name, probability in zip(MODEL_RULE_NAMES, probabilities)
        ]

        confidences = [rule["confidence"] for rule in rules]

        overall_compliant = all(rule["status"] == "compliant" for rule in rules)
        overall_score = round(mean(confidences) * 100) if confidences else 0

        scenario_checks = self._build_scenario_checks(rules)
        issues = self._build_issues(rules)
        suggestions = self._build_suggestions(issues, rules)

        return {
            "prediction": 1 if overall_compliant else 0,
            "label_name": "compliant" if overall_compliant else "non-compliant",
            "score": overall_score,
            "probability_compliant": round(
                mean(rule["probability_compliant"] for rule in rules), 4
            ),
            "probability_non_compliant": round(
                mean(rule["probability_non_compliant"] for rule in rules), 4
            ),
            "rules": rules,
            "scenario_checks": scenario_checks,
            "issues": issues,
            "suggestions": suggestions,
        }