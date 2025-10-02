from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.campaign_kategories import CampaignKategories
from ..schemas.campaign_kategories import CampaignKategoriesCreate, CampaignKategoriesRead

router = APIRouter(prefix="/campaign_kategories", tags=["campaign_kategories"])

@router.get("/", response_model=list[CampaignKategoriesRead])
def get_campaign_kategories(db: Session = Depends(get_db)):
    return db.query(CampaignKategories).all()

@router.get("/{id}", response_model=CampaignKategoriesRead)
def get_campaign_kategorie(id: int, db: Session = Depends(get_db)):
    ck = db.query(CampaignKategories).filter(CampaignKategories.id == id).first()
    if not ck:
        raise HTTPException(status_code=404, detail="CampaignKategories not found")
    return ck

@router.post("/", response_model=CampaignKategoriesRead)
def create_campaign_kategorie(ck: CampaignKategoriesCreate, db: Session = Depends(get_db)):
    db_ck = CampaignKategories(**ck.dict())
    db.add(db_ck)
    db.commit()
    db.refresh(db_ck)
    return db_ck

@router.put("/{id}", response_model=CampaignKategoriesRead)
def update_campaign_kategorie(id: int, ck: CampaignKategoriesCreate, db: Session = Depends(get_db)):
    db_ck = db.query(CampaignKategories).filter(CampaignKategories.id == id).first()
    if not db_ck:
        raise HTTPException(status_code=404, detail="CampaignKategories not found")
    for key, value in ck.dict().items():
        setattr(db_ck, key, value)
    db.commit()
    db.refresh(db_ck)
    return db_ck

@router.delete("/{id}")
def delete_campaign_kategorie(id: int, db: Session = Depends(get_db)):
    db_ck = db.query(CampaignKategories).filter(CampaignKategories.id == id).first()
    if not db_ck:
        raise HTTPException(status_code=404, detail="CampaignKategories not found")
    db.delete(db_ck)
    db.commit()
    return {"detail": "CampaignKategories deleted"}
