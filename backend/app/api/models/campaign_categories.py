from sqlalchemy import Column, Integer, ForeignKey
from ..database import Base

class CampaignCategories(Base):
    __tablename__ = "campaign_categories"
    id = Column(Integer, primary_key=True, index=True)
    campaign_id = Column(Integer, ForeignKey("campaign.id", ondelete="CASCADE"), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id", ondelete="CASCADE"), nullable=False)
