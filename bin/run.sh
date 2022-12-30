#/bin/bash

set -eo pipefail

gunicorn samtools.wsgi:app --workers 2 --worker-class uvicorn.workers.UvicornWorker