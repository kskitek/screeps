#!/bin/sh

# TODO move from sloctl to terraform

for file in $(ls slos/*.yaml)
do
  printf "Applying $file\n"
  ./sloctl apply -f $file
done
