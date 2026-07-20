from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.generate import router

app = FastAPI(title="CatalogAI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
def home():
    return {
        "status": "success",
        "message": "CatalogAI Backend Running 🚀",
    }