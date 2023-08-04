#/bin/bash

set -e

echo $BRANCH

case "$BRANCH" in
main)
    MODE="production" ;;
staging)
    MODE="staging" ;;
*)
    MODE="dev" ;;
esac

echo "building for:"
echo $MODE

vite build --emptyOutDir --mode $MODE