from datetime import datetime
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Float, JSON
from sqlalchemy.orm import relationship
from .base import Base
import uuid

class Project(Base):
    __tablename__ = "projects"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, index=True, nullable=False)
    team_id = Column(String, ForeignKey("teams.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    team = relationship("Team", back_populates="projects")
    services = relationship("Service", back_populates="project")

class Service(Base):
    __tablename__ = "services"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, index=True, nullable=False)
    description = Column(String)
    project_id = Column(String, ForeignKey("projects.id"), nullable=False)
    repository_url = Column(String)
    status = Column(String, default="healthy") # healthy, degraded, critical
    created_at = Column(DateTime, default=datetime.utcnow)
    
    project = relationship("Project", back_populates="services")
    nodes = relationship("InfrastructureNode", back_populates="service")
    deployments = relationship("Deployment", back_populates="service")

class InfrastructureNode(Base):
    __tablename__ = "infrastructure_nodes"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, index=True, nullable=False)
    type = Column(String, nullable=False) # server, container, database, cache
    service_id = Column(String, ForeignKey("services.id"), nullable=True)
    status = Column(String, default="online")
    ip_address = Column(String)
    metadata_ = Column("metadata", JSON) # using metadata_ to avoid conflict with Base.metadata
    created_at = Column(DateTime, default=datetime.utcnow)
    
    service = relationship("Service", back_populates="nodes")
