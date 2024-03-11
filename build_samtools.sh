set -v
set -e

INSTALL_DIR=$(pwd)

# Build virtual environment for python
virtualenv -p python3 venv
#python -m venv venv
source venv/bin/activate
venv/bin/pip install -r requirements.txt

# show if there any any updates to the libraires
pip list --outdated

