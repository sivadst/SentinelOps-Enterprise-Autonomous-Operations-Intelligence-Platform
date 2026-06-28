from typing import List, Dict, Any, Optional
import asyncio
from .base import AIProvider

class MockAIProvider(AIProvider):
    async def generate_completion(
        self, 
        prompt: str, 
        system_prompt: Optional[str] = None, 
        max_tokens: int = 1024,
        temperature: float = 0.7
    ) -> str:
        await asyncio.sleep(1) # Simulate network delay
        if "summarize" in prompt.lower():
            return "This incident involved a database connection timeout likely caused by a spike in concurrent connections exceeding the connection pool limit."
        elif "root cause" in prompt.lower():
            return "Root Cause Analysis: The primary application database experienced CPU starvation, leading to increased query latency and connection pool exhaustion."
        elif "log" in prompt.lower():
            return "Log Analysis: Detected repetitive OutOfMemory errors in the cache service. Recommendation: Scale up the Redis instance memory."
        return "This is a mock AI response. Please configure a real AI provider with an API key to get actual responses."
        
    async def chat(
        self, 
        messages: List[Dict[str, str]], 
        max_tokens: int = 1024,
        temperature: float = 0.7
    ) -> str:
        await asyncio.sleep(1)
        last_message = messages[-1]["content"] if messages else ""
        return f"Mock Copilot: I received your message about '{last_message}'. As an AI assistant, I recommend checking the service metrics."
