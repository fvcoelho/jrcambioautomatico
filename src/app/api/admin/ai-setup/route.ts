import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const setup = await prisma.aiSetup.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    })

    if (!setup) {
      return NextResponse.json(
        { error: 'No AI setup configuration found' },
        { status: 404 }
      )
    }

    return NextResponse.json(setup)
  } catch (error) {
    console.error('Error fetching AI setup:', error)
    return NextResponse.json(
      { error: 'Failed to fetch AI setup configuration' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { evolutionApiUrl, evolutionApiKey, webhookUrl } = await request.json()

    // Validate required fields
    if (!evolutionApiUrl || !evolutionApiKey) {
      return NextResponse.json(
        { error: 'Evolution API URL and API Key are required' },
        { status: 400 }
      )
    }

    // Deactivate existing setups
    await prisma.aiSetup.updateMany({
      where: { isActive: true },
      data: { isActive: false }
    })

    // Create new setup
    const setup = await prisma.aiSetup.create({
      data: {
        evolutionApiUrl: evolutionApiUrl.trim(),
        evolutionApiKey: evolutionApiKey.trim(),
        webhookUrl: webhookUrl?.trim() || null,
        isActive: true
      }
    })

    return NextResponse.json(setup)
  } catch (error) {
    console.error('Error creating AI setup:', error)
    return NextResponse.json(
      { error: 'Failed to create AI setup configuration' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const { evolutionApiUrl, evolutionApiKey, webhookUrl } = await request.json()

    // Validate required fields
    if (!evolutionApiUrl || !evolutionApiKey) {
      return NextResponse.json(
        { error: 'Evolution API URL and API Key are required' },
        { status: 400 }
      )
    }

    // Get current active setup
    const existingSetup = await prisma.aiSetup.findFirst({
      where: { isActive: true }
    })

    if (!existingSetup) {
      // No existing setup, create new one
      const setup = await prisma.aiSetup.create({
        data: {
          evolutionApiUrl: evolutionApiUrl.trim(),
          evolutionApiKey: evolutionApiKey.trim(),
          webhookUrl: webhookUrl?.trim() || null,
          isActive: true
        }
      })

      return NextResponse.json(setup)
    }

    // Update existing setup
    const setup = await prisma.aiSetup.update({
      where: { id: existingSetup.id },
      data: {
        evolutionApiUrl: evolutionApiUrl.trim(),
        evolutionApiKey: evolutionApiKey.trim(),
        webhookUrl: webhookUrl?.trim() || null,
        updatedAt: new Date()
      }
    })

    return NextResponse.json(setup)
  } catch (error) {
    console.error('Error updating AI setup:', error)
    return NextResponse.json(
      { error: 'Failed to update AI setup configuration' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  try {
    // Deactivate all setups instead of deleting
    await prisma.aiSetup.updateMany({
      where: { isActive: true },
      data: { isActive: false }
    })

    return NextResponse.json({ message: 'AI setup configuration deactivated successfully' })
  } catch (error) {
    console.error('Error deactivating AI setup:', error)
    return NextResponse.json(
      { error: 'Failed to deactivate AI setup configuration' },
      { status: 500 }
    )
  }
}