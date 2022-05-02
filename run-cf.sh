#!/usr/bin/env bash

cd data || exit 1


unzip -ju *.zip

start_script=$(find . -regex ".*start.*\.sh" | head -n 1)
echo "Found start script $start_script"
chmod +x "$start_script"

eula_file=$(find . -name 'eula.txt')
echo "Looking for EULA $eula_file"

while [ "$eula_file" = "" ]; do
  echo "EULA NOT FOUND STARTING SERVER"
  ./"$start_script" &
  sleep 30 && pkill java
  eula_file=$(find . -name 'eula.txt')
  echo "EULA SHOULD NOT BE NULL $eula_file"
done

echo "Setting EULA to true"
sed -i '' 's/eula=false/eula=true/' "$eula_file"

echo "Starting Server"
./"$start_script"


