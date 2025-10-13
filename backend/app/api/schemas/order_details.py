from pydantic import BaseModel

class OrderDetailsBase(BaseModel):
    product_id: int
    piece: int
    price: float

class OrderDetailsCreate(OrderDetailsBase):
    pass

class OrderDetailsRead(OrderDetailsBase):
    id: int
    model_config = {"from_attributes": True}  # Pydantic v2 uyumlu
