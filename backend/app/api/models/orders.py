from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database import Base

class Orders(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    time = Column(DateTime(timezone=True), server_default=func.now())
    status = Column(String(50), nullable=False, default="pending")
    status_detail = Column(Text)

    user = relationship("User", back_populates="orders")
