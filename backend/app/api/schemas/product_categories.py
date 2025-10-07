from pydantic import BaseModel

class ProductCategoriesBase(BaseModel):
    product_id: int
    categories_id: int

class ProductCategoriesCreate(ProductCategoriesBase):
    pass

class ProductCategoriesRead(ProductCategoriesBase):
    id: int

    model_config = {"from_attributes": True}  # v2 uyumlu
