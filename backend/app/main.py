from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.prediction_router import router as prediction_router

app = FastAPI(title="Jugo Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(prediction_router)


@app.get("/")
def root():
    return {"message": "Jugo backend is running"}