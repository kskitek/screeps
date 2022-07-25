#!/bin/sh

export RELEASE=v0.1.0
export RELEASE_ESCAPED=$(echo $RELEASE | sed 's/\./-/g')
export DATE=$(date --iso-8601=seconds)

touch annotations.yaml
for SLO_NAME in $(./sloctl --config ~/Downloads/config.toml get slo -p screeps -o json | jq -r .[].metadata.name)
do
  export SLO_NAME
  printf "Annotating $SLO_NAME\n"
  envsubst < slos/annotation.yaml.template >> annotations.yaml
  echo "---" >> annotations.yaml
done

cat annotations.yaml
