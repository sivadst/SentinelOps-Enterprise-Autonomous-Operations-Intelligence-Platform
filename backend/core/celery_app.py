import os
from celery import Celery
from core.config import settings

celery_app = Celery(
    "sentinelops",
    broker=settings.CELERY_BROKER_URL,
    backend=settings.CELERY_RESULT_BACKEND,
    include=["workers.data_simulator"]
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
)

# Schedule for simulating live infrastructure data
celery_app.conf.beat_schedule = {
    "simulate-metrics-every-5-seconds": {
        "task": "workers.data_simulator.generate_metrics",
        "schedule": 5.0,
    },
    "simulate-logs-every-10-seconds": {
        "task": "workers.data_simulator.generate_logs",
        "schedule": 10.0,
    },
    "simulate-alerts-every-60-seconds": {
        "task": "workers.data_simulator.generate_random_alert",
        "schedule": 60.0,
    }
}
