from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from models.users import Organization, OrganizationMember, Team, TeamMember
from schemas.rbac import OrganizationCreate, TeamCreate

class RBACRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create_organization(self, org_in: OrganizationCreate, user_id: str) -> Organization:
        db_org = Organization(name=org_in.name)
        self.session.add(db_org)
        await self.session.commit()
        await self.session.refresh(db_org)
        
        # Add creator as admin
        member = OrganizationMember(
            user_id=user_id,
            organization_id=db_org.id,
            role="admin"
        )
        self.session.add(member)
        await self.session.commit()
        
        return db_org

    async def get_user_organizations(self, user_id: str) -> List[Organization]:
        stmt = select(Organization).join(OrganizationMember).where(OrganizationMember.user_id == user_id)
        result = await self.session.execute(stmt)
        return result.scalars().all()

    async def check_org_access(self, user_id: str, org_id: str) -> Optional[OrganizationMember]:
        stmt = select(OrganizationMember).where(
            OrganizationMember.user_id == user_id,
            OrganizationMember.organization_id == org_id
        )
        result = await self.session.execute(stmt)
        return result.scalars().first()
        
    async def create_team(self, team_in: TeamCreate, user_id: str) -> Team:
        db_team = Team(name=team_in.name, organization_id=team_in.organization_id)
        self.session.add(db_team)
        await self.session.commit()
        await self.session.refresh(db_team)
        
        # Add creator as admin of team
        member = TeamMember(
            user_id=user_id,
            team_id=db_team.id,
            role="admin"
        )
        self.session.add(member)
        await self.session.commit()
        
        return db_team
        
    async def get_org_teams(self, org_id: str) -> List[Team]:
        stmt = select(Team).where(Team.organization_id == org_id)
        result = await self.session.execute(stmt)
        return result.scalars().all()
