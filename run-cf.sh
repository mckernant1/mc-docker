#!/usr/bin/env sh

cd data || exit 1

if [ "$(ls | wc -l)" -eq 1 ]; then
  zipfile=$(find . -name '*.zip')
  unzip -ju "$zipfile"
  rm "$zipfile"
fi

start_script=$(find . -regex ".*start.*\.sh" | head -n 1)
echo "Found start script $start_script"
chmod +x "$start_script"
echo "Starting Server"
sh "$start_script" &

root_dir=$(find . -type f -name '*eula.txt*' -exec dirname {} \;)

while [ "$root_dir" = "" ]; do
  echo "EULA NOT FOUND WAITING"
  sleep 5
  root_dir=$(find . -type f -name '*eula.txt*' -exec dirname {} \;)
done

echo "Found root dir to be $root_dir"

echo "eula=true" >"$root_dir/eula.txt"
cp ../ops.json "$root_dir/ops.json"

while true; do
  echo "Running"
  sleep 60
done
