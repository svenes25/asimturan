from typing import Optional

from pydantic import BaseModel
from datetime import date

from .categories import CampaignCategoriesRead
from .product import ProductBase


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
    products: Optional[list[ProductBase]]
    categories: Optional[list[CampaignCategoriesRead]]

    model_config = {"from_attributes": True}  # Pydantic v2 uyumlu
class CampaignUpdate(BaseModel):
    name: Optional[str]
    price: Optional[float]
    type: Optional[str]
    start_date: Optional[str]
    end_date: Optional[str]
    products: Optional[list[int]] = []
    categories: Optional[list[int]] = []