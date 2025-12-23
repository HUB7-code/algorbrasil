from fastapi import APIRouter
from backend.app.api.endpoints.scanner import upload

router = APIRouter()

router.include_router(upload.router, tags=["scanner"])
