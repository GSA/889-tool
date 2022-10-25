#/bin/bash

set -eo pipefail

gunicorn samtools.wsgi:app --workers=4 -k gevent
