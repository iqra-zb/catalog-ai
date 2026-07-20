import os
from dotenv import load_dotenv
from google import genai
import traceback


load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=api_key)

for model in client.models.list():
    print(model.name)


def generate_listing(prompt: str):
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt,
        )
        return response.text
    except Exception as e:
        print(type(e))
        print(e)
        traceback.print_exc()
        raise