from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.route.upload import router as upload_router
from app.api.route.analysis import router as analysis_router
from app.api.route.websocket import (
    router as websocket_router
)

app = FastAPI(title="GhostLine Backend")

origins = [
    "http://localhost:3000",
    "https://ghostline-ai.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,   # or ["*"] for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(upload_router)
app.include_router(analysis_router)
app.include_router(
    websocket_router
)

@app.get("/")
async def root():
    return {
        "message": "GhostLine backend running"
    }

