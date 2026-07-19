import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")


def generate_crop_advice(disease, confidence):

    prompt = f"""
You are an agricultural expert.

Disease: {disease}
Confidence: {confidence}%

Provide:
1. Disease Description
2. Symptoms
3. Causes
4. Treatment
5. Prevention
6. Recommended Fungicide/Pesticide
7. Farmer Tips
"""

    try:
        response = model.generate_content(prompt)
        return response.text

    except Exception:

        fallback = {
            "Tomato Early Blight": """
Disease Description:
Early Blight is a fungal disease that attacks tomato leaves, stems and fruits.

Symptoms:
• Brown circular spots
• Yellow leaves
• Dry leaves

Causes:
• Humid weather
• Poor air circulation
• Infected crop residue

Treatment:
• Remove infected leaves.
• Spray Mancozeb or Chlorothalonil.
• Avoid overhead watering.

Prevention:
• Rotate crops.
• Keep proper spacing.
• Use healthy seeds.

Recommended Fungicide:
Mancozeb 75% WP

Farmer Tips:
Inspect plants regularly and water at the base of the plant.
""",

            "Potato Late Blight": """
Disease Description:
Late Blight is caused by Phytophthora infestans.

Symptoms:
• Dark brown spots
• White fungal growth
• Rotting tubers

Treatment:
Spray Metalaxyl + Mancozeb.

Prevention:
Use disease-free seed potatoes and avoid excess moisture.
"""
        }

        return fallback.get(
            disease,
            f"""
Disease Description:
{disease} detected.

Treatment:
Remove infected leaves and consult your local agricultural officer.

Prevention:
Maintain field hygiene, use certified seeds, and inspect crops regularly.

Farmer Tips:
Monitor crop health weekly and apply recommended fungicides if symptoms spread.
"""
        )