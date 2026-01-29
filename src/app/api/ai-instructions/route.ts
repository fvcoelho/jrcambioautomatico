import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Fetch active AI instructions from database
    const aiInstructions = await prisma.aiInstructions.findFirst({
      where: { isActive: true },
      select: {
        id: true,
        prompt: true,
        evolutionInstanceId: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    })

    if (!aiInstructions) {
      return NextResponse.json({
        message: 'No active AI instructions found',
        data: null
      })
    }

    return NextResponse.json({
      message: 'AI instructions retrieved successfully',
      data: aiInstructions
    })
  } catch (error) {
    console.error('Error fetching AI instructions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch AI instructions' },
      { status: 500 }
    )
  }
}