#!/bin/bash

echo "=========================================="
echo "   REPAIRING MERN STACK ENVIRONMENT       "
echo "=========================================="

# 1. Force Git to match GitHub exactly
echo "[1/4] Configuring Git..."
git fetch origin
git reset --hard origin/main

# 2. Stop Containers
echo "[2/4] Stopping Containers..."
docker-compose down --remove-orphans

# 3. Clean Docker System (Prune old cache)
echo "[3/4] Cleaning Docker Cache..."
docker system prune -af --volumes

# 4. Rebuild and Start
echo "[4/4] Starting Server..."
docker-compose up -d --build

echo "=========================================="
echo "   DONE! please refresh your browser.     "
echo "=========================================="
