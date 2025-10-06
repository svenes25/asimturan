from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from api import api
import uvicorn

app = FastAPI(title="E-Commerce API", version="1.0")

# Tüm endpointleri içeren router
app.include_router(api.router)
origins = [
    "http://localhost:3000",  # Frontend adresin
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # veya ["*"] tüm originler için
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def root():
    return {"message": "API is running"}

# Uvicorn ile başlatma
if __name__ == "__main__":
    import os
    import sys
    sys.path.append(os.path.dirname(os.path.dirname(__file__)))

    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
