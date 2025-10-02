from pydantic import BaseModel
from datetime import date

class CampaignBase(BaseModel):
    name: str
    price: float
    type: str
    start_date: date
    end_date: date

class CampaignCreate(CampaignBase):
    pass

class CampaignRead(CampaignBase):
    id: int

    model_config = {"from_attributes": True}  # Pydantic v2 uyumlu
