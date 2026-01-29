import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export interface LocalUploadResult {
  url: string
  pathname: string
  size: number
  downloadUrl: string
}

class LocalStorageService {
  private uploadDir: string

  constructor() {
    // Use /uploads in production (Docker), public/uploads in development
    this.uploadDir = process.env.UPLOAD_DIR || join(process.cwd(), 'public', 'uploads')
  }

  /**
   * Ensure upload directory exists
   */
  private async ensureUploadDir(): Promise<void> {
    if (!existsSync(this.uploadDir)) {
      await mkdir(this.uploadDir, { recursive: true })
      console.log('✅ Created upload directory:', this.uploadDir)
    }
  }

  /**
   * Upload file to local storage
   */
  async uploadFile(file: File, category: string = 'general'): Promise<LocalUploadResult> {
    await this.ensureUploadDir()

    // Create category subdirectory
    const categoryDir = join(this.uploadDir, category)
    if (!existsSync(categoryDir)) {
      await mkdir(categoryDir, { recursive: true })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `${timestamp}-${sanitizedName}`
    const filepath = join(categoryDir, filename)

    // Convert File to Buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Write file to disk
    await writeFile(filepath, buffer)
    console.log('✅ File saved to:', filepath)

    // Generate URL path
    // If using /uploads (production), serve from /uploads route
    // If using public/uploads (dev), serve from /uploads static path
    const urlPath = process.env.UPLOAD_DIR
      ? `/api/uploads/${category}/${filename}`
      : `/uploads/${category}/${filename}`

    const result: LocalUploadResult = {
      url: urlPath,
      pathname: `${category}/${filename}`,
      size: file.size,
      downloadUrl: urlPath,
    }

    return result
  }

  /**
   * Get file path from URL pathname
   */
  getFilePath(pathname: string): string {
    return join(this.uploadDir, pathname)
  }

  /**
   * Check if file exists
   */
  fileExists(pathname: string): boolean {
    const filepath = this.getFilePath(pathname)
    return existsSync(filepath)
  }
}

export const localStorageService = new LocalStorageService()
