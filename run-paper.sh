#!/usr/bin/env bash

cd data || exit 1

server_jar=$(find . -maxdepth 1 -name '*paper*.jar' | head -n 1)
echo "Found server jar $server_jar"
echo "eula=true" > eula.txt

if [[ "$server_jar" == *"paper"* ]]; then
  java -jar "$server_jar"
fi
