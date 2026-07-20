from fastapi import APIRouter

from app.models.product import ProductRequest
from app.services.openrouter_service import generate_listing

router = APIRouter()


@router.post("/generate")

def generate(product: ProductRequest):

    prompt = f"""
You are an Amazon SEO expert.

Generate a professional Amazon listing.

Product Name:
{product.name}

Category:
{product.category}

Features:
{product.features}

Target Customer:
{product.customer}

Keywords:
{product.keywords}

Brand Voice:
{product.brandVoice}

Return exactly:

Title

Bullet Points

Description
"""

    listing = generate_listing(prompt)

    return {
        "success": True,
        "listing": listing
    }