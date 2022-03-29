#!/bin/sh

if [ ! -e './voice-gather' ]; then
  echo "set up application..."
  npm install -g create-react-app react-router-dom @material-ui/core@next @material-ui/icons@next axios \
  && create-react-app voice-gather --template typescript
else
  echo "already set up application"
fi

exec "$@"