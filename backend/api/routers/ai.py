from typing import Any
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from api import deps
from schemas.ai import ChatRequest, ChatResponse, SummaryRequest, RootCauseRequest, LogAnalysisRequest
from ai.services import AICopilotService
from models.users import User

router = APIRouter()
ai_service = AICopilotService()

@router.post("/chat", response_model=ChatResponse)
async def chat_with_copilot(
    request: ChatRequest,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    messages_dict = [{"role": m.role, "content": m.content} for m in request.messages]
    response = await ai_service.chat(messages_dict)
    return {"response": response}

@router.post("/summarize-incident")
async def summarize_incident(
    request: SummaryRequest,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    summary = await ai_service.summarize_incident(
        request.incident_title, request.incident_description, request.logs
    )
    return {"summary": summary}

@router.post("/root-cause")
async def root_cause_analysis(
    request: RootCauseRequest,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    rca = await ai_service.analyze_root_cause(
        request.incident_id, request.metrics_summary, request.logs_summary
    )
    return {"root_cause": rca}

@router.post("/interpret-logs")
async def interpret_logs(
    request: LogAnalysisRequest,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    analysis = await ai_service.interpret_logs(request.log_lines)
    return {"analysis": analysis}
