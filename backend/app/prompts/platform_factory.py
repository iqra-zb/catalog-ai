from app.prompts.amazon_prompt import build_amazon_prompt
from app.prompts.shopify_prompt import build_shopify_prompt
from app.prompts.etsy_prompt import build_etsy_prompt

PROMPTS = {
    "amazon": build_amazon_prompt,
    "shopify": build_shopify_prompt,
    "etsy": build_etsy_prompt,
}