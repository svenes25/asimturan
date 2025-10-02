from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.campaign_products import CampaignProducts
from ..schemas.campaign_products import CampaignProductsCreate, CampaignProductsRead

router = APIRouter(prefix="/campaign_products", tags=["campaign_products"])

@router.get("/", response_model=list[CampaignProductsRead])
def get_campaign_products(db: Session = Depends(get_db)):
    return db.query(CampaignProducts).all()

@router.get("/{id}", response_model=CampaignProductsRead)
def get_campaign_product(id: int, db: Session = Depends(get_db)):
    cp = db.query(CampaignProducts).filter(CampaignProducts.id == id).first()
    if not cp:
        raise HTTPException(status_code=404, detail="CampaignProducts not found")
    return cp

@router.post("/", response_model=CampaignProductsRead)
def create_campaign_product(cp: CampaignProductsCreate, db: Session = Depends(get_db)):
    db_cp = CampaignProducts(**cp.dict())
    db.add(db_cp)
    db.commit()
    db.refresh(db_cp)
    return db_cp

@router.put("/{id}", response_model=CampaignProductsRead)
def update_campaign_product(id: int, cp: CampaignProductsCreate, db: Session = Depends(get_db)):
    db_cp = db.query(CampaignProducts).filter(CampaignProducts.id == id).first()
    if not db_cp:
        raise HTTPException(status_code=404, detail="CampaignProducts not found")
    for key, value in cp.dict().items():
        setattr(db_cp, key, value)
    db.commit()
    db.refresh(db_cp)
    return db_cp

@router.delete("/{id}")
def delete_campaign_product(id: int, db: Session = Depends(get_db)):
    db_cp = db.query(CampaignProducts).filter(CampaignProducts.id == id).first()
    if not db_cp:
        raise HTTPException(status_code=404, detail="CampaignProducts not found")
    db.delete(db_cp)
    db.commit()
    return {"detail": "CampaignProducts deleted"}
