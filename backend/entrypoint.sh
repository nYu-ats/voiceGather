#!/bin/sh

# 環境最新化
pipenv install

exec "$@"