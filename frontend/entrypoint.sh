#!/bin/sh

if [ ! -d './voiceGather' ]; then
  echo "set up application..."
  npm install -g create-react-app && create-react-app voice-gather
else
  echo "already set up application"
fi

exec "$@"