"""This module sets up the constants that will be used by the Flask application.
It reads in the last data a commit was added to the code from last_updated.txt.
The API key and contact email can be imported either from environment variables,
or from instance/samtools.cfg.
"""

from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    SAM_API_KEY: Optional[str]
    EXTERNAL_LINKS: dict = {
        "SAM.GOV": "https://sam.gov",
        "SAM_ENTITIES_API_DOCS": "https://open.gsa.gov/api/entity-api/"
    }


settings = Settings()  # type: ignore See: https://github.com/pydantic/pydantic/issues/3753
