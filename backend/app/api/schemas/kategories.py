from pydantic import BaseModel

class KategoriesBase(BaseModel):
    name: str

class KategoriesCreate(KategoriesBase):
    pass

class KategoriesRead(KategoriesBase):
    id: int

    model_config = {"from_attributes": True}  # v2 uyumlu
