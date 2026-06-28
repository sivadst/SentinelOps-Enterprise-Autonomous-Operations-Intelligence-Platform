import os
from .base import AIProvider
from .mock import MockAIProvider

# In a real scenario we would import OpenAIProvider, etc.

def get_ai_provider() -> AIProvider:
    provider_name = os.getenv("AI_PROVIDER", "mock").lower()
    
    # We can expand this with real providers using API keys
    # if provider_name == "openai":
    #     return OpenAIProvider(api_key=os.getenv("OPENAI_API_KEY"))
    
    return MockAIProvider()
