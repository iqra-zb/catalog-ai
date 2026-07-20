from pydantic import BaseModel
from typing import List, Optional


class ProductRequest(BaseModel):
    name: str
    category: str
    features: str
    customer: str
    keywords: Optional[str] = None
    brandVoice: str
    platforms: List[str]