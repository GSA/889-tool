#/bin/bash

set -e

echo $BRANCH

case "$BRANCH" in
main)
    MODE="production" ;;
staging)
    MODE="staging" ;;
dev)
    mode="dev" ;;
*)
    MODE="dev" ;;
esac

echo "building for:"
echo $MODE

vite build --emptyOutDir --mode $MODE