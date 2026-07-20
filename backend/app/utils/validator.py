from app.rules.amazon_rules import AMAZON_RULES


def validate_amazon_listing(listing):

    errors = []

    if len(listing["title"]) > AMAZON_RULES["title_max"]:
        errors.append("Title exceeds Amazon limit.")

    if len(listing["bullets"]) != AMAZON_RULES["bullet_count"]:
        errors.append("Amazon requires exactly five bullets.")

    for bullet in listing["bullets"]:
        if len(bullet) > AMAZON_RULES["bullet_max"]:
            errors.append("Bullet exceeds 200 characters.")

    backend_bytes = len(
        listing["backend_keywords"].encode("utf-8")
    )

    if backend_bytes > AMAZON_RULES["backend_keywords_max_bytes"]:
        errors.append("Backend keywords exceed 250 bytes.")

    return {
        "valid": len(errors) == 0,
        "errors": errors,
    }