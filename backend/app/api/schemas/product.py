from pydantic import BaseModel
from datetime import datetime

class ProductBase(BaseModel):
    name: str
    price: float
    limited: int | None = None
    limited_price: float | None = None
    description: str | None = None
    image_url: str | None = None   # 👈 görsel yolu

class ProductCreate(ProductBase):
    pass

class ProductRead(ProductBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
