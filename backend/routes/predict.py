from fastapi import APIRouter, UploadFile, File, Depends
from database.database import prediction_collection
from middleware.auth_middleware import verify_token
import random

router = APIRouter()


@router.post("/predict")
async def predict(
    file: UploadFile = File(...),
    
):

    diseases = [
        "Tomato Early Blight",
        "Tomato Late Blight",
        "Potato Healthy",
        "Potato Early Blight",
        "Leaf Mold"
    ]

    disease = random.choice(diseases)

    confidence = round(random.uniform(85, 99), 2)

    prediction = {
        
        "filename": file.filename,
        "disease": disease,
        "confidence": confidence
    }

    result = prediction_collection.insert_one(prediction)

    prediction["_id"] = str(result.inserted_id)

    return prediction