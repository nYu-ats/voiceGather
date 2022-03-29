#!/bin/sh

# 環境最新化
cd /var/log/app/voiceGather/ && pipenv install > /dev/null

exec "$@"