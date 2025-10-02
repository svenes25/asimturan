from sqlalchemy import Column, Integer, ForeignKey
from ..database import Base

class CampaignKategories(Base):
    __tablename__ = "campaign_kategories"
    id = Column(Integer, primary_key=True, index=True)
    campaign_id = Column(Integer, ForeignKey("campaign.id", ondelete="CASCADE"), nullable=False)
    kategorie_id = Column(Integer, ForeignKey("kategories.id", ondelete="CASCADE"), nullable=False)
