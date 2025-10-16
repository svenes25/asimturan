from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List

from .address import AddressBase
from .orders import OrdersRead
from .payment import PaymentRead


class UserBase(BaseModel):
    name: str
    surname: str
    tel: Optional[str] = None
    mail: str
    role: str

class UserCreate(UserBase):
    password: str

class UserRead(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime
    payments: List[PaymentRead] = []
    addresses: list[AddressBase] | None = None
    orders: List[OrdersRead] = []
    class Config:
        orm_mode = True

class LoginRequest(BaseModel):
    mail: EmailStr
    password: str

class UserUpdate(BaseModel):
    name: Optional[str]
    surname: Optional[str]
    tel: Optional[str]
    mail: Optional[str]

    class Config:
        orm_mode = True
class EmailPayload(BaseModel):
    mail: str
    role: str
