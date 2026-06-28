from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional

class AIProvider(ABC):
    @abstractmethod
    async def generate_completion(
        self, 
        prompt: str, 
        system_prompt: Optional[str] = None, 
        max_tokens: int = 1024,
        temperature: float = 0.7
    ) -> str:
        """Generate a completion string from the model."""
        pass
        
    @abstractmethod
    async def chat(
        self, 
        messages: List[Dict[str, str]], 
        max_tokens: int = 1024,
        temperature: float = 0.7
    ) -> str:
        """Process a conversation history."""
        pass
