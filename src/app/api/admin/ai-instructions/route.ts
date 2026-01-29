import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const instruction = await prisma.aiInstructions.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    })

    if (!instruction) {
      return NextResponse.json(
        { error: 'No AI instructions found' },
        { status: 404 }
      )
    }

    return NextResponse.json(instruction)
  } catch (error) {
    console.error('Error fetching AI instructions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch AI instructions' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required and must be a string' },
        { status: 400 }
      )
    }

    // Deactivate existing instructions
    await prisma.aiInstructions.updateMany({
      where: { isActive: true },
      data: { isActive: false }
    })

    // Create new instruction
    const instruction = await prisma.aiInstructions.create({
      data: {
        prompt: prompt.trim(),
        isActive: true
      }
    })

    return NextResponse.json(instruction)
  } catch (error) {
    console.error('Error creating AI instructions:', error)
    return NextResponse.json(
      { error: 'Failed to create AI instructions' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const { prompt } = await request.json()

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required and must be a string' },
        { status: 400 }
      )
    }

    // Get current active instruction
    const existingInstruction = await prisma.aiInstructions.findFirst({
      where: { isActive: true }
    })

    if (!existingInstruction) {
      // No existing instruction, create new one
      const instruction = await prisma.aiInstructions.create({
        data: {
          prompt: prompt.trim(),
          isActive: true
        }
      })

      return NextResponse.json(instruction)
    }

    // Update existing instruction
    const instruction = await prisma.aiInstructions.update({
      where: { id: existingInstruction.id },
      data: {
        prompt: prompt.trim(),
        updatedAt: new Date()
      }
    })

    return NextResponse.json(instruction)
  } catch (error) {
    console.error('Error updating AI instructions:', error)
    return NextResponse.json(
      { error: 'Failed to update AI instructions' },
      { status: 500 }
    )
  }
}