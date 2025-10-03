from fastapi import APIRouter
from .endpoints import (
    users, address, payment, product, kategories, product_kategories,
    product_stars, product_comments, orders, order_details, communication,
    campaign, campaign_kategories, campaign_products, auth
)

router = APIRouter()

router.include_router(auth.router)
router.include_router(users.router)
router.include_router(address.router)
router.include_router(payment.router)
router.include_router(product.router)
router.include_router(kategories.router)
router.include_router(product_kategories.router)
router.include_router(product_stars.router)
router.include_router(product_comments.router)
router.include_router(orders.router)
router.include_router(order_details.router)
router.include_router(communication.router)
router.include_router(campaign.router)
router.include_router(campaign_kategories.router)
router.include_router(campaign_products.router)
