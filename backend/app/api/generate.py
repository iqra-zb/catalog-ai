from fastapi import APIRouter, HTTPException

from app.models.product import ProductRequest
from app.prompts.platform_factory import PROMPTS
from app.services.openrouter_service import generate_listing

router = APIRouter()


@router.post("/generate")
def generate(product: ProductRequest):
    if not product.platforms:
        raise HTTPException(
            status_code=400,
            detail="Please select at least one platform."
        )

    unsupported_platforms = [
        platform for platform in product.platforms
        if platform not in PROMPTS
    ]

    if unsupported_platforms:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported platform(s): {', '.join(unsupported_platforms)}"
        )

    results = {}

    for platform in product.platforms:
        prompt = PROMPTS[platform](product)
        listing = generate_listing(prompt)
        results[platform] = listing

    return {
        "success": True,
        "results": results
    }