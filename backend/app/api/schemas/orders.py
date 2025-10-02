from pydantic import BaseModel
from datetime import datetime

class OrdersBase(BaseModel):
    user_id: int
    time: datetime
    status: str
    status_detail: str | None = None

class OrdersCreate(OrdersBase):
    pass

class OrdersRead(OrdersBase):
    id: int

    model_config = {"from_attributes": True}  # Pydantic v2 uyumlu
