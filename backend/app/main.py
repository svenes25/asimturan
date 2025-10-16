from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
# Modül hatasını çözmek için göreceli içeri aktarma (.) kullanıldı.
from .api import api

from fastapi.staticfiles import StaticFiles

app = FastAPI(title="E-Commerce API", version="1.0")

app.mount("/static", StaticFiles(directory="app/api/static"), name="static")

# API router'ını ekleme
app.include_router(api.router)

# CORS ayarları
origins = [
    "http://localhost:3000",  # Frontend adresin
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "API is running"}

# Not: Uvicorn, Docker Compose'daki 'command' ile çalıştırılacağı için
# 'if __name__ == "__main__":' bloğu ve 'uvicorn.run()' çağrısı kaldırılmıştır.
