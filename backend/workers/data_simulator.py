import asyncio
import random
import uuid
from datetime import datetime
import aioredis
import json

from core.celery_app import celery_app
from core.config import settings
from database.session import async_session
from models.infrastructure import InfrastructureNode, Service
from models.operations import Metric, Log, Alert

# Helper to run async db tasks in celery
def run_async(coro):
    loop = asyncio.get_event_loop()
    return loop.run_until_complete(coro)

async def _publish_to_redis(channel: str, message: dict):
    redis = await aioredis.from_url(settings.REDIS_URL)
    await redis.publish(channel, json.dumps(message))
    await redis.close()

async def _generate_metrics_async():
    async with async_session() as session:
        # In a real app we'd fetch actual nodes
        # Here we just generate fake data and broadcast via Redis for WebSockets
        nodes = ["node-api-1", "node-db-1", "node-worker-1"]
        metrics = []
        
        for node in nodes:
            cpu = random.uniform(10.0, 95.0)
            mem = random.uniform(20.0, 90.0)
            
            metrics.append({
                "node_id": node,
                "name": "cpu_usage",
                "value": cpu,
                "unit": "%",
                "timestamp": datetime.utcnow().isoformat()
            })
            metrics.append({
                "node_id": node,
                "name": "memory_usage",
                "value": mem,
                "unit": "%",
                "timestamp": datetime.utcnow().isoformat()
            })
        
        # Broadcast
        await _publish_to_redis("live_metrics", {"type": "metrics", "data": metrics})
        # Note: In a full app, we'd also save to DB, skipping here to save DB spam in mock mode

async def _generate_logs_async():
    services = ["api-gateway", "auth-service", "payment-service", "inventory-db"]
    levels = ["INFO", "INFO", "INFO", "WARN", "ERROR"]
    messages = [
        "User authenticated successfully",
        "Connection timeout to database",
        "Payment processed",
        "Cache miss for key user:123",
        "High CPU utilization detected",
        "Starting worker process"
    ]
    
    log_entry = {
        "id": str(uuid.uuid4()),
        "service": random.choice(services),
        "level": random.choice(levels),
        "message": random.choice(messages),
        "timestamp": datetime.utcnow().isoformat()
    }
    
    await _publish_to_redis("live_logs", {"type": "log", "data": log_entry})


async def _generate_random_alert_async():
    if random.random() > 0.3: # 70% chance to generate an alert
        alert = {
            "id": str(uuid.uuid4()),
            "title": f"High Latency in {random.choice(['API', 'Database', 'Cache'])}",
            "severity": random.choice(["medium", "high", "critical"]),
            "status": "active",
            "timestamp": datetime.utcnow().isoformat()
        }
        await _publish_to_redis("live_alerts", {"type": "alert", "data": alert})


@celery_app.task
def generate_metrics():
    run_async(_generate_metrics_async())
    return "Metrics generated"

@celery_app.task
def generate_logs():
    run_async(_generate_logs_async())
    return "Logs generated"
    
@celery_app.task
def generate_random_alert():
    run_async(_generate_random_alert_async())
    return "Alert check completed"
