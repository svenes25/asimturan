from pydantic import BaseModel

class ProductStarsBase(BaseModel):
    product_id: int
    user_id: int
    stars: int

class ProductStarsCreate(ProductStarsBase):
    pass

class ProductStarsRead(ProductStarsBase):
    id: int

    model_config = {"from_attributes": True}  # Pydantic v2 uyumlu
