# File Storage Configuration

PisosPro supports two storage backends for file uploads: **Vercel Blob** (cloud) and **Local Filesystem** (volume).

## Storage Types

### 1. Local Storage (Recommended for Docker)

Files are stored in a local volume, perfect for self-hosted Docker deployments.

**Advantages:**
- ✅ No external service dependencies
- ✅ No additional costs
- ✅ Full control over file storage
- ✅ Works offline
- ✅ Persistent across container restarts (using Docker volumes)

**Configuration:**

```env
STORAGE_TYPE=local
UPLOAD_DIR=/uploads  # In Docker (mounted volume)
# or
UPLOAD_DIR=public/uploads  # In development (static files)
```

**Docker Volume:**
The `docker-compose.yml` automatically mounts a persistent volume:
```yaml
volumes:
  - uploads_data:/uploads
```

**File Access:**
Files are served via the API route `/api/uploads/[...path]`

Example: `/api/uploads/gallery/1234567890-image.jpg`

### 2. Vercel Blob Storage (Cloud)

Files are stored in Vercel's cloud blob storage.

**Advantages:**
- ✅ CDN delivery
- ✅ Automatic scaling
- ✅ Global distribution
- ✅ Vercel platform integration

**Configuration:**

```env
STORAGE_TYPE=vercel
BLOB_READ_WRITE_TOKEN=your_token_here
BLOB_STORE_ID=your_store_id
BLOB_BASE_URL=your_blob_url
```

**Requirements:**
- Vercel account
- Blob storage configured in Vercel dashboard
- Valid access token

## Switching Between Storage Types

Simply change the `STORAGE_TYPE` environment variable:

```bash
# Use local storage
STORAGE_TYPE=local

# Use Vercel Blob
STORAGE_TYPE=vercel
```

**Note:** Existing files won't be migrated automatically. You'll need to manually migrate if switching storage types.

## Implementation Details

### Upload Flow

1. **Client** → Uploads file via `/api/gallery/upload`
2. **Server** → Checks `STORAGE_TYPE` environment variable
3. **Storage Service**:
   - If `local`: Saves to filesystem via `localStorageService`
   - If `vercel`: Uploads to Vercel Blob via `@vercel/blob`
4. **Database** → Saves metadata (URL, title, description, etc.)
5. **Response** → Returns file URL to client

### File Serving

**Local Storage:**
- Production (Docker): `/api/uploads/[...path]` route
- Development: `/uploads/[...path]` static files

**Vercel Blob:**
- Direct CDN URLs from Vercel

## Development vs Production

### Development (Local)
```env
STORAGE_TYPE=local
UPLOAD_DIR=public/uploads  # Served as Next.js static files
```

Files are stored in `public/uploads/` and automatically served by Next.js.

### Production (Docker)
```env
STORAGE_TYPE=local
UPLOAD_DIR=/uploads  # Mounted Docker volume
```

Files are stored in `/uploads` volume and served via API route.

### Production (Vercel)
```env
STORAGE_TYPE=vercel
BLOB_READ_WRITE_TOKEN=...
```

Files are uploaded to Vercel Blob cloud storage.

## File Structure

### Local Storage
```
/uploads/
  └── gallery/
      ├── 1234567890-photo1.jpg
      ├── 1234567891-photo2.png
      └── 1234567892-video.mp4
```

### Database Schema
```typescript
{
  id: number
  title: string
  description: string
  imageUrl: string  // Full URL to file
  publicId: string  // Pathname/identifier
  projectId: number
  fileType: 'image' | 'video'
  mimeType: string
  displayOrder: number
  isActive: boolean
}
```

## Security

### Local Storage
- Path traversal protection (validates files are within upload directory)
- File type validation (images and videos only)
- Size limits: 10MB for images, 20MB for videos
- Served with proper Content-Type headers
- Cache headers for performance

### Vercel Blob
- Public access URLs
- Vercel's built-in security
- Token-based authentication for uploads

## Backup Strategy

### Local Storage (Docker)
```bash
# Backup uploads volume
docker run --rm -v pisospro_uploads_data:/uploads -v $(pwd):/backup alpine tar czf /backup/uploads-backup.tar.gz /uploads

# Restore uploads volume
docker run --rm -v pisospro_uploads_data:/uploads -v $(pwd):/backup alpine tar xzf /backup/uploads-backup.tar.gz -C /
```

### Vercel Blob
Files are managed by Vercel. Use Vercel's dashboard for management.

## Troubleshooting

### Files not appearing after upload

**Local Storage:**
1. Check volume is mounted: `docker volume ls`
2. Check directory permissions inside container
3. Check API route is serving files: `/api/uploads/gallery/test.jpg`

**Vercel Blob:**
1. Verify `BLOB_READ_WRITE_TOKEN` is set correctly
2. Check Vercel dashboard for blob storage status
3. Check network connectivity to Vercel services

### "Blob storage not configured" error

Either:
- Set `STORAGE_TYPE=local` to use local storage
- Or configure Vercel Blob credentials

## Migration Between Storage Types

### From Vercel to Local

1. Download all files from Vercel Blob
2. Copy to local storage directory
3. Update database `imageUrl` fields to local paths
4. Change `STORAGE_TYPE=local`

### From Local to Vercel

1. Upload all files to Vercel Blob
2. Update database `imageUrl` fields to Vercel URLs
3. Change `STORAGE_TYPE=vercel`

**Note:** Migration scripts are not included. Create custom scripts based on your needs.
