"""This is the main FastAPI application with endpoints, configuration, etc.

Returns:
    FastAPI: Application factory pattern. Returns a FastAPI application.
"""
from logging.config import dictConfig
from datetime import datetime
import logging
import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from samtools.sam_api.entity_information import search_sam_v3

logger = logging.getLogger(__name__)

origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]


def create_app(name=__name__):
    _setup_logging()
    app = FastAPI()
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get('/api/entity-information/v3/entities')
    async def search_v3(
        req: Request,
        samToolsSearch: str,
        includeSections: str,
        registrationStatus: str,
        purposeOfRegistrationCode: str,
        entityEFTIndicator: str,
        page: int = 0,
    ):
        try:
            response = await search_sam_v3(req.query_params)
            return response
        except Exception as exception:
            logging.error(exception)
            return {'success': False,
                    'errors': ["400 Bad Request"]}

    return app


def _setup_logging():
    debug = os.environ.get("FLASK_DEBUG", False)
    if debug == '1':
        debug = True

    dictConfig({
        "version": 1,
        "disable_existing_loggers": True,
        "formatters": {
            "default": {
                "format": "[%(asctime)s] %(levelname)s in %(module)s: %(message)s",
            },
            "access": {
                "format": "%(message)s",
            }
        },
        "handlers": {
            "console": {
                "level": "INFO",
                "class": "logging.StreamHandler",
                "formatter": "default",
                "stream": "ext://sys.stdout",
            },
        },
        "loggers": {
            "gunicorn.error": {
                "handlers": ["console"],
                "level": "ERROR",
                "propagate": False,
            },
            "gunicorn.access": {
                "handlers": ["console"],
                "level": "INFO",
                "propagate": False,
            }
        },
        "root": {
            "level": "DEBUG" if debug else "INFO",
            "handlers": ["console"],
        }
    })
