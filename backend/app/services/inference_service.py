from io import BytesIO
from pathlib import Path

import torch
from PIL import Image
from torch import nn
from torchvision import models, transforms


# Decide whether to use GPU or CPU
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")


class InferenceService:
    def __init__(self):
        # Load the saved model file (.pth)
        model_path = Path(__file__).resolve().parents[3] / "model" / "jugo_simple_model.pth"

        checkpoint = torch.load(model_path, map_location=DEVICE)

        # Get settings that were saved with the model
        self.img_size = checkpoint.get("img_size", 128)
        self.threshold = checkpoint.get("threshold", 0.5)

        # Image preprocessing (must match training!)
        self.transform = transforms.Compose([
            transforms.Resize((self.img_size, self.img_size)),
            transforms.ToTensor(),
        ])

        # Rebuild the same model architecture used during training
        self.model = self._build_model()

        # Load trained weights into the model
        self.model.load_state_dict(checkpoint["model_state_dict"])

        # Move model to CPU/GPU and set it to evaluation mode
        self.model.to(DEVICE)
        self.model.eval()

    def _build_model(self):
        # Use ResNet18 (same as in training)
        model = models.resnet18(weights=None)

        # Replace final layer for binary classification (1 output)
        model.fc = nn.Linear(model.fc.in_features, 1)

        return model

    def predict(self, image_bytes: bytes):
        # Convert uploaded file bytes into an image
        image = Image.open(BytesIO(image_bytes)).convert("RGB")

        # Apply same transformations as during training
        image_tensor = self.transform(image).unsqueeze(0).to(DEVICE)

        # Disable gradient calculation (faster + no training)
        with torch.no_grad():
            output = self.model(image_tensor)

            # Convert raw output to probability (0–1)
            probability_compliant = torch.sigmoid(output).item()

        # Decide class based on threshold (default = 0.5)
        prediction = 1 if probability_compliant >= self.threshold else 0

        # Convert to readable label
        label_name = "compliant" if prediction == 1 else "non-compliant"

        # Return result as JSON-friendly dict
        return {
            "prediction": prediction,
            "label_name": label_name,
            "probability_compliant": round(probability_compliant, 4),
            "probability_non_compliant": round(1 - probability_compliant, 4),
        }