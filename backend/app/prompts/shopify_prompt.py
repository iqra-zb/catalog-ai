def build_shopify_prompt(product):

    return f"""
You are a Shopify SEO expert.

Generate a Shopify product page.

Product

{product.name}

Features

{product.features}

Return JSON only.

Schema

{{
"title":"",
"meta_description":"",
"description":""
}}
"""