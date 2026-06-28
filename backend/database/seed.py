import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from database.session import async_session
from models.users import User, Organization
from models.infrastructure import Project, Service, InfrastructureNode
from models.operations import Incident
from core.security import get_password_hash
import uuid

async def seed_data():
    async with async_session() as session:
        # Create a default user
        admin_email = "admin@sentinelops.com"
        # Check if exists
        from sqlalchemy.future import select
        result = await session.execute(select(User).where(User.email == admin_email))
        if result.scalars().first():
            print("Database already seeded")
            return
            
        print("Seeding database...")
        
        user = User(
            id=str(uuid.uuid4()),
            email=admin_email,
            hashed_password=get_password_hash("admin123"),
            full_name="Admin User",
            is_active=True,
            is_superuser=True
        )
        session.add(user)
        
        org = Organization(id=str(uuid.uuid4()), name="Acme Corp")
        session.add(org)
        
        await session.commit()
        
        # Add basic infra
        service = Service(
            id=str(uuid.uuid4()),
            name="Payment API",
            description="Handles all payment processing",
            project_id=str(uuid.uuid4()) # Mock project id for speed
        )
        session.add(service)
        await session.commit()
        
        print("Seeding complete.")

if __name__ == "__main__":
    asyncio.run(seed_data())
