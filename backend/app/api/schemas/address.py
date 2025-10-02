from pydantic import BaseModel

class AddressBase(BaseModel):
    user_id: int
    address: str

class AddressCreate(AddressBase):
    pass

class AddressRead(AddressBase):
    id: int

    class Config:
        orm_mode = True
