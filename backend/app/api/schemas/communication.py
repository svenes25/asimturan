from pydantic import BaseModel
class CommunicationBase(BaseModel):
    tel: str
    mail: str
    address: str
    time: str

class CommunicationCreate(CommunicationBase):
    pass

class CommunicationRead(CommunicationBase):
    id: int

    model_config = {"from_attributes": True}  # Pydantic v2 uyumlu
