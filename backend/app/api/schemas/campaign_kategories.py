from pydantic import BaseModel

class CampaignKategoriesBase(BaseModel):
    campaign_id: int
    kategori_id: int

class CampaignKategoriesCreate(CampaignKategoriesBase):
    pass

class CampaignKategoriesRead(CampaignKategoriesBase):
    id: int

    model_config = {"from_attributes": True}  # Pydantic v2 uyumlu
