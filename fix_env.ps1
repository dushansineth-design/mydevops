Write-Host "Stopping Docker containers..."
docker-compose down

Write-Host "Building fresh images (ignoring cache)..."
docker-compose build --no-cache frontend

Write-Host "Starting services..."
docker-compose up -d

Write-Host "Done! Please refresh your browser."
Write-Host "If the Login button does NOT say 'UPDATE CHECK', please check your volume mounts."
