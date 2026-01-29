import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { evolutionApiService, EvolutionApiService } from '@/lib/evolution/client'

export async function POST() {
  try {
    console.log('🚀 Starting WhatsApp bot enablement process...')
    
    // Get AI Setup configuration from database
    console.log('🔧 Fetching AI Setup configuration...')
    const aiSetup = await prisma.aiSetup.findFirst({
      where: { isActive: true }
    })

    if (!aiSetup || !aiSetup.evolutionApiUrl || !aiSetup.evolutionApiKey) {
      console.error('❌ AI Setup not configured properly')
      return NextResponse.json(
        { error: 'Evolution API not configured. Please configure it in the AI Setup.' },
        { status: 400 }
      )
    }

    console.log('✅ AI Setup found:')
    console.log('Evolution API URL:', aiSetup.evolutionApiUrl)
    console.log('Evolution API Key:', aiSetup.evolutionApiKey ? `${aiSetup.evolutionApiKey.substring(0, 10)}...` : 'NOT SET')
    console.log('Webhook URL:', aiSetup.webhookUrl || 'Will be generated')

    // Create Evolution API service with database configuration
    const evolutionService = new EvolutionApiService({
      apiUrl: aiSetup.evolutionApiUrl,
      apiKey: aiSetup.evolutionApiKey
    })
    
    // Get or create AI instructions
    console.log('📋 Fetching AI instructions...')
    let aiInstruction = await prisma.aiInstructions.findFirst({
      where: { isActive: true }
    })

    if (!aiInstruction) {
      console.log('📝 No AI instructions found, creating defaults...')
      // Create default AI instructions if none exist
      aiInstruction = await prisma.aiInstructions.create({
        data: {
          prompt: `# Assistente Virtual - Pisos-Pró
          
Você é um assistente virtual especializado em pisos e revestimentos.
Ajude os clientes com informações sobre produtos e serviços.`,
          isActive: true
        }
      })
      console.log('✅ Default AI instructions created with ID:', aiInstruction.id)
    } else {
      console.log('✅ Found existing AI instructions with ID:', aiInstruction.id)
    }

    // If already has an instance, check its status
    if (aiInstruction.evolutionInstanceId) {
      console.log('🔍 Existing instance found:', aiInstruction.evolutionInstanceId)
      console.log('📊 Checking connection state...')
      
      const stateResult = await evolutionService.getConnectionState(aiInstruction.evolutionInstanceId)
      console.log('Connection state result:', JSON.stringify(stateResult, null, 2))
      
      if (stateResult.success && (stateResult.data?.state === 'open' || stateResult.data?.state === 'connected')) {
        console.log('✅ Instance already connected!')
        return NextResponse.json({
          botEnabled: true,
          connectionStatus: 'connected',
          instanceId: aiInstruction.evolutionInstanceId
        })
      }
      
      console.log('⚠️ Instance exists but not connected, attempting reconnection...')
      // Instance exists but not connected, try to reconnect
      const connectResult = await evolutionService.connectInstance(aiInstruction.evolutionInstanceId)
      console.log('Reconnection result:', JSON.stringify(connectResult, null, 2))
      
      if (connectResult.success) {
        console.log('✅ Reconnection initiated successfully')
        return NextResponse.json({
          botEnabled: true,
          connectionStatus: 'connecting',
          instanceId: aiInstruction.evolutionInstanceId,
          qrcode: connectResult.data?.qrcode || connectResult.data?.code
        })
      }
      
      console.log('❌ Reconnection failed, will create new instance')
    }

    // Create new instance
    const instanceName = EvolutionApiService.generateInstanceName('pisospro', Date.now().toString())
    const webhookUrl = aiSetup.webhookUrl || EvolutionApiService.generateWebhookUrl(instanceName)

    console.log('🆕 Creating new Evolution API instance...')
    console.log('Instance Name:', instanceName)
    console.log('Webhook URL:', webhookUrl)
    console.log('Using Evolution API URL from database:', aiSetup.evolutionApiUrl)
    console.log('Using Evolution API Key from database:', !!aiSetup.evolutionApiKey)

    // Create instance in Evolution API
    const createResult = await evolutionService.createInstance({
      instanceName,
      token: 'pisospro-token',
      qrcode: true,
      integration: 'WHATSAPP-BAILEYS',
      webhookUrl
    })

    if (!createResult.success) {
      console.error('❌ Failed to create Evolution API instance')
      console.error('Error details:', createResult.error)
      return NextResponse.json(
        { error: `Failed to create Evolution API instance: ${createResult.error}` },
        { status: 500 }
      )
    }

    console.log('✅ Instance created successfully')
    console.log('Instance creation response:', JSON.stringify(createResult.data, null, 2))

    // Connect to get QR code
    console.log('🔗 Attempting to connect instance to get QR code...')
    const connectResult = await evolutionService.connectInstance(instanceName)
    console.log('Connection result:', JSON.stringify(connectResult, null, 2))
    
    if (!connectResult.success) {
      console.error('❌ Failed to connect to Evolution API instance')
      console.error('Error:', connectResult.error)
      console.log('🗑️ Cleaning up failed instance...')
      
      // Clean up on failure
      await evolutionService.deleteInstance(instanceName)
      console.log('✅ Failed instance cleaned up')
      
      return NextResponse.json(
        { error: `Failed to connect to Evolution API instance: ${connectResult.error}` },
        { status: 500 }
      )
    }

    console.log('✅ Instance connected successfully')
    
    // Update AI instructions with instance ID
    console.log('💾 Updating AI instructions with instance ID...')
    await prisma.aiInstructions.update({
      where: { id: aiInstruction.id },
      data: {
        evolutionInstanceId: instanceName
      }
    })
    console.log('✅ AI instructions updated with instance ID:', instanceName)
    
    // Update AiSetup with the webhook URL if it was generated
    if (!aiSetup.webhookUrl) {
      console.log('💾 Updating AiSetup with generated webhook URL...')
      await prisma.aiSetup.update({
        where: { id: aiSetup.id },
        data: {
          webhookUrl: webhookUrl
        }
      })
      console.log('✅ AiSetup updated with webhook URL:', webhookUrl)
    }

    const response = {
      botEnabled: true,
      connectionStatus: 'connecting',
      instanceId: instanceName,
      qrcode: connectResult.data?.base64 || connectResult.data?.qrcode
    }
    
    console.log('🎉 WhatsApp bot enabled successfully!')
    console.log('Response:', JSON.stringify({ ...response, qrcode: response.qrcode ? '[QR CODE DATA]' : undefined }, null, 2))
    
    return NextResponse.json(response)
  } catch (error: any) {
    console.error('💥 Unexpected error enabling WhatsApp bot')
    console.error('Error type:', error.name)
    console.error('Error message:', error.message)
    console.error('Stack trace:', error.stack)
    
    return NextResponse.json(
      { error: 'Failed to enable WhatsApp bot', details: error.message },
      { status: 500 }
    )
  }
}