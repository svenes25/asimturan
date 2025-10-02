from sqlalchemy import Column, Integer, String, Numeric, Date, DateTime
from sqlalchemy.sql import func
from ..database import Base

class Campaign(Base):
    __tablename__ = "campaign"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    price = Column(Numeric(10,2), nullable=False)
    type = Column(String(50), nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
