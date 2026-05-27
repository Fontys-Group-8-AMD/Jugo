from io import BytesIO
from pathlib import Path
from statistics import mean

import torch
from PIL import Image
from torch import nn
from torchvision import models, transforms


# Decide whether to use GPU or CPU
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

RULE_NAMES = [
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

RULE_LABELS = {
    "AC-graph": "Actual Graph",
    "PY-graph": "Previous Year Graph",
    "PL-graph": "Plan Graph",
    "FC-graph": "Forecast Graph",
    "AC-abr": "Actual Abbreviation",
    "PY-abr": "Previous Year Abbreviation",
    "BU-abr": "Budget Abbreviation",
    "PL-abr": "Plan Abbreviation",
    "FC-abr": "Forecast Abbreviation",
    "Axis": "Axis",
}

RULE_EXPLANATIONS = {
    "AC": {
        "correct": "Actual is correct because the dashboard uses a dark solid color, which follows IBCS standards for actual values.",
        "incorrect": "Actual is incorrect because the dashboard does not use a dark solid color. According to IBCS standards, actual values should be clearly emphasized using dark solid colors.",
    },
    "PY": {
        "correct": "Previous Year is correct because the visual style is lighter than Actual values, making historical comparisons easier.",
        "incorrect": "Previous Year is incorrect because the color is not lighter than Actual values. IBCS recommends lighter colors for historical data.",
    },
    "PL": {
        "correct": "Plan is correct because the dashboard uses outlined shapes, which is the recommended IBCS style for planned values.",
        "incorrect": "Plan is incorrect because the dashboard uses filled shapes instead of outlined shapes. IBCS standards recommend outlined visuals for planned values.",
    },
    "FC": {
        "correct": "Forecast is correct because the dashboard uses a hatched or patterned style, which follows IBCS standards for forecast values.",
        "incorrect": "Forecast is incorrect because the dashboard does not use a hatched pattern. According to IBCS standards, forecast values should use a patterned style.",
    },
}


class InferenceService:
    def __init__(self):
        # Load the saved model file exported from the final notebook.
        model_path = Path(__file__).resolve().parents[3] / "model" / "ibcs_final_model.pth"

        checkpoint = torch.load(model_path, map_location=DEVICE)

        # The notebook export is a raw state_dict, but keep compatibility with
        # older wrapped checkpoints in case the file is regenerated later.
        if isinstance(checkpoint, dict) and "model_state_dict" in checkpoint:
            model_state_dict = checkpoint["model_state_dict"]
            self.img_size = checkpoint.get("img_size", 224)
            self.threshold = checkpoint.get("threshold", 0.5)
        else:
            model_state_dict = checkpoint
            self.img_size = 224
            self.threshold = 0.5

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

    def _build_model(self):
        # Use ResNet18 (same as in training)
        model = models.resnet18(weights=None)

        # Replace final layer for multi-label classification (4 outputs)
        model.fc = nn.Sequential(
            nn.Dropout(0.3),
            nn.Linear(model.fc.in_features, 10),
        )

        return model

    def predict(self, image_bytes: bytes):
        # Convert uploaded file bytes into an image
        image = Image.open(BytesIO(image_bytes)).convert("RGB")

        # Apply same transformations as during training
        image_tensor = self.transform(image).unsqueeze(0).to(DEVICE)

        # Disable gradient calculation (faster + no training)
        with torch.no_grad():
            output = self.model(image_tensor)

            probabilities = torch.sigmoid(output).squeeze(0).cpu().tolist()

        rules = []
        confidences = []

        for rule_name, probability in zip(RULE_NAMES, probabilities):
            mistake_detected = probability >= self.threshold
            predicted_value = 1 if mistake_detected else 0
            is_compliant = not mistake_detected

            confidence = probability if mistake_detected else 1 - probability

            confidences.append(confidence)

            rules.append(
                {
                    "rule": rule_name,
                    "label": RULE_LABELS[rule_name],
                    "prediction": predicted_value,
                    "status": "compliant" if is_compliant else "non-compliant",
                    "confidence": round(confidence, 4),
                    "probability_compliant": round(probability, 4),
                    "probability_non_compliant": round(1 - probability, 4),
                    "explanation": (
                        f"{RULE_LABELS[rule_name]} appears compliant."
                        if is_compliant
                        else f"{RULE_LABELS[rule_name]} appears non-compliant and should be reviewed."
                    ),
                }
            )

        overall_compliant = all(rule["status"] == "compliant" for rule in rules)
        overall_score = round(mean(confidences) * 100) if confidences else 0

        # Return result as JSON-friendly dict
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
        }