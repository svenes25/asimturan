from datetime import datetime

from pydantic import BaseModel

class ProductCommentsBase(BaseModel):
    product_id: int
    user_id: int
    comment: str
class ProductCommentsCreate(ProductCommentsBase):
    pass

class ProductCommentsRead(ProductCommentsBase):
    id: int
    model_config = {"from_attributes": True}  # Pydantic v2 uyumlu
