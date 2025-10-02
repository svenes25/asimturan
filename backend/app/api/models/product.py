from sqlalchemy import Column, Integer, String, Numeric, Text, DateTime
from sqlalchemy.sql import func
from ..database import Base

class Product(Base):
    __tablename__ = "product"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    price = Column(Numeric(10,2), nullable=False)
    stock_limit = Column(Integer, nullable=True)
    limited_price = Column(Numeric(10,2), nullable=True)
    description = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
