#!/bin/zsh
cd "$(dirname "$0")"
python3 ./online_sync_server.py --port 8765
