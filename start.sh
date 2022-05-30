#!/usr/bin/env sh

npm run main;

case $(echo "$SERVER_TYPE" | tr '[:upper:]' '[:lower:]')
  in vanilla) ./run-paper.sh;;
  curseforge) ./run-cf.sh;;
  *) echo "Unknown";;
esac
