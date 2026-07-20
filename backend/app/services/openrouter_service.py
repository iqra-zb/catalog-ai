import os
import requests
from dotenv import load_dotenv
import json

load_dotenv()

API_KEY = os.getenv("OPENROUTER_API_KEY")
MODEL = os.getenv("OPENROUTER_MODEL")

URL = "https://openrouter.ai/api/v1/chat/completions"


def generate_listing(prompt: str):

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    }

    body = {
        "model": MODEL,
        "messages": [
            {
                "role": "user",
                "content": prompt,
            }
        ],
    }

    response = requests.post(
        URL,
        headers=headers,
        json=body,
        timeout=60,
    )

    response.raise_for_status()

    data = response.json()

    content = data["choices"][0]["message"]["content"]
    content = content.replace("```json", "")
    content = content.replace("```", "")
    content = content.strip()

    return json.loads(content)

 