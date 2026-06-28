import pytest
from httpx import AsyncClient
from main import app
from schemas.users import UserCreate
from repositories.users import UserRepository
from database.session import async_session
from core.security import get_password_hash
from models.users import User

@pytest.mark.asyncio
async def test_login_success():
    # This relies on the seed data having admin@sentinelops.com
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post(
            "/api/v1/auth/login",
            data={"username": "admin@sentinelops.com", "password": "admin123"},
            headers={"Content-Type": "application/x-www-form-urlencoded"}
        )
    assert response.status_code == 200
    assert "access_token" in response.json()

@pytest.mark.asyncio
async def test_login_failure():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post(
            "/api/v1/auth/login",
            data={"username": "admin@sentinelops.com", "password": "wrongpassword"},
            headers={"Content-Type": "application/x-www-form-urlencoded"}
        )
    assert response.status_code == 400
