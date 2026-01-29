# Force API version to fix "client version is too old" error
$Env:DOCKER_API_VERSION = "1.44"

# Stop containers
Write-Host "Stopping containers..."
docker compose down

# Remove volumes (Optional - enable if you want to wipe DB)
# docker volume prune -f

# Rebuild and start with the correct command (Space, not hyphen)
Write-Host "Building and starting..."
docker compose up --build -d

Write-Host "Waiting for services..."
Start-Sleep -Seconds 10

Write-Host "Checking logs..."
docker compose logs --tail=20

Write-Host "-------------------------------------------"
Write-Host "Frontend should be at: http://localhost:5174"
Write-Host "Backend should be at:  http://localhost:5050"
Write-Host "-------------------------------------------"
