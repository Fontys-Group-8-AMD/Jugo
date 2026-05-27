from fastapi.testclient import TestClient

from app.main import app
from app.routers import prediction_router


class FakeInferenceService:
    def predict(self, image_bytes: bytes) -> dict:
        return {
            "prediction": 1,
            "label_name": "compliant",
            "score": 90,
            "probability_compliant": 0.9,
            "probability_non_compliant": 0.1,
            "rules": [],
            "scenario_checks": [],
            "issues": [],
            "suggestions": [
                "All IBCS rule groups look compliant according to the model."
            ],
        }


def test_root_endpoint_returns_running_message():
    client = TestClient(app)

    response = client.get("/")

    assert response.status_code == 200
    assert response.json() == {"message": "Jugo backend is running"}


def test_health_endpoint_returns_ok():
    client = TestClient(app)

    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_predict_accepts_valid_image(monkeypatch):
    monkeypatch.setattr(
        prediction_router,
        "inference_service",
        FakeInferenceService(),
    )

    client = TestClient(app)

    response = client.post(
        "/predict",
        files={
            "file": (
                "dashboard.png",
                b"fake-image-bytes",
                "image/png",
            )
        },
    )

    assert response.status_code == 200
    assert response.json()["label_name"] == "compliant"
    assert response.json()["score"] == 90


def test_predict_rejects_invalid_file_type():
    client = TestClient(app)

    response = client.post(
        "/predict",
        files={
            "file": (
                "notes.txt",
                b"not-an-image",
                "text/plain",
            )
        },
    )

    assert response.status_code == 400
    assert response.json() == {
        "detail": "Only PNG and JPG/JPEG files are allowed."
    }


def test_predict_rejects_empty_file(monkeypatch):
    monkeypatch.setattr(
        prediction_router,
        "inference_service",
        FakeInferenceService(),
    )

    client = TestClient(app)

    response = client.post(
        "/predict",
        files={
            "file": (
                "empty.png",
                b"",
                "image/png",
            )
        },
    )

    assert response.status_code == 400
    assert response.json() == {"detail": "Uploaded file is empty."}