#!/bin/sh

RELEASE=test
export RELEASE_ESCAPED=$(echo $RELEASE | sed 's/\./-/g')
export DATE=$(date --iso-8601=seconds)

PROJECT=screeps

touch annotations.yaml
for SLO_NAME in $(./sloctl get slo -p $PROJECT -o json | jq -r .[].metadata.name)
do
  export SLO_NAME
  printf "Annotating $SLO_NAME\n"
  envsubst < slos/annotation.yaml.template >> annotations.yaml
  annotations.yaml
done

cat annotations.yaml
# ./sloctl apply -f annotations.yaml
