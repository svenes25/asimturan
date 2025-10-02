from sqlalchemy import Column, Integer, String, ForeignKey
from ..database import Base

class Address(Base):
    __tablename__ = "address"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    address = Column(String, nullable=False)
