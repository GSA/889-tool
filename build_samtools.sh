set -v
set -e

INSTALL_DIR=$(pwd)

# Build virtual environment for python
# virtualenv -p python3 venv
python -m venv venv
source venv/bin/activate
venv/bin/pip install -r requirements.txt

# Build javascript/css libraries
npm install
cd node_modules/fomantic-ui/
npx gulp install
cd ${INSTALL_DIR}
cp site.variables semantic/src/site/globals/
cd ${INSTALL_DIR}/semantic
npx gulp build
cd ${INSTALL_DIR}
rsync -av semantic/dist/* samtools/static/semantic/

# Output to file the last time site was updated
git log -1 | grep Date > last_updated.txt 

# show if there any any updates to the libraires
pip list --outdated
npm outdated
