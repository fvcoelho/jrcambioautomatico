# Docker Volumes - Data Persistence Guide

## ✅ Current Configuration - SAFE

Your docker-compose.yml is already configured to **preserve data** across container recreations.

## Named Volumes (Persistent)

```yaml
volumes:
  postgres_data:
    driver: local
  uploads_data:
    driver: local
```

These are **named volumes** that persist independently of containers.

## Volume Lifecycle

### ✅ SAFE Operations (Data is Preserved)

```bash
# Recreate containers - VOLUMES ARE KEPT
docker-compose down
docker-compose up -d

# Restart containers - VOLUMES ARE KEPT
docker-compose restart

# Stop and start - VOLUMES ARE KEPT
docker-compose stop
docker-compose start

# Rebuild and recreate - VOLUMES ARE KEPT
docker-compose up -d --build

# Remove containers - VOLUMES ARE KEPT
docker-compose rm -f

# Force recreate - VOLUMES ARE KEPT
docker-compose up -d --force-recreate
```

### ⚠️ DANGEROUS Operations (Can Delete Data)

```bash
# Delete volumes explicitly - DELETES ALL DATA
docker-compose down -v

# Remove specific volume - DELETES THAT DATA
docker volume rm postgres_data
docker volume rm uploads_data

# Prune all unused volumes - CAN DELETE DATA
docker volume prune
```

## Volume Locations

When you run `docker-compose up`, volumes are created at:

```
/var/lib/docker/volumes/pisospro_postgres_data/_data
/var/lib/docker/volumes/pisospro_uploads_data/_data
```

Or with Coolify (generated names):
```
/var/lib/docker/volumes/<project-id>_postgres-data/_data
/var/lib/docker/volumes/<project-id>_uploads-data/_data
```

## Data Persistence Guarantees

### PostgreSQL Database (`postgres_data`)
- **Container deleted:** Data remains ✓
- **Container recreated:** Data remains ✓
- **Image updated:** Data remains ✓
- **docker-compose down:** Data remains ✓
- **docker-compose down -v:** Data DELETED ✗

### Uploads (`uploads_data`)
- **Container deleted:** Data remains ✓
- **Container recreated:** Data remains ✓
- **Image updated:** Data remains ✓
- **docker-compose down:** Data remains ✓
- **docker-compose down -v:** Data DELETED ✗

## Backup Strategy

### Manual Backup

**Database:**
```bash
# Backup database
docker exec pisospro-postgres pg_dump -U postgres pisospro > backup.sql

# Restore database
docker exec -i pisospro-postgres psql -U postgres pisospro < backup.sql
```

**Uploads:**
```bash
# Backup uploads
docker run --rm -v pisospro_uploads_data:/data -v $(pwd):/backup alpine tar czf /backup/uploads.tar.gz -C /data .

# Restore uploads
docker run --rm -v pisospro_uploads_data:/data -v $(pwd):/backup alpine tar xzf /backup/uploads.tar.gz -C /data
```

### Automated Backup (Recommended)

Add this to your crontab:

```bash
# Daily database backup at 2 AM
0 2 * * * docker exec pisospro-postgres pg_dump -U postgres pisospro | gzip > /backups/db-$(date +\%Y\%m\%d).sql.gz

# Weekly uploads backup (Sunday 3 AM)
0 3 * * 0 docker run --rm -v pisospro_uploads_data:/data -v /backups:/backup alpine tar czf /backup/uploads-$(date +\%Y\%m\%d).tar.gz -C /data .

# Keep only last 30 days
0 4 * * * find /backups -name "*.sql.gz" -mtime +30 -delete
0 4 * * * find /backups -name "*.tar.gz" -mtime +30 -delete
```

## Volume Inspection

```bash
# List all volumes
docker volume ls

# Inspect volume
docker volume inspect pisospro_postgres_data
docker volume inspect pisospro_uploads_data

# Check volume size
docker system df -v

# Show volume location
docker volume inspect pisospro_postgres_data --format '{{.Mountpoint}}'
```

## Migration to New Server

```bash
# On old server - backup volumes
docker run --rm -v pisospro_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/postgres.tar.gz -C /data .
docker run --rm -v pisospro_uploads_data:/data -v $(pwd):/backup alpine tar czf /backup/uploads.tar.gz -C /data .

# Transfer files to new server
scp postgres.tar.gz uploads.tar.gz user@newserver:/path/

# On new server - restore volumes
docker volume create pisospro_postgres_data
docker volume create pisospro_uploads_data
docker run --rm -v pisospro_postgres_data:/data -v /path:/backup alpine tar xzf /backup/postgres.tar.gz -C /data
docker run --rm -v pisospro_uploads_data:/data -v /path:/backup alpine tar xzf /backup/uploads.tar.gz -C /data

# Start containers
docker-compose up -d
```

## Troubleshooting

### "Database already exists" error
This is NORMAL - it means your volume persisted correctly!

### "Permission denied" in uploads
Check volume ownership:
```bash
docker exec pisospro-app ls -la /uploads
# Should show: drwxr-xr-x nextjs nodejs
```

### Volume not found
Check if volume exists:
```bash
docker volume ls | grep pisospro
```

If missing, create it:
```bash
docker volume create pisospro_postgres_data
docker volume create pisospro_uploads_data
```

## Best Practices

1. **Never use `-v` flag with `docker-compose down`**
   - Always use: `docker-compose down` (without -v)
   - NEVER use: `docker-compose down -v` (deletes volumes)

2. **Regular backups**
   - Automate daily database backups
   - Weekly uploads backups
   - Store backups off-server

3. **Test restores**
   - Periodically test backup restoration
   - Verify data integrity

4. **Monitor volume size**
   - Check disk space regularly
   - Clean old backups
   - Monitor upload growth

5. **Documentation**
   - Document backup procedures
   - Keep restore instructions handy
   - Note volume locations

## Emergency Recovery

If volumes are accidentally deleted:

1. **Stop immediately** - don't run any more commands
2. **Check volume list**: `docker volume ls`
3. **Restore from backup** (see backup section above)
4. **If no backup exists**, volumes are **unrecoverable**

## Summary

✅ **Your data is safe** when:
- Using `docker-compose down` (without -v)
- Rebuilding images
- Recreating containers
- Updating code

⚠️ **Your data is at risk** when:
- Using `docker-compose down -v`
- Manually removing volumes
- Running `docker volume prune`
- Deleting `/var/lib/docker/volumes`

**Remember:** Named volumes persist independently of containers. They are only deleted when explicitly removed.
