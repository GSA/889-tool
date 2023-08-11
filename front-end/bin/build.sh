#/bin/bash

set -e

echo $BRANCH

case "$BRANCH" in
main)
    MODE="staging" ;;
staging)
    MODE="staging" ;;
dev)
    MODE="dev" ;;
*)
    MODE="dev" ;;
esac

echo "building for:"
echo $MODE

vite build --emptyOutDir --mode $MODE