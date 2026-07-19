from pydantic import BaseModel

class Crop(BaseModel):
    id: int
    crop_name: str
    disease: str
    confidence: float