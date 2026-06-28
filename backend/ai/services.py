from typing import Dict, Any, List
from .factory import get_ai_provider

class AICopilotService:
    def __init__(self):
        self.provider = get_ai_provider()
        
    async def summarize_incident(self, incident_title: str, incident_description: str, logs: List[str]) -> str:
        prompt = f"Summarize the following incident:\nTitle: {incident_title}\nDescription: {incident_description}\nRecent Logs:\n{chr(10).join(logs)}"
        system_prompt = "You are an expert Site Reliability Engineer analyzing a system incident."
        return await self.provider.generate_completion(prompt, system_prompt)
        
    async def analyze_root_cause(self, incident_id: str, metrics_summary: str, logs_summary: str) -> str:
        prompt = f"Perform a root cause analysis based on these metrics: {metrics_summary}\nAnd these logs: {logs_summary}"
        system_prompt = "You are a specialized Root Cause Analyzer AI."
        return await self.provider.generate_completion(prompt, system_prompt)
        
    async def interpret_logs(self, log_lines: List[str]) -> str:
        prompt = f"Interpret these application logs and find the core issue:\n{chr(10).join(log_lines)}"
        system_prompt = "You are an AI Log Interpreter."
        return await self.provider.generate_completion(prompt, system_prompt)
        
    async def chat(self, messages: List[Dict[str, str]]) -> str:
        return await self.provider.chat(messages)
