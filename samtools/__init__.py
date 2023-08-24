"""This is the main FastAPI application with endpoints, configuration, etc.

Returns:
    FastAPI: Application factory pattern. Returns a FastAPI application.
"""
from logging.config import dictConfig

import logging
import os
from fastapi import FastAPI, Response, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from samtools.sam_api.entity_information import search_sam_v3

LOGLEVEL = os.environ.get('LOGLEVEL', 'INFO').upper()
logger = logging.getLogger(__name__)

origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://889.smartpay.gsa.gov"
]


def create_app(name=__name__):

    _setup_logging()

    app = FastAPI()
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_origin_regex=r'https://federalist.*\.sites\.pages\.cloud\.gov',
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get('/api/entity-information/v3/entities')
    async def search_v3(
        res: Response,
        samToolsSearch: str = Query(default=None, max_length=100),
        page: int = 0,
    ):
        try:
            params = {}
            params['registrationStatus'] = 'A'
            params['includeSections'] = 'samToolsData,entityRegistration,coreData'  # noqa e501
            params['purposeOfRegistrationCode'] = 'Z2~Z5'
            params['entityEFTIndicator'] = ''
            params['samToolsSearch'] = samToolsSearch
            params['page'] = page

            response = await search_sam_v3(params)
            res.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains; preload"  # noqa E501
            return response
        except Exception as exception:
            logging.exception(exception)
            raise HTTPException(status_code=400, detail="Problem connecting to SAM.gov") # noqa E501

    return app


def _setup_logging():
    LOGLEVEL = os.environ.get('LOGLEVEL', 'INFO').upper()

    dictConfig({
        "version": 1,
        "disable_existing_loggers": True,
        "formatters": {
            "default": {
                "format": "[%(asctime)s] %(levelname)s in %(module)s: %(message)s",  # noqa E501
            }
        },
        "handlers": {
            "console": {
                "level": LOGLEVEL,
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
            },
            "samtools": {
                "handlers": ["console"],
                "level": LOGLEVEL,
                "propagate": False,
            }
        },
        "root": {
            "level": LOGLEVEL,
            "handlers": ["console"],
        }
    })
