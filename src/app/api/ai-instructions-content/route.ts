import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'ai-instructions.md')
    const fileContent = fs.readFileSync(filePath, 'utf8')
    
    return NextResponse.json({
      content: fileContent
    })
  } catch (error) {
    console.error('Error reading AI instructions file:', error)
    return NextResponse.json(
      { error: 'Failed to load AI instructions content' },
      { status: 500 }
    )
  }
}