from sqlalchemy import Column, Integer, ForeignKey, Numeric, CheckConstraint
from ..database import Base

class OrderDetails(Base):
    __tablename__ = "order_details"
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    product_id = Column(Integer, ForeignKey("product.id", ondelete="CASCADE"), nullable=False)
    piece = Column(Integer, nullable=False)
    price = Column(Numeric(10,2), nullable=False)
    __table_args__ = (CheckConstraint('piece > 0', name='piece_check'),)
