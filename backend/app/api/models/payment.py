from sqlalchemy import Column, Integer, String, ForeignKey, Date
from sqlalchemy.orm import relationship

from ..database import Base

class Payment(Base):
    __tablename__ = "payment"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(100), nullable=False)
    number = Column(String(20), nullable=False)
    date = Column(String(4), nullable=False)
    cvv = Column(String(4), nullable=False)

    user = relationship("User", back_populates="payments")
