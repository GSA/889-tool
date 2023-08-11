#!/usr/bin/env bash

# Bootstraps a given space in cloud.gov

set -e

if [ -z "$1" ] ; then
  echo "Usage: $0 SPACE"
  exit 1
fi

org="gsa-smartpay"
app_name="smartpay-889"
space=$1


echo "Bootstrapping space: $space"
echo

cf target -o ${org} -s ${space}

# Egress security groups
# `public_networks_egress` security group allows the app to connect to the external
# SAM.gov api.
cf bind-security-group public_networks_egress $org --space $space
