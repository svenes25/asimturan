from pydantic import BaseModel
from typing import Optional

class PaymentBase(BaseModel):
    user_id: int
    name: str
    number: str
    date: str
    cvv: str

class PaymentCreate(PaymentBase):
    pass

class PaymentRead(PaymentBase):
    id: int

    model_config = {
        "from_attributes": True
    }
class PaymentUpdate(BaseModel):
    name: Optional[str]
    number: Optional[str]
    date: Optional[str]
    cvv: Optional[str]