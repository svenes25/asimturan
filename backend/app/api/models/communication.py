from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from ..database import Base

class Communication(Base):
    __tablename__ = "communication"
    id = Column(Integer, primary_key=True, index=True)
    tel = Column(String(20))
    mail = Column(String(100))
    address = Column(Text)
    time = Column(String(20))
