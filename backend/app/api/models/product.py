from sqlalchemy import Column, Integer, String, Float, Text, DateTime
from ..database import Base
from datetime import datetime

class Product(Base):
    __tablename__ = "product"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    limited = Column(Integer, nullable=True)
    limited_price = Column(Float, nullable=True)
    description = Column(Text, nullable=True)
    image_url = Column(Text, nullable=True)  # 👈 görsel yolu buraya
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
