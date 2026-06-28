from typing import Dict, List
from fastapi import WebSocket
import asyncio
import aioredis
import json
import logging
from core.config import settings

logger = logging.getLogger(__name__)

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.redis_client = None
        self.pubsub = None
        self.task = None

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        
        # Start redis listener if not running
        if not self.task:
            await self.start_redis_listener()

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except Exception as e:
                logger.error(f"Error broadcasting message: {e}")
                self.disconnect(connection)

    async def start_redis_listener(self):
        try:
            self.redis_client = await aioredis.from_url(settings.REDIS_URL)
            self.pubsub = self.redis_client.pubsub()
            await self.pubsub.subscribe("live_metrics", "live_logs", "live_alerts")
            
            self.task = asyncio.create_task(self._listen_loop())
        except Exception as e:
            logger.error(f"Failed to connect to Redis for WebSockets: {e}")

    async def _listen_loop(self):
        try:
            while True:
                message = await self.pubsub.get_message(ignore_subscribe_messages=True)
                if message:
                    data = message["data"].decode("utf-8")
                    await self.broadcast(data)
                await asyncio.sleep(0.01)
        except Exception as e:
            logger.error(f"Redis listen loop error: {e}")
        finally:
            if self.pubsub:
                await self.pubsub.unsubscribe()
                await self.pubsub.close()
            if self.redis_client:
                await self.redis_client.close()
            self.task = None

manager = ConnectionManager()
