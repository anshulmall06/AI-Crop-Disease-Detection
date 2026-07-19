from fastapi import APIRouter, HTTPException, Body, Depends
from bson import ObjectId
from bson.errors import InvalidId

from database.database import prediction_collection
from middleware.auth_middleware import verify_token

router = APIRouter()


# ---------------- GET ALL PREDICTIONS ---------------- #

@router.get("/predictions")
async def get_predictions(user=Depends(verify_token)):

    predictions = []

    for prediction in prediction_collection.find():

        prediction["_id"] = str(prediction["_id"])

        predictions.append(prediction)

    return predictions


# ---------------- GET SINGLE PREDICTION ---------------- #

@router.get("/predictions/{id}")
async def get_prediction(
    id: str,
    user=Depends(verify_token)
):

    try:
        object_id = ObjectId(id)

    except InvalidId:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID"
        )

    prediction = prediction_collection.find_one(
        {"_id": object_id}
    )

    if prediction is None:
        raise HTTPException(
            status_code=404,
            detail="Prediction not found"
        )

    prediction["_id"] = str(prediction["_id"])

    return prediction


# ---------------- UPDATE ---------------- #

@router.put("/predictions/{id}")
async def update_prediction(
    id: str,
    data: dict = Body(...),
    user=Depends(verify_token)
):

    try:
        object_id = ObjectId(id)

    except InvalidId:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID"
        )

    data.pop("_id", None)

    result = prediction_collection.update_one(
        {"_id": object_id},
        {"$set": data}
    )

    if result.matched_count == 0:

        raise HTTPException(
            status_code=404,
            detail="Prediction not found"
        )

    return {
        "message": "Prediction updated successfully"
    }


# ---------------- DELETE ---------------- #

@router.delete("/predictions/{id}")
async def delete_prediction(
    id: str,
    user=Depends(verify_token)
):

    try:
        object_id = ObjectId(id)

    except InvalidId:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID"
        )

    result = prediction_collection.delete_one(
        {"_id": object_id}
    )

    if result.deleted_count == 0:

        raise HTTPException(
            status_code=404,
            detail="Prediction not found"
        )

    return {
        "message": "Prediction deleted successfully"
    }