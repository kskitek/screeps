#!/bin/sh

SLOCTL_VERSION=0.0.72
SLOCTL_URL=https://github.com/nobl9/sloctl/raw/main/sloctl-linux-$SLOCTL_VERSION.zip

wget $SLOCTL_URL -O sloctl.zip
unzip sloctl.zip

# TODO move from sloctl to terraform

for file in $(ls slos/*.yaml)
do
  printf "Applying $file\n"
  ./sloctl --config ~/Downloads/config.toml apply -f $file
done
