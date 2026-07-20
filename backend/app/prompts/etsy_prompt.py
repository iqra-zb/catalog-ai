def build_etsy_prompt(product):

    return f"""
You are an Etsy SEO expert.

Generate an Etsy listing.

Product

{product.name}

Features

{product.features}

Return JSON only.

Schema

{{
"title":"",
"description":"",
"tags":[]
}}
"""