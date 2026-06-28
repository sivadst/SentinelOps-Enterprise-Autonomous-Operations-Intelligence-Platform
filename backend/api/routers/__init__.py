from fastapi import APIRouter

from .auth import router as auth_router
from .rbac import router as rbac_router
from .ai import router as ai_router
from .ws import router as ws_router

api_router = APIRouter()
api_router.include_router(auth_router, prefix="/auth", tags=["auth"])
api_router.include_router(rbac_router, prefix="/rbac", tags=["rbac"])
api_router.include_router(ai_router, prefix="/ai", tags=["ai-copilot"])
api_router.include_router(ws_router, prefix="/ws", tags=["websockets"])
