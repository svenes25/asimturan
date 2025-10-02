from sqlalchemy import Column, Integer, String
from ..database import Base

class Kategories(Base):
    __tablename__ = "kategories"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
