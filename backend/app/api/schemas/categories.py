from pydantic import BaseModel

class CategoriesBase(BaseModel):
    name: str

class CategoriesCreate(CategoriesBase):
    pass

class CategoriesRead(CategoriesBase):
    id: int
    product_count : int

    model_config = {"from_attributes": True}  # v2 uyumlu
