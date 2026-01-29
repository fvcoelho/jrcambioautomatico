import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { evolutionApiService } from '@/lib/evolution/client'

export async function POST(request: Request) {
  try {
    const { to, message, messageType = 'text', mediaUrl, caption } = await request.json()

    // Validate input
    if (!to || (!message && messageType === 'text')) {
      return NextResponse.json(
        { error: 'Missing required fields: to and message are required for text messages' },
        { status: 400 }
      )
    }

    if ((messageType === 'image' || messageType === 'document') && !mediaUrl) {
      return NextResponse.json(
        { error: 'Media URL is required for image/document messages' },
        { status: 400 }
      )
    }

    // Get AI instruction with instance ID
    const aiInstruction = await prisma.aiInstructions.findFirst({
      where: { 
        isActive: true,
        evolutionInstanceId: { not: null }
      }
    })

    if (!aiInstruction || !aiInstruction.evolutionInstanceId) {
      return NextResponse.json(
        { error: 'WhatsApp bot is not enabled' },
        { status: 400 }
      )
    }

    // Check connection status
    const stateResult = await evolutionApiService.getConnectionState(aiInstruction.evolutionInstanceId)
    
    if (!stateResult.success || (stateResult.data?.state !== 'open' && stateResult.data?.state !== 'connected')) {
      return NextResponse.json(
        { error: 'WhatsApp bot is not connected. Please connect the bot first.' },
        { status: 400 }
      )
    }

    // Send message based on type
    let result
    if (messageType === 'text') {
      result = await evolutionApiService.sendTextMessage(
        aiInstruction.evolutionInstanceId,
        to,
        message
      )
    } else if (messageType === 'image' || messageType === 'document') {
      result = await evolutionApiService.sendMediaMessage(
        aiInstruction.evolutionInstanceId,
        to,
        mediaUrl,
        messageType as 'image' | 'document',
        caption || message
      )
    } else {
      return NextResponse.json(
        { error: 'Invalid message type. Supported types: text, image, document' },
        { status: 400 }
      )
    }

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to send test message' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Test message sent successfully',
      data: result.data
    })
  } catch (error) {
    console.error('Error sending test message:', error)
    return NextResponse.json(
      { error: 'Failed to send test message' },
      { status: 500 }
    )
  }
}