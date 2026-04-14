from fastapi import FastAPI
from app.routers import analyze, example

app = FastAPI()

app.include_router(analyze.router)
app.include_router(example.router)

@app.get("/")
def root():
    return {
        "message": "Backend works!",
        "endpoint": "/analyze",
    }
