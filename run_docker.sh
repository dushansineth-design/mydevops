#!/bin/bash

# Force the API version to match the Daemon's requirement
export DOCKER_API_VERSION=1.44

echo "Stopping containers..."
docker compose down

echo "Building and starting with DOCKER_API_VERSION=1.44..."
docker compose up --build
