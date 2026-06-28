from datetime import datetime
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Float, JSON, Text
from sqlalchemy.orm import relationship
from .base import Base
import uuid

class Alert(Base):
    __tablename__ = "alerts"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    description = Column(String)
    severity = Column(String, nullable=False) # low, medium, high, critical
    status = Column(String, default="active") # active, resolved, acknowledged
    service_id = Column(String, ForeignKey("services.id"), nullable=True)
    node_id = Column(String, ForeignKey("infrastructure_nodes.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    resolved_at = Column(DateTime, nullable=True)

class Incident(Base):
    __tablename__ = "incidents"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    description = Column(String)
    severity = Column(String, nullable=False)
    status = Column(String, default="investigating") # investigating, identified, monitoring, resolved
    service_id = Column(String, ForeignKey("services.id"), nullable=True)
    assignee_id = Column(String, ForeignKey("users.id"), nullable=True)
    ai_summary = Column(Text, nullable=True)
    ai_root_cause = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    resolved_at = Column(DateTime, nullable=True)
    
    assignee = relationship("User")
    service = relationship("Service")

class Log(Base):
    __tablename__ = "logs"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    service_id = Column(String, ForeignKey("services.id"), nullable=True)
    node_id = Column(String, ForeignKey("infrastructure_nodes.id"), nullable=True)
    level = Column(String, nullable=False) # info, warn, error, debug
    message = Column(Text, nullable=False)
    metadata_ = Column("metadata", JSON, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)

class Metric(Base):
    __tablename__ = "metrics"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    service_id = Column(String, ForeignKey("services.id"), nullable=True)
    node_id = Column(String, ForeignKey("infrastructure_nodes.id"), nullable=True)
    name = Column(String, nullable=False, index=True) # cpu_usage, memory_usage, request_rate, etc.
    value = Column(Float, nullable=False)
    unit = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)

class Deployment(Base):
    __tablename__ = "deployments"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    service_id = Column(String, ForeignKey("services.id"), nullable=False)
    version = Column(String, nullable=False)
    status = Column(String, default="pending") # pending, in_progress, success, failed
    deployed_by = Column(String, ForeignKey("users.id"), nullable=True)
    ai_risk_score = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)
    
    service = relationship("Service", back_populates="deployments")
    deployer = relationship("User")
