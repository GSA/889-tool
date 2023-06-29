#/bin/bash

set -eo pipefail

gunicorn -b :$PORT samtools.wsgi:app --workers 2 --worker-class uvicorn.workers.UvicornWorker