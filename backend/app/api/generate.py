from fastapi import APIRouter

from app.models.product import ProductRequest
from app.prompts.platform_factory import PROMPTS
from app.services.openrouter_service import generate_listing

router = APIRouter()


@router.post("/generate")
def generate(product: ProductRequest):

    platform = product.platforms[0]

    prompt = PROMPTS[platform](product)

    listing = generate_listing(prompt)

    return {
        "success": True,
        "platform": platform,
        "listing": listing,
    }