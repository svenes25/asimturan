from pydantic import BaseModel
from datetime import datetime
from .categories import CategoriesBase
class ProductBase(BaseModel):
    id: int
    name: str
    price: float
    lower: int | None = None
    limited_price: float | None = None
    description: str | None = None
    image_url: str | None = None


class ProductCreate(ProductBase):
    categoryIds: list[int]

class ProductRead(ProductBase):
    created_at: datetime
    updated_at: datetime
    categories: list[CategoriesBase]
    class Config:
        from_attributes = True

class ProductStars(ProductRead):
    star_count: int
    star_avg : int
    class Config:
        from_attributes = True

class ProductComments(ProductStars):
    comments: list[str]
    created_at : datetime
    class Config:
        from_attributes = True

