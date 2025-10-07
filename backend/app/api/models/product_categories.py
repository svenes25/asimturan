from sqlalchemy import Column, Integer, ForeignKey
from ..database import Base

class ProductCategories(Base):
    __tablename__ = "product_categories"
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("product.id", ondelete="CASCADE"), nullable=False)
    categories_id = Column(Integer, ForeignKey("categories.id", ondelete="CASCADE"), nullable=False)
