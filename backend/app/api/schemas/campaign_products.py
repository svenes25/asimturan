from pydantic import BaseModel

class CampaignProductsBase(BaseModel):
    campaign_id: int
    product_id: int

class CampaignProductsCreate(CampaignProductsBase):
    pass

class CampaignProductsRead(CampaignProductsBase):
    id: int

    model_config = {"from_attributes": True}  # Pydantic v2 uyumlu
