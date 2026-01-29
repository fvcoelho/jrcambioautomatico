#!/bin/sh
set -e

echo "🚀 Starting Pisos-Pró application..."

# Verify upload directory exists (created in Dockerfile)
if [ "$STORAGE_TYPE" = "local" ] && [ ! -z "$UPLOAD_DIR" ]; then
  if [ -d "$UPLOAD_DIR" ]; then
    echo "✅ Upload directory ready: $UPLOAD_DIR"
  else
    echo "⚠️  Warning: Upload directory not found: $UPLOAD_DIR"
  fi
fi

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
until pg_isready -h postgres -p 5432 -U postgres > /dev/null 2>&1; do
  sleep 2
  echo "Still waiting for PostgreSQL..."
done
echo "✅ PostgreSQL is ready!"

# Push database schema (development mode)
echo "📦 Pushing database schema..."
npx prisma db push --accept-data-loss

echo "✨ Setup complete! Starting Next.js server..."

# Execute the main command
exec "$@"
