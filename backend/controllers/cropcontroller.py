from fastapi import HTTPException

crops = []

def get_all_crops():
    return crops

def get_crop(id: int):
    for crop in crops:
        if crop["id"] == id:
            return crop
    raise HTTPException(status_code=404, detail="Crop not found")