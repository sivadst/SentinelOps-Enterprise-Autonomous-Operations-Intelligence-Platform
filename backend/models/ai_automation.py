from datetime import datetime
from sqlalchemy import Column, String, DateTime, ForeignKey, JSON, Text, Boolean
from sqlalchemy.orm import relationship
from .base import Base
import uuid

class AIConversation(Base):
    __tablename__ = "ai_conversations"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User")
    messages = relationship("AIMessage", back_populates="conversation")

class AIMessage(Base):
    __tablename__ = "ai_messages"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    conversation_id = Column(String, ForeignKey("ai_conversations.id"), nullable=False)
    role = Column(String, nullable=False) # user, assistant, system
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    conversation = relationship("AIConversation", back_populates="messages")

class AutomationWorkflow(Base):
    __tablename__ = "automation_workflows"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    trigger_type = Column(String, nullable=False) # schedule, webhook, alert
    trigger_config = Column(JSON, nullable=True)
    actions = Column(JSON, nullable=False)
    is_active = Column(Boolean, default=True)
    created_by = Column(String, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    creator = relationship("User")

class AuditEvent(Base):
    __tablename__ = "audit_events"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=True)
    action = Column(String, nullable=False)
    resource_type = Column(String, nullable=False)
    resource_id = Column(String, nullable=True)
    details = Column(JSON, nullable=True)
    ip_address = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
