from typing import List
from fastapi import APIRouter, Depends, HTTPException,Request
from sqlalchemy.orm import Session
from ..models.categories import Categories as Category

from ..database import get_db
from ..models.campaign import Campaign
from ..models.campaign_categories import CampaignCategories
from ..models.campaign_products import CampaignProducts
from ..models.product import Product
from ..schemas.campaign import CampaignCreate, CampaignRead, CampaignUpdate

router = APIRouter(prefix="/campaigns", tags=["campaigns"])

@router.get("/", response_model=List[CampaignRead])
def campaigns_read(db: Session = Depends(get_db)):
    campaigns = db.query(Campaign).all()
    result = []

    for c in campaigns:
        product_rows = (
            db.query(Product)
            .join(CampaignProducts)
            .filter(CampaignProducts.campaign_id == c.id)
            .all()
        )

        category_rows = (
            db.query(Category)
            .join(CampaignCategories)
            .filter(CampaignCategories.campaign_id == c.id)
            .all()
        )

        result.append({
            "id": c.id,
            "name": c.name,
            "price": c.price,
            "type": c.type,
            "start_date": c.start_date,
            "end_date": c.end_date,
            "products": product_rows,
            "categories": category_rows,
        })

    return result
@router.get("/{id}", response_model=CampaignRead)
def get_campaign(id: int, db: Session = Depends(get_db)):
    campaign = db.query(Campaign).filter(Campaign.id == id).first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return campaign

@router.post("/")
def create_campaign(campaign: CampaignCreate, db: Session = Depends(get_db)):
    db_campaign = Campaign(**campaign.dict())
    db.add(db_campaign)
    db.commit()
    db.refresh(db_campaign)
    return db_campaign

@router.put("/{id}")
def update_campaign(id: int, campaign: CampaignUpdate, db: Session = Depends(get_db)):
    db_campaign = db.query(Campaign).filter(Campaign.id == id).first()
    if not db_campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")

    for key, value in campaign.dict(exclude_unset=True).items():
        setattr(db_campaign, key, value)

    # ürünleri ve kategorileri güncelle
    if campaign.products is not None:
        db.query(CampaignProducts).filter(CampaignProducts.campaign_id == id).delete()
        for pid in campaign.products:
            db.add(CampaignProducts(campaign_id=id, product_id=pid))

    if campaign.categories is not None:
        db.query(CampaignCategories).filter(CampaignCategories.campaign_id == id).delete()
        for cname in campaign.categories:
            db.add(CampaignCategories(campaign_id=id, category_id=cname))

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
