import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { EvolutionApiService } from '@/lib/evolution/client'

export async function POST() {
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

    // Get AI instruction with instance ID
    const aiInstruction = await prisma.aiInstructions.findFirst({
      where: { 
        isActive: true,
        evolutionInstanceId: { not: null }
      }
    })

    if (!aiInstruction || !aiInstruction.evolutionInstanceId) {
      return NextResponse.json({
        botEnabled: false,
        connectionStatus: 'disconnected',
        instanceId: null
      })
    }

    console.log(`Disabling Evolution API instance: ${aiInstruction.evolutionInstanceId}`)
    
    // Step 1: Logout instance (disconnect WhatsApp session)
    console.log('Step 1: Logging out WhatsApp session...')
    const logoutResult = await evolutionService.logoutInstance(aiInstruction.evolutionInstanceId)
    if (!logoutResult.success) {
      console.warn(`Failed to logout Evolution API instance: ${logoutResult.error}`)
    } else {
      console.log('✅ WhatsApp session logged out successfully')
    }
    
    // Step 2: Delete the instance completely
    console.log('Step 2: Deleting instance from Evolution API...')
    const deleteResult = await evolutionService.deleteInstance(aiInstruction.evolutionInstanceId)
    if (!deleteResult.success) {
      console.warn(`Failed to delete Evolution API instance: ${deleteResult.error}`)
    } else {
      console.log('✅ Instance deleted successfully from Evolution API')
    }

    // Update AI instructions to remove instance ID
    await prisma.aiInstructions.update({
      where: { id: aiInstruction.id },
      data: {
        evolutionInstanceId: null
      }
    })

    return NextResponse.json({
      botEnabled: false,
      connectionStatus: 'disconnected',
      instanceId: null
    })
  } catch (error) {
    console.error('Error disabling WhatsApp bot:', error)
    return NextResponse.json(
      { error: 'Failed to disable WhatsApp bot' },
      { status: 500 }
    )
  }
}