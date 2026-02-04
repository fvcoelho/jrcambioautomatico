import axios, { AxiosInstance } from 'axios'

interface EvolutionApiConfig {
  apiUrl: string
  apiKey: string
}

interface CreateInstanceParams {
  instanceName: string
  token?: string
  qrcode?: boolean
  integration?: string
  number?: string
  webhookUrl?: string
}

interface SendMessageParams {
  number: string
  text?: string
  mediaUrl?: string
  mediaType?: 'image' | 'document' | 'audio' | 'video'
  caption?: string
}

interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}

export class EvolutionApiService {
  private api: AxiosInstance | null = null
  private apiKey: string
  private isConfigured: boolean = false

  constructor(config?: EvolutionApiConfig) {
    const apiUrl = config?.apiUrl || process.env.EVOLUTION_API_URL || ''
    const apiKey = config?.apiKey || process.env.EVOLUTION_API_KEY || ''

    console.log('🔧 Initializing Evolution API Service')
    console.log('API URL:', apiUrl || 'NOT SET')
    console.log('API Key:', apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT SET')

    if (!apiUrl || !apiKey) {
      console.error('❌ Evolution API configuration missing!')
      console.error('API URL provided:', !!apiUrl)
      console.error('API Key provided:', !!apiKey)
      // Don't throw during build time - just mark as not configured
      this.isConfigured = false
      this.apiKey = ''
      return
    }

    this.isConfigured = true
    this.apiKey = apiKey
    this.api = axios.create({
      baseURL: apiUrl,
      headers: {
        'Content-Type': 'application/json',
        'apikey': apiKey
      },
      timeout: 30000 // 30 second timeout
    })

    // Add request interceptor for debugging
    this.api.interceptors.request.use(
      (config) => {
        console.log(`📤 Evolution API Request: ${config.method?.toUpperCase()} ${config.url}`)
        if (config.data) {
          console.log('Request data:', JSON.stringify(config.data, null, 2))
        }
        return config
      },
      (error) => {
        console.error('❌ Request interceptor error:', error)
        return Promise.reject(error)
      }
    )

    // Add response interceptor for debugging
    this.api.interceptors.response.use(
      (response) => {
        console.log(`📥 Evolution API Response: ${response.status} ${response.config.url}`)
        return response
      },
      (error) => {
        console.error(`❌ Evolution API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url}`)
        console.error('Status:', error.response?.status)
        console.error('Error data:', JSON.stringify(error.response?.data, null, 2))
        return Promise.reject(error)
      }
    )

    console.log('✅ Evolution API Service initialized successfully')
  }

  /**
   * Generate instance name for Evolution API
   */
  static generateInstanceName(slug: string, phoneNumber: string): string {
    // Clean phone number and slug for instance name
    const cleanSlug = slug.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '')
    return `${cleanSlug}_${cleanPhone}`
  }

  /**
   * Generate webhook URL for instance
   */
  static generateWebhookUrl(instanceId: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || 'http://localhost:3000'
    return `${baseUrl}/api/whatsapp/webhook/${instanceId}`
  }

  /**
   * Check if service is properly configured
   */
  private checkConfiguration(): ApiResponse | null {
    if (!this.isConfigured || !this.api) {
      return {
        success: false,
        error: 'Evolution API is not configured. Please set EVOLUTION_API_URL and EVOLUTION_API_KEY environment variables.'
      }
    }
    return null
  }

  /**
   * Create a new WhatsApp instance
   */
  async createInstance(params: CreateInstanceParams): Promise<ApiResponse> {
    const configError = this.checkConfiguration()
    if (configError) return configError

    try {
      const requestPayload = {
        instanceName: params.instanceName,
        token: params.token || 'jrcambio-token',
        qrcode: params.qrcode !== false,
        integration: params.integration || 'WHATSAPP-BAILEYS',
        webhook: params.webhookUrl ? {
          url: params.webhookUrl,
          events: [
            'messages',
            'messages.upsert',
            'messages.update',
            'messages.delete',
            'send.message',
            'connection.update'
          ],
          webhook_by_events: false
        } : undefined
      }

      console.log('📱 Creating Evolution instance...')
      console.log('Instance Name:', params.instanceName)
      console.log('Webhook URL:', params.webhookUrl || 'Not configured')
      console.log('API URL:', this.api!.defaults.baseURL)
      console.log('Request payload:', JSON.stringify(requestPayload, null, 2))

      const response = await this.api!.post('/instance/create', requestPayload)

      console.log('✅ Evolution instance created successfully')
      console.log('Response status:', response.status)
      console.log('Response data:', JSON.stringify(response.data, null, 2))

      return { success: true, data: response.data }
    } catch (error: any) {
      console.error('❌ Error creating Evolution instance')
      console.error('Instance Name:', params.instanceName)
      console.error('Error type:', error.name)
      console.error('Error message:', error.message)
      
      if (error.response) {
        console.error('Response status:', error.response.status)
        console.error('Response data:', JSON.stringify(error.response.data, null, 2))
        console.error('Response headers:', JSON.stringify(error.response.headers, null, 2))
      } else if (error.request) {
        console.error('No response received')
        console.error('Request:', error.request)
      } else {
        console.error('Error details:', error)
      }
      
      return { 
        success: false, 
        error: error.response?.data?.message || error.response?.data?.error || error.message 
      }
    }
  }

  /**
   * Connect to instance and get QR code
   */
  async connectInstance(instanceName: string): Promise<ApiResponse> {
    const configError = this.checkConfiguration()
    if (configError) return configError

    try {
      const response = await this.api!.get(`/instance/connect/${instanceName}`)
      console.log('Evolution API connect response:', JSON.stringify(response.data, null, 2))
      return { success: true, data: response.data }
    } catch (error: any) {
      console.error('Error connecting instance:', error.response?.data || error.message)
      return { 
        success: false, 
        error: error.response?.data?.message || error.message 
      }
    }
  }

  /**
   * Get connection state
   */
  async getConnectionState(instanceName: string): Promise<ApiResponse> {
    const configError = this.checkConfiguration()
    if (configError) return configError

    try {
      const response = await this.api!.get(`/instance/connectionState/${instanceName}`)
      return { success: true, data: response.data }
    } catch (error: any) {
      console.error('Error getting connection state:', error.response?.data || error.message)
      return { 
        success: false, 
        error: error.response?.data?.message || error.message 
      }
    }
  }

  /**
   * Send text message
   */
  async sendTextMessage(instanceName: string, to: string, text: string): Promise<ApiResponse> {
    const configError = this.checkConfiguration()
    if (configError) return configError

    try {
      const response = await this.api!.post(`/message/sendText/${instanceName}`, {
        number: to,
        text: text
      })
      return { success: true, data: response.data }
    } catch (error: any) {
      console.error('Error sending text message:', error.response?.data || error.message)
      return { 
        success: false, 
        error: error.response?.data?.message || error.message 
      }
    }
  }

  /**
   * Send media message (image, document, etc.)
   */
  async sendMediaMessage(
    instanceName: string,
    to: string,
    mediaUrl: string,
    mediaType: 'image' | 'document' | 'audio' | 'video',
    caption?: string
  ): Promise<ApiResponse> {
    const configError = this.checkConfiguration()
    if (configError) return configError

    try {
      const endpoint = mediaType === 'image' ? 'sendImage' : 
                      mediaType === 'document' ? 'sendDocument' :
                      mediaType === 'audio' ? 'sendAudio' : 'sendVideo'

      const response = await this.api!.post(`/message/${endpoint}/${instanceName}`, {
        number: to,
        media: mediaUrl,
        caption: caption
      })
      return { success: true, data: response.data }
    } catch (error: any) {
      console.error(`Error sending ${mediaType} message:`, error.response?.data || error.message)
      return { 
        success: false, 
        error: error.response?.data?.message || error.message 
      }
    }
  }

  /**
   * Send typing indicator
   */
  async sendTyping(instanceName: string, to: string, duration: number = 3000): Promise<ApiResponse> {
    const configError = this.checkConfiguration()
    if (configError) return configError

    try {
      const response = await this.api!.post(`/chat/sendPresence/${instanceName}`, {
        number: to,
        presence: 'composing',
        delay: duration
      })
      return { success: true, data: response.data }
    } catch (error: any) {
      console.error('Error sending typing indicator:', error.response?.data || error.message)
      return { 
        success: false, 
        error: error.response?.data?.message || error.message 
      }
    }
  }

  /**
   * Get messages from a chat
   */
  async getMessages(instanceName: string, chatId: string, limit: number = 50): Promise<ApiResponse> {
    const configError = this.checkConfiguration()
    if (configError) return configError

    try {
      const response = await this.api!.get(`/chat/findMessages/${instanceName}`, {
        params: {
          remoteJid: chatId,
          limit: limit
        }
      })
      return { success: true, data: response.data }
    } catch (error: any) {
      console.error('Error getting messages:', error.response?.data || error.message)
      return { 
        success: false, 
        error: error.response?.data?.message || error.message 
      }
    }
  }

  /**
   * Logout instance (disconnect WhatsApp session)
   */
  async logoutInstance(instanceName: string): Promise<ApiResponse> {
    const configError = this.checkConfiguration()
    if (configError) return configError

    try {
      const response = await this.api!.delete(`/instance/logout/${instanceName}`)
      return { success: true, data: response.data }
    } catch (error: any) {
      console.error('Error logging out instance:', error.response?.data || error.message)
      return { 
        success: false, 
        error: error.response?.data?.message || error.message 
      }
    }
  }

  /**
   * Delete instance completely
   */
  async deleteInstance(instanceName: string): Promise<ApiResponse> {
    const configError = this.checkConfiguration()
    if (configError) return configError

    try {
      const response = await this.api!.delete(`/instance/delete/${instanceName}`)
      return { success: true, data: response.data }
    } catch (error: any) {
      console.error('Error deleting instance:', error.response?.data || error.message)
      return { 
        success: false, 
        error: error.response?.data?.message || error.message 
      }
    }
  }

  /**
   * Restart instance
   */
  async restartInstance(instanceName: string): Promise<ApiResponse> {
    const configError = this.checkConfiguration()
    if (configError) return configError

    try {
      const response = await this.api!.put(`/instance/restart/${instanceName}`)
      return { success: true, data: response.data }
    } catch (error: any) {
      console.error('Error restarting instance:', error.response?.data || error.message)
      return { 
        success: false, 
        error: error.response?.data?.message || error.message 
      }
    }
  }

  /**
   * Set webhook for instance
   */
  async setWebhook(instanceName: string, webhookUrl: string): Promise<ApiResponse> {
    const configError = this.checkConfiguration()
    if (configError) return configError

    try {
      const response = await this.api!.put(`/webhook/set/${instanceName}`, {
        url: webhookUrl,
        events: [
          'messages',
          'messages.upsert',
          'messages.update',
          'connection.update'
        ],
        webhook_by_events: false
      })
      return { success: true, data: response.data }
    } catch (error: any) {
      console.error('Error setting webhook:', error.response?.data || error.message)
      return { 
        success: false, 
        error: error.response?.data?.message || error.message 
      }
    }
  }
}

// Export singleton instance
export const evolutionApiService = new EvolutionApiService()