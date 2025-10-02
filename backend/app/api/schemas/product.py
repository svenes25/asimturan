from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ProductBase(BaseModel):
    name: str
    price: float
    limit: Optional[int] = None
    limited_price: Optional[float] = None
    description: str

class ProductCreate(ProductBase):
    pass

class ProductRead(ProductBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
