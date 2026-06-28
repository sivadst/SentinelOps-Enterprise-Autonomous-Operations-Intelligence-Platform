from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from api import deps
from repositories.rbac import RBACRepository
from schemas.rbac import OrganizationCreate, OrganizationResponse, TeamCreate, TeamResponse
from models.users import User

router = APIRouter()

@router.post("/organizations", response_model=OrganizationResponse)
async def create_organization(
    org_in: OrganizationCreate,
    current_user: User = Depends(deps.get_current_active_user),
    db: AsyncSession = Depends(deps.get_db)
) -> Any:
    repo = RBACRepository(db)
    org = await repo.create_organization(org_in, current_user.id)
    return org

@router.get("/organizations", response_model=List[OrganizationResponse])
async def read_organizations(
    current_user: User = Depends(deps.get_current_active_user),
    db: AsyncSession = Depends(deps.get_db)
) -> Any:
    repo = RBACRepository(db)
    orgs = await repo.get_user_organizations(current_user.id)
    return orgs

@router.post("/teams", response_model=TeamResponse)
async def create_team(
    team_in: TeamCreate,
    current_user: User = Depends(deps.get_current_active_user),
    db: AsyncSession = Depends(deps.get_db)
) -> Any:
    repo = RBACRepository(db)
    # Check if user has access to org
    access = await repo.check_org_access(current_user.id, team_in.organization_id)
    if not access or access.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions in this organization")
    
    team = await repo.create_team(team_in, current_user.id)
    return team

@router.get("/organizations/{org_id}/teams", response_model=List[TeamResponse])
async def read_teams(
    org_id: str,
    current_user: User = Depends(deps.get_current_active_user),
    db: AsyncSession = Depends(deps.get_db)
) -> Any:
    repo = RBACRepository(db)
    access = await repo.check_org_access(current_user.id, org_id)
    if not access:
        raise HTTPException(status_code=403, detail="Not enough permissions in this organization")
    
    teams = await repo.get_org_teams(org_id)
    return teams
