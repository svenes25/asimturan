from sqlalchemy import Column, Integer, ForeignKey
from ..database import Base

class ProductKategories(Base):
    __tablename__ = "product_kategories"
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("product.id", ondelete="CASCADE"), nullable=False)
    kategories_id = Column(Integer, ForeignKey("kategories.id", ondelete="CASCADE"), nullable=False)
