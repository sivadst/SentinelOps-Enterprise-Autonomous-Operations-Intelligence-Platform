import secrets
from typing import Any, List, Union

from pydantic import AnyHttpUrl
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "supersecretkey" # secrets.token_urlsafe(32) for prod
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    PROJECT_NAME: str = "SentinelOps"
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:8000"]
    
    # Database (override for local dev since docker is failing overlay mount)
    DATABASE_URL: str = "sqlite+aiosqlite:///./sentinelops.db"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # Celery
    CELERY_BROKER_URL: str = "redis://localhost:6379/1"
    CELERY_RESULT_BACKEND: str = "redis://localhost:6379/1"

    model_config = SettingsConfigDict(case_sensitive=True, env_file=".env")

settings = Settings()
