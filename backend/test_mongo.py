from pymongo import MongoClient

uri = "mongodb+srv://admin:Test12345@cluster1.57mbcnd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"

try:
    client = MongoClient(uri)
    client.admin.command("ping")
    print("✅ Connected Successfully")
except Exception as e:
    print("❌ Error:", e)