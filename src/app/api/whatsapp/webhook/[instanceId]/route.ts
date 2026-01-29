import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ instanceId: string }> }
) {
  try {
    const params = await context.params
    const { instanceId } = params
    const body = await request.json()
    
    console.log(`Evolution webhook received for instance ${instanceId}:`, JSON.stringify(body, null, 2))
    
    // Process Evolution API webhook format
    if (body.event && body.data) {
      await processEvolutionWebhook(body, instanceId)
    }
    
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Evolution webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function processEvolutionWebhook(webhook: any, instanceId: string) {
  const { event, data } = webhook
  
  console.log(`Processing Evolution webhook: ${event} for instance: ${instanceId}`)
  
  try {
    switch (event) {
      case 'messages.upsert':
        if (data.messages && data.messages.length > 0) {
          for (const message of data.messages) {
            await processEvolutionMessage(message, instanceId)
          }
        }
        break
        
      case 'connection.update':
        console.log(`Connection update for ${instanceId}:`, data.state)
        // Update connection status in database if needed
        break
        
      case 'send.message':
        console.log(`Message sent from ${instanceId}:`, data)
        break
        
      default:
        console.log(`Unhandled Evolution webhook event: ${event}`)
    }
  } catch (error) {
    console.error('Error processing Evolution webhook:', error)
  }
}

async function processEvolutionMessage(message: any, instanceId: string) {
  try {
    const { key, message: messageData, messageTimestamp, pushName } = message
    const { remoteJid, fromMe, id } = key
    
    // Skip messages from ourselves
    if (fromMe) return
    
    // Skip group messages (only handle individual chats)
    if (remoteJid.includes('@g.us')) return
    
    // Extract phone number from remoteJid
    const phoneNumber = remoteJid.replace('@s.whatsapp.net', '')
    
    // Get message content
    let content = ''
    if (messageData.conversation) {
      content = messageData.conversation
    } else if (messageData.extendedTextMessage?.text) {
      content = messageData.extendedTextMessage.text
    }
    
    if (!content) {
      console.log('No text content found in message')
      return
    }
    
    console.log(`Incoming message from ${phoneNumber}: ${content}`)
    
    // Find or create conversation
    let conversation = await prisma.whatsAppConversation.findUnique({
      where: { phoneNumber }
    })
    
    if (!conversation) {
      conversation = await prisma.whatsAppConversation.create({
        data: {
          phoneNumber,
          customerName: pushName || null,
          lastMessageAt: new Date(messageTimestamp * 1000),
          status: 'ACTIVE'
        }
      })
      console.log(`Created new conversation for ${phoneNumber}`)
    } else {
      // Update customer name if provided and not set
      if (pushName && !conversation.customerName) {
        await prisma.whatsAppConversation.update({
          where: { id: conversation.id },
          data: { customerName: pushName }
        })
      }
    }
    
    // Save incoming message
    await prisma.whatsAppMessage.create({
      data: {
        conversationId: conversation.id,
        messageId: id,
        direction: 'INBOUND',
        content,
        createdAt: new Date(messageTimestamp * 1000)
      }
    })
    
    // Update conversation timestamp
    await prisma.whatsAppConversation.update({
      where: { id: conversation.id },
      data: { lastMessageAt: new Date(messageTimestamp * 1000) }
    })
    
    console.log(`Message saved for conversation ${conversation.id}`)
    
    // Get AI instructions for response
    const aiInstruction = await prisma.aiInstructions.findFirst({
      where: { 
        isActive: true,
        evolutionInstanceId: instanceId
      }
    })
    
    if (aiInstruction && aiInstruction.prompt) {
      console.log(`AI instruction found for instance ${instanceId}`)
      
      // TODO: Integrate with AI service (OpenAI, etc.) using the prompt
      // to generate appropriate responses based on the message content
      // 
      // Example integration:
      // const aiResponse = await generateAiResponse(content, aiInstruction.prompt)
      // if (aiResponse) {
      //   await sendResponseMessage(instanceId, phoneNumber, aiResponse)
      // }
      
      console.log('AI response generation would happen here')
    } else {
      console.log(`No AI instruction found for instance ${instanceId}`)
    }
    
  } catch (error) {
    console.error('Error processing Evolution message:', error)
  }
}