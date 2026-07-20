from fastapi import APIRouter

from app.models.product import ProductRequest
from app.prompts.amazon_prompt import build_amazon_prompt
from app.services.openrouter_service import generate_listing

router = APIRouter()


@router.post("/generate")
def generate(product: ProductRequest):

    prompt = build_amazon_prompt(product)

    listing = generate_listing(prompt)

    return {
        "success": True,
        "listing": listing,
    }