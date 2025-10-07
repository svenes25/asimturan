from pydantic import BaseModel

class CategoriesBase(BaseModel):
    id : int
    name: str

class CategoriesCreate(CategoriesBase):
    pass

class CategoriesRead(CategoriesBase):
    id: int

    model_config = {"from_attributes": True}  # v2 uyumlu
