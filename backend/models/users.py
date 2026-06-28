from datetime import datetime
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base
import uuid

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, index=True)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    teams = relationship("TeamMember", back_populates="user")
    organizations = relationship("OrganizationMember", back_populates="user")

class Organization(Base):
    __tablename__ = "organizations"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, unique=True, index=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    members = relationship("OrganizationMember", back_populates="organization")
    teams = relationship("Team", back_populates="organization")

class OrganizationMember(Base):
    __tablename__ = "organization_members"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    organization_id = Column(String, ForeignKey("organizations.id"), nullable=False)
    role = Column(String, default="member") # admin, member
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="organizations")
    organization = relationship("Organization", back_populates="members")

class Team(Base):
    __tablename__ = "teams"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, index=True, nullable=False)
    organization_id = Column(String, ForeignKey("organizations.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    organization = relationship("Organization", back_populates="teams")
    members = relationship("TeamMember", back_populates="team")
    projects = relationship("Project", back_populates="team")

class TeamMember(Base):
    __tablename__ = "team_members"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    team_id = Column(String, ForeignKey("teams.id"), nullable=False)
    role = Column(String, default="member")
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="teams")
    team = relationship("Team", back_populates="members")
