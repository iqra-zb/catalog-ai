def build_amazon_prompt(product):

    return f"""
You are an Amazon SEO expert.

Generate an optimized Amazon listing.

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

IMPORTANT

Return ONLY valid JSON.

Do NOT use markdown.

Do NOT explain.

Schema

{{
"title":"",
"bullets":[
"",
"",
"",
"",
""
],
"description":"",
"backend_keywords":""
}}

Rules

Title

- Maximum 200 characters

Bullets

- Exactly 5

Description

- Around 300 words

Backend keywords

- Comma separated

Return JSON only.
"""