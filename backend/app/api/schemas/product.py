from pydantic import BaseModel
from datetime import datetime
from .categories import CategoriesBase
class ProductBase(BaseModel):
    name: str
    price: float
    lower: int | None = None
    limited_price: float | None = None
    description: str | None = None
    image_url: str | None = None


class ProductCreate(ProductBase):
    categoryIds: list[int]

class ProductRead(ProductBase):
    id: int
    created_at: datetime
    updated_at: datetime
    categories: list[CategoriesBase]

    class Config:
        from_attributes = True
