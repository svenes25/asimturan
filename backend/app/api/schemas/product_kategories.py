from pydantic import BaseModel

class ProductKategoriesBase(BaseModel):
    product_id: int
    kategories_id: int

class ProductKategoriesCreate(ProductKategoriesBase):
    pass

class ProductKategoriesRead(ProductKategoriesBase):
    id: int

    model_config = {"from_attributes": True}  # v2 uyumlu
