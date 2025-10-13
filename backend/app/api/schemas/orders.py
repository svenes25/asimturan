from typing import List

from pydantic import BaseModel
from datetime import datetime

from api.schemas.order_details import OrderDetailsBase


class OrdersBase(BaseModel):
    user_id: int
    time: datetime
    status: str
    status_detail: str | None = None

class OrdersCreate(OrdersBase):
    detail: List[OrderDetailsBase]

class OrdersRead(OrdersBase):
    id: int

    detail: List[OrderDetailsBase]
    model_config = {"from_attributes": True}
