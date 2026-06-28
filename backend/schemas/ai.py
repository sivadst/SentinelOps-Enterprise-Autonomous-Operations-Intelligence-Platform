from pydantic import BaseModel
from typing import List, Optional

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    
class ChatResponse(BaseModel):
    response: str
    
class SummaryRequest(BaseModel):
    incident_title: str
    incident_description: str
    logs: List[str]
    
class RootCauseRequest(BaseModel):
    incident_id: str
    metrics_summary: str
    logs_summary: str
    
class LogAnalysisRequest(BaseModel):
    log_lines: List[str]
