#!/bin/sh

# ホスト側ユーザーのUIDとGIDを.envファイルに事前に書き出しておく
# ここで書き出したUIDとGIDでmysqlコンテナ内でフォルダ操作権限を与える
echo "LINUX_NODE_UID=$(id -u $USER)" >> .env
echo "LINUX_NODE_GID=$(id -g $USER)" >> .env

# entrypoint.shはホスト側で作成したファイルなので
# Dockerコンテキストにコピーしても実行できるようにファイル権限を変更
chmod +x ./backend/entrypoint.sh
chmod +x ./frontend/entrypoint.sh

# ビルド実行
docker-compose up -d