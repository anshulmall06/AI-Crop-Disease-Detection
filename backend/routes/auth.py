from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os
from fastapi import APIRouter, HTTPException, Request, Depends
from slowapi import Limiter
from slowapi.util import get_remote_address

from models.user import User
from database.database import users_collection

load_dotenv()

SECRET_KEY = os.getenv("JWT_SECRET")
ALGORITHM = "HS256"

if not SECRET_KEY:
    raise Exception("JWT_SECRET not found in .env file")

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

limiter = Limiter(key_func=get_remote_address)
# ---------------- REGISTER ---------------- #
@router.post("/register")
@limiter.limit("5/minute")
async def register(request: Request, user: User):
    print("REGISTER CALLED")

    try:
        existing = users_collection.find_one({"email": user.email})
        print("Existing:", existing)

        if existing:
            raise HTTPException(
                status_code=400,
                detail="Email already exists"
            )

        hashed_password = pwd_context.hash(user.password)

        users_collection.insert_one({
            "email": user.email,
            "password": hashed_password
        })

        return {"message": "User registered successfully"}

    except Exception as e:
        print("REGISTER ERROR:", e)
        raise
# ---------------- LOGIN ---------------- #

@router.post("/login")
@limiter.limit("5/minute")
async def login(request: Request, user: User):

    db_user = users_collection.find_one(
        {"email": user.email}
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if "password" not in db_user:
        raise HTTPException(
            status_code=500,
            detail="Password field missing in database"
        )

    if not pwd_context.verify(
        user.password,
        db_user["password"]
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    payload = {
        "sub": db_user["email"],
        "exp": datetime.utcnow() + timedelta(minutes=30)
    }

    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }

security = HTTPBearer()


@router.get("/profile")
async def profile(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        return {
            "user": {
                "sub": payload["sub"]
            }
        }

    except Exception:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )