from sqlalchemy import Column, Integer, ForeignKey
from ..database import Base

class CampaignProducts(Base):
    __tablename__ = "campaign_products"
    id = Column(Integer, primary_key=True, index=True)
    campaign_id = Column(Integer, ForeignKey("campaign.id", ondelete="CASCADE"), nullable=False)
    product_id = Column(Integer, ForeignKey("product.id", ondelete="CASCADE"), nullable=False)
