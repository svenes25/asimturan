from sqlalchemy import Column, Integer, ForeignKey, CheckConstraint
from ..database import Base

class ProductStarsModel(Base):
    __tablename__ = "product_stars"
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("product.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    stars = Column(Integer, nullable=False)
    __table_args__ = (CheckConstraint('stars >= 1 AND stars <= 5', name='stars_check'),)
