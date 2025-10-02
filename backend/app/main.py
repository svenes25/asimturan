from fastapi import FastAPI
from api import api
import uvicorn

app = FastAPI(title="E-Commerce API", version="1.0")

# Tüm endpointleri içeren router
app.include_router(api.router)

@app.get("/")
def root():
    return {"message": "API is running"}

# Uvicorn ile başlatma
if __name__ == "__main__":
    uvicorn.run(
        "main:app",          # main.py içindeki app
        host="0.0.0.0",      # tüm IP'lerden erişim
        port=8000,           # port
        reload=True          # kod değişince otomatik reload
    )
