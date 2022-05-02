#!/usr/bin/env sh

cd data || exit 1

server_jar=$(find . -maxdepth 1 -name '*paper*.jar' | head -n 1)
echo "Found server jar $server_jar"

root_dir=$(find . -type f -name '*eula.txt*' -exec dirname {} \;)
java -jar "$server_jar" &

while [ "$root_dir" = "" ]; do
  echo "EULA NOT FOUND STARTING SERVER"
  sleep 5
  root_dir=$(find . -type f -name '*eula.txt*' -exec dirname {} \;)
done

echo "Found root dir to be $root_dir"

echo "eula=true" >"$root_dir/eula.txt"
cp ../ops.json "$root_dir"/ops.json

while true; do
  sleep 60
  echo "Running"
done
