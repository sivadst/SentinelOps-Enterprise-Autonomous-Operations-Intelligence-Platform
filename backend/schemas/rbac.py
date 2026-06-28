from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from schemas.users import UserResponse

class OrganizationBase(BaseModel):
    name: str

class OrganizationCreate(OrganizationBase):
    pass

class OrganizationResponse(OrganizationBase):
    id: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class TeamBase(BaseModel):
    name: str
    organization_id: str

class TeamCreate(TeamBase):
    pass

class TeamResponse(TeamBase):
    id: str
    created_at: datetime
    
    class Config:
        from_attributes = True
        
class MemberResponse(BaseModel):
    user: UserResponse
    role: str
    
    class Config:
        from_attributes = True
