from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

print("MONGO URI:", MONGO_URI)

client = MongoClient(MONGO_URI)

try:
    client.admin.command("ping")
    print("✅ MongoDB Connected Successfully")
except Exception as e:
    print("❌ MongoDB Connection Error:", e)
    raise

db = client["crop_disease_db"]

users_collection = db["users"]
prediction_collection = db["predictions"]