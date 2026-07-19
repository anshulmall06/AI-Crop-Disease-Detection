from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Gemini API
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise Exception("GEMINI_API_KEY not found in .env")

genai.configure(api_key=api_key)

model = genai.GenerativeModel("gemini-flash-latest")

router = APIRouter()


class DiseaseRequest(BaseModel):
    disease: str


@router.post("/ai/explain")
async def explain_disease(request: DiseaseRequest):
    try:

        prompt = f"""
You are an agricultural expert.

A crop disease has been detected:

Disease: {request.disease}

Provide the following in simple English:

1. Disease Description
2. Causes
3. Treatment
4. Prevention
5. Farmer Tips

Keep the answer concise and easy to understand.
"""

        response = model.generate_content(prompt)

        return {
            "answer": response.text
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )