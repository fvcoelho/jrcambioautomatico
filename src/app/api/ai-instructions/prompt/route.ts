import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Fetch active AI instructions from database
    const aiInstructions = await prisma.aiInstructions.findFirst({
      where: { isActive: true },
      select: {
        prompt: true
      }
    })

    if (!aiInstructions) {
      return NextResponse.json({
        prompt: 'No active AI instructions found'
      })
    }

    // Return just the prompt text
    return NextResponse.json({
      prompt: aiInstructions.prompt
    })
  } catch (error) {
    console.error('Error fetching AI instructions prompt:', error)
    return NextResponse.json(
      { error: 'Failed to fetch AI instructions prompt' },
      { status: 500 }
    )
  }
}