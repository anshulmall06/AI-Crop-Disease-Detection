from pydantic import BaseModel
from typing import Optional

class DiseaseRecord(BaseModel):
    crop: str
    disease: str
    confidence: float
    treatment: Optional[str] = None
    image_url: Optional[str] = None

class DiseaseUpdate(BaseModel):
    crop: str
    disease: str
    confidence: float
    treatment: Optional[str] = None