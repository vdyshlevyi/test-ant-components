#!/bin/bash
set -e

echo "Starting API initialization..."

# Create admin user
echo "Creating admin user..."
python -m scripts.create_admin_user || echo "Admin creation failed or user already exists"

echo "Starting API server..."
exec /app/entrypoint.sh
