import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { EvolutionApiService } from '@/lib/evolution/client'

export async function GET() {
  try {
    // Get AI Setup configuration from database
    const aiSetup = await prisma.aiSetup.findFirst({
      where: { isActive: true }
    })

    if (!aiSetup || !aiSetup.evolutionApiUrl || !aiSetup.evolutionApiKey) {
      return NextResponse.json({
        botEnabled: false,
        connectionStatus: 'not_configured',
        instanceId: null,
        error: 'Evolution API not configured'
      })
    }

    // Create Evolution API service with database configuration
    const evolutionService = new EvolutionApiService({
      apiUrl: aiSetup.evolutionApiUrl,
      apiKey: aiSetup.evolutionApiKey
    })

    // Get the first AI instruction (acting as global settings)
    const aiInstruction = await prisma.aiInstructions.findFirst({
      where: { isActive: true }
    })

    if (!aiInstruction || !aiInstruction.evolutionInstanceId) {
      return NextResponse.json({
        botEnabled: false,
        connectionStatus: 'disconnected',
        instanceId: null
      })
    }

    // Check Evolution API connection status
    const stateResult = await evolutionService.getConnectionState(aiInstruction.evolutionInstanceId)
    console.log('Connection state result:', JSON.stringify(stateResult, null, 2))
    
    let connectionState = 'disconnected'
    let qrcode = null

    if (stateResult.success) {
      const state = stateResult.data?.instance?.state || stateResult.data?.state
      console.log('Evolution API state:', state)
      
      // Map Evolution API states to our status
      if (state === 'open' || state === 'connected') {
        connectionState = 'connected'
      } else if (state === 'connecting') {
        connectionState = 'connecting'
      } else {
        connectionState = 'disconnected'
        
        // Try to get QR code if not connected
        console.log('Getting QR code for disconnected instance...')
        const connectResult = await evolutionService.connectInstance(aiInstruction.evolutionInstanceId)
        console.log('Connect result for QR code:', JSON.stringify(connectResult, null, 2))
        if (connectResult.success) {
          qrcode = connectResult.data?.base64 || connectResult.data?.qrcode
        }
      }
    }

    return NextResponse.json({
      botEnabled: true,
      connectionStatus: connectionState,
      instanceId: aiInstruction.evolutionInstanceId,
      qrcode: qrcode,
      evolutionState: stateResult.data?.state
    })
  } catch (error) {
    console.error('Error checking WhatsApp status:', error)
    return NextResponse.json(
      { error: 'Failed to check WhatsApp status' },
      { status: 500 }
    )
  }
}