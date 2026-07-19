from fastapi import APIRouter, HTTPException
from backend.database.database import diseases
from models.prediction import DiseaseRecord, DiseaseUpdate
from backend.models.prediction import Prediction

router = APIRouter(
    prefix="/diseases",
    tags=["Crop Diseases"]
)


@router.get("/")
def get_all_diseases():
    return diseases


@router.get("/{record_id}")
def get_disease(record_id: int):

    for disease in diseases:
        if disease["id"] == record_id:
            return disease

    raise HTTPException(
        status_code=404,
        detail="Disease not found"
    )


@router.post("/", status_code=201)
def create_disease(record: DiseaseRecord):

    new_record = {
        "id": len(diseases) + 1,
        "crop": record.crop,
        "disease": record.disease,
        "confidence": record.confidence
    }

    diseases.append(new_record)

    return new_record


@router.put("/{record_id}")
def update_disease(record_id: int,
                   updated_record: DiseaseUpdate):

    for disease in diseases:

        if disease["id"] == record_id:
            disease["crop"] = updated_record.crop
            disease["disease"] = updated_record.disease
            disease["confidence"] = updated_record.confidence

            return disease

    raise HTTPException(
        status_code=404,
        detail="Disease not found"
    )


@router.delete("/{record_id}")
def delete_disease(record_id: int):

    for disease in diseases:
        if disease["id"] == record_id:
            diseases.remove(disease)

            return {
                "message": "Deleted successfully"
            }

    raise HTTPException(
        status_code=404,
        detail="Disease not found"
    )


@router.get("/search/")
def search_crop(crop: str):

    result = [
        disease for disease in diseases
        if disease["crop"].lower() == crop.lower()
    ]

    return {
        "count": len(result),
        "results": result
    }