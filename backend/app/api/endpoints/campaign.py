from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.campaign import Campaign
from ..schemas.campaign import CampaignCreate, CampaignRead

router = APIRouter(prefix="/campaign", tags=["campaign"])

@router.get("/", response_model=list[CampaignRead])
def get_campaigns(db: Session = Depends(get_db)):
    return db.query(Campaign).all()

@router.get("/{id}", response_model=CampaignRead)
def get_campaign(id: int, db: Session = Depends(get_db)):
    campaign = db.query(Campaign).filter(Campaign.id == id).first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return campaign

@router.post("/", response_model=CampaignRead)
def create_campaign(campaign: CampaignCreate, db: Session = Depends(get_db)):
    db_campaign = Campaign(**campaign.dict())
    db.add(db_campaign)
    db.commit()
    db.refresh(db_campaign)
    return db_campaign

@router.put("/{id}", response_model=CampaignRead)
def update_campaign(id: int, campaign: CampaignCreate, db: Session = Depends(get_db)):
    db_campaign = db.query(Campaign).filter(Campaign.id == id).first()
    if not db_campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    for key, value in campaign.dict().items():
        setattr(db_campaign, key, value)
    db.commit()
    db.refresh(db_campaign)
    return db_campaign

@router.delete("/{id}")
def delete_campaign(id: int, db: Session = Depends(get_db)):
    db_campaign = db.query(Campaign).filter(Campaign.id == id).first()
    if not db_campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    db.delete(db_campaign)
    db.commit()
    return {"detail": "Campaign deleted"}
