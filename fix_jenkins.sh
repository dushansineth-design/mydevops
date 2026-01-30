#!/bin/bash
set -e

echo "🔍 Checking Docker Plugins..."

# Define Paths
PLUGIN_DIR="/usr/local/lib/docker/cli-plugins"
BUILDX_URL="https://github.com/docker/buildx/releases/download/v0.11.2/buildx-v0.11.2.linux-amd64"
COMPOSE_URL="https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64"

# Ensure directory exists
sudo mkdir -p $PLUGIN_DIR

echo "⬇️  Downloading Docker Buildx..."
sudo curl -SL $BUILDX_URL -o $PLUGIN_DIR/docker-buildx
sudo chmod +x $PLUGIN_DIR/docker-buildx

echo "⬇️  Downloading Docker Compose..."
sudo curl -SL $COMPOSE_URL -o $PLUGIN_DIR/docker-compose
sudo chmod +x $PLUGIN_DIR/docker-compose

echo "✅ Verifying Installation..."
ls -l $PLUGIN_DIR

echo "🚀 Testing Buildx..."
docker buildx version

echo "🚀 Testing Compose..."
docker compose version

echo "🎉 FIXED! You can now run the build."
