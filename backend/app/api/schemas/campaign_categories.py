from pydantic import BaseModel

class CampaignCategoriesBase(BaseModel):
    campaign_id: int
    category_id: int

class CampaignCategoriesCreate(CampaignCategoriesBase):
    pass

class CampaignCategoriesRead(CampaignCategoriesBase):
    id: int

    model_config = {"from_attributes": True}  # Pydantic v2 uyumlu
