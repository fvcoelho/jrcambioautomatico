'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  MessageCircle, 
  Wifi, 
  WifiOff, 
  Settings, 
  Bot, 
  Send, 
  RefreshCw,
  Save,
  Eye,
  Code,
  HelpCircle,
  AlertCircle,
  CheckCircle,
  XCircle,
  QrCode,
  BookOpen
} from 'lucide-react'

interface Conversation {
  id: string
  phoneNumber: string
  customerName: string | null
  lastMessageAt: Date
  status: string
  messages: Array<{
    id: string
    direction: string
    content: string
    createdAt: Date
  }>
  state?: {
    currentStep: string
  }
}

interface AiInstructions {
  id?: string
  prompt: string
  createdAt?: string
  updatedAt?: string
}

interface AiSetup {
  id?: string
  evolutionApiUrl: string
  evolutionApiKey: string
  webhookUrl: string
  createdAt?: string
  updatedAt?: string
}

interface WhatsAppStatus {
  botEnabled: boolean
  connectionStatus: 'connected' | 'disconnected' | 'connecting'
  instanceId: string | null
  qrcode?: string
  evolutionState?: string
}

const defaultPrompt = `# Instruções do Assistente Virtual - Pisos-Pró

## Função
Você é um assistente virtual especializado em pisos e revestimentos da empresa Pisos-Pró. Seu papel é atender clientes de forma profissional, clara e eficiente, ajudando em dúvidas sobre:
- Tipos de pisos (vinílico, laminado, porcelanato, etc.)
- Serviços de instalação e manutenção
- Orçamentos e prazos
- Formas de pagamento
- Promoções e ofertas especiais

## Instruções principais

- Sempre cumprimente o cliente de forma profissional e acolhedora
- Responda de maneira objetiva e técnica, mas mantenha um tom cordial
- Quando não souber uma resposta específica, ofereça conectar o cliente com um especialista
- Colete informações relevantes para orçamento (metragem, tipo de piso desejado, localização)

## Serviços oferecidos:
- Instalação de piso vinílico
- Instalação de piso laminado
- Instalação de porcelanato
- Restauração e manutenção de pisos
- Impermeabilização
- Nivelamento de contrapiso

## Horários de atendimento:
Segunda a Sexta: 08:00 - 18:00
Sábado: 08:00 - 12:00
Domingo: Fechado

## Exemplo de início de conversa:
👋 Olá! Bem-vindo à Pisos-Pró, especialistas em pisos e revestimentos. Como posso ajudar você hoje?

- Deseja conhecer nossos tipos de pisos?
- Precisa de um orçamento?
- Tem dúvidas sobre instalação ou manutenção?`

export function WhatsAppAdminTabs() {
  const [activeTab, setActiveTab] = useState('conversations')
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [instructions, setInstructions] = useState<AiInstructions | null>(null)
  const [prompt, setPrompt] = useState(defaultPrompt)
  const [aiInstructionsContent, setAiInstructionsContent] = useState('')
  const [isSavingAiContent, setIsSavingAiContent] = useState(false)
  const [aiSetup, setAiSetup] = useState<AiSetup | null>(null)
  const [evolutionApiUrl, setEvolutionApiUrl] = useState('')
  const [evolutionApiKey, setEvolutionApiKey] = useState('')
  const [webhookUrl, setWebhookUrl] = useState('')
  const [isSavingSetup, setIsSavingSetup] = useState(false)
  const [whatsappStatus, setWhatsappStatus] = useState<WhatsAppStatus>({
    botEnabled: false,
    connectionStatus: 'disconnected',
    instanceId: null
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [testNumber, setTestNumber] = useState('')
  const [testMessage, setTestMessage] = useState('')

  useEffect(() => {
    loadConversations()
    loadInstructions()
    loadAiInstructionsContent()
    loadAiSetup()
    checkWhatsAppStatus()
  }, [])

  const loadConversations = async () => {
    try {
      const response = await fetch('/api/admin/whatsapp/conversations')
      if (response.ok) {
        const data = await response.json()
        setConversations(data)
      }
    } catch (error) {
      console.error('Error loading conversations:', error)
    }
  }

  const loadInstructions = async () => {
    try {
      const response = await fetch('/api/admin/ai-instructions')
      if (response.ok) {
        const data = await response.json()
        setInstructions(data)
        setPrompt(data.prompt)
        // Also set the AI instructions content if it exists in database
        if (data.prompt) {
          setAiInstructionsContent(data.prompt)
        } else {
          // If no database content, load from file as fallback
          loadAiInstructionsContent()
        }
      } else {
        // If no database content, load from file as fallback
        loadAiInstructionsContent()
      }
    } catch (error) {
      console.error('Error loading instructions:', error)
      // If error loading from database, load from file as fallback
      loadAiInstructionsContent()
    } finally {
      setIsLoading(false)
    }
  }

  const loadAiInstructionsContent = async () => {
    try {
      // Load from file (used for restoration or fallback)
      const fileResponse = await fetch('/api/ai-instructions-content')
      if (fileResponse.ok) {
        const fileData = await fileResponse.json()
        setAiInstructionsContent(fileData.content)
      }
    } catch (error) {
      console.error('Error loading AI instructions content from file:', error)
    }
  }

  const loadAiSetup = async () => {
    try {
      const response = await fetch('/api/admin/ai-setup')
      if (response.ok) {
        const data = await response.json()
        setAiSetup(data)
        setEvolutionApiUrl(data.evolutionApiUrl || '')
        setEvolutionApiKey(data.evolutionApiKey || '')
        setWebhookUrl(data.webhookUrl || '')
      }
    } catch (error) {
      console.error('Error loading AI setup:', error)
    }
  }

  const checkWhatsAppStatus = async () => {
    try {
      const response = await fetch('/api/admin/whatsapp/status')
      if (response.ok) {
        const data = await response.json()
        setWhatsappStatus(data)
      }
    } catch (error) {
      console.error('Error checking WhatsApp status:', error)
    }
  }

  const saveInstructions = async () => {
    setIsSaving(true)
    try {
      const response = await fetch('/api/admin/ai-instructions', {
        method: instructions?.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      })
      
      if (response.ok) {
        const data = await response.json()
        setInstructions(data)
        alert('Instruções salvas com sucesso!')
      }
    } catch (error) {
      console.error('Error saving instructions:', error)
      alert('Erro ao salvar instruções')
    } finally {
      setIsSaving(false)
    }
  }

  const saveAiInstructionsContent = async () => {
    setIsSavingAiContent(true)
    try {
      const response = await fetch('/api/admin/ai-instructions', {
        method: instructions?.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiInstructionsContent })
      })
      
      if (response.ok) {
        const data = await response.json()
        setInstructions(data)
        // Also update the prompt state to keep both tabs in sync
        setPrompt(aiInstructionsContent)
        alert('Instruções do Assistente IA salvas com sucesso no banco de dados!')
      } else {
        const errorData = await response.json()
        alert(`Erro ao salvar: ${errorData.error || 'Erro desconhecido'}`)
      }
    } catch (error) {
      console.error('Error saving AI instructions content:', error)
      alert('Erro ao salvar instruções do assistente IA')
    } finally {
      setIsSavingAiContent(false)
    }
  }

  const saveAiSetup = async () => {
    setIsSavingSetup(true)
    try {
      const response = await fetch('/api/admin/ai-setup', {
        method: aiSetup?.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          evolutionApiUrl,
          evolutionApiKey,
          webhookUrl
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        setAiSetup(data)
        alert('Configurações do WhatsApp salvas com sucesso!')
      } else {
        const errorData = await response.json()
        alert(`Erro ao salvar: ${errorData.error || 'Erro desconhecido'}`)
      }
    } catch (error) {
      console.error('Error saving AI setup:', error)
      alert('Erro ao salvar configurações do WhatsApp')
    } finally {
      setIsSavingSetup(false)
    }
  }

  const enableWhatsApp = async () => {
    setIsConnecting(true)
    try {
      const response = await fetch('/api/admin/whatsapp/enable', {
        method: 'POST'
      })
      
      if (response.ok) {
        const data = await response.json()
        setWhatsappStatus(data)
        if (data.qrcode) {
          // QR code will be displayed in the UI
        }
      }
    } catch (error) {
      console.error('Error enabling WhatsApp:', error)
      alert('Erro ao habilitar WhatsApp')
    } finally {
      setIsConnecting(false)
    }
  }

  const disableWhatsApp = async () => {
    if (!confirm('Tem certeza que deseja desconectar o WhatsApp?')) return
    
    try {
      const response = await fetch('/api/admin/whatsapp/disable', {
        method: 'POST'
      })
      
      if (response.ok) {
        setWhatsappStatus({
          botEnabled: false,
          connectionStatus: 'disconnected',
          instanceId: null
        })
      }
    } catch (error) {
      console.error('Error disabling WhatsApp:', error)
      alert('Erro ao desabilitar WhatsApp')
    }
  }

  const sendTestMessage = async () => {
    if (!testNumber || !testMessage) {
      alert('Por favor, preencha o número e a mensagem')
      return
    }

    try {
      const response = await fetch('/api/admin/whatsapp/test-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: testNumber,
          message: testMessage
        })
      })
      
      if (response.ok) {
        alert('Mensagem de teste enviada!')
        setTestNumber('')
        setTestMessage('')
      } else {
        alert('Erro ao enviar mensagem de teste')
      }
    } catch (error) {
      console.error('Error sending test message:', error)
      alert('Erro ao enviar mensagem')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 text-green-800'
      case 'connecting':
        return 'bg-yellow-100 text-yellow-800'
      case 'disconnected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4" />
      case 'connecting':
        return <RefreshCw className="h-4 w-4 animate-spin" />
      case 'disconnected':
        return <XCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* WhatsApp Connection Control */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              {getStatusIcon(whatsappStatus.connectionStatus)}
              <div>
                <p className="font-medium">Status da Conexão WhatsApp</p>
                <Badge className={getStatusColor(whatsappStatus.connectionStatus)}>
                  {whatsappStatus.connectionStatus === 'connected' ? 'Conectado' :
                   whatsappStatus.connectionStatus === 'connecting' ? 'Conectando...' : 'Desconectado'}
                </Badge>
              </div>
            </div>
            <div className="space-x-2">
              {!whatsappStatus.botEnabled ? (
                <Button onClick={enableWhatsApp} disabled={isConnecting}>
                  {isConnecting ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Conectando...
                    </>
                  ) : (
                    <>
                      <Wifi className="h-4 w-4 mr-2" />
                      Conectar WhatsApp
                    </>
                  )}
                </Button>
              ) : (
                <>
                  <Button variant="outline" onClick={checkWhatsAppStatus}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Atualizar Status
                  </Button>
                  <Button variant="destructive" onClick={disableWhatsApp}>
                    <WifiOff className="h-4 w-4 mr-2" />
                    Desconectar
                  </Button>
                </>
              )}
            </div>
          </div>

          {whatsappStatus.qrcode && whatsappStatus.connectionStatus !== 'connected' && (
            <div className="mt-4 p-6 border rounded-lg bg-gray-50">
              <h3 className="font-medium mb-4 text-center">
                <QrCode className="h-5 w-5 inline mr-2" />
                Escaneie o QR Code com seu WhatsApp
              </h3>
              <div className="flex justify-center">
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <img 
                    src={whatsappStatus.qrcode} 
                    alt="QR Code" 
                    className="max-w-xs w-64 h-64 object-contain" 
                    onError={(e) => {
                      console.error('QR Code image failed to load:', whatsappStatus.qrcode?.substring(0, 100))
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600 text-center mt-4">
                1. Abra o WhatsApp no seu celular<br />
                2. Toque em Menu ou Configurações e selecione &ldquo;Dispositivos conectados&rdquo;<br />
                3. Toque em &ldquo;Conectar dispositivo&rdquo;<br />
                4. Aponte seu telefone para esta tela para capturar o código
              </p>
            </div>
          )}

          {whatsappStatus.instanceId && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Instance ID:</strong> {whatsappStatus.instanceId}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="conversations" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Conversas
          </TabsTrigger>
          {/* <TabsTrigger value="ai-instructions" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            IA Config
          </TabsTrigger> */}
          <TabsTrigger value="ai-instructions-file" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Instruções IA
          </TabsTrigger>
          {/* <TabsTrigger value="test" className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            Testar
          </TabsTrigger> */}
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Configurações
          </TabsTrigger>
        </TabsList>

      <TabsContent value="conversations">
        <Card>
          <CardHeader>
            <CardTitle>Conversas WhatsApp</CardTitle>
            <CardDescription>
              Histórico de conversas do chatbot
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversations.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Nenhuma conversa encontrada</p>
              ) : (
                conversations.map((conversation) => {
                  const lastMessage = conversation.messages[0]
                  const statusColors = {
                    ACTIVE: 'bg-green-100 text-green-800',
                    COMPLETED: 'bg-blue-100 text-blue-800',
                    HANDED_OFF: 'bg-yellow-100 text-yellow-800'
                  }

                  return (
                    <div key={conversation.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                            <span className="text-white font-medium text-sm">
                              {conversation.customerName?.charAt(0) || '?'}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">
                              {conversation.customerName || 'Cliente Anônimo'}
                            </p>
                            <p className="text-sm text-gray-600">{conversation.phoneNumber}</p>
                            {conversation.state && (
                              <p className="text-xs text-gray-500">
                                Estado: {conversation.state.currentStep}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={statusColors[conversation.status as keyof typeof statusColors]}>
                            {conversation.status}
                          </Badge>
                          <p className="text-sm text-gray-500 mt-1">
                            {new Date(conversation.lastMessageAt).toLocaleString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      {lastMessage && (
                        <div className="mt-3 p-3 bg-gray-50 rounded">
                          <p className="text-sm">
                            {lastMessage.direction === 'INBOUND' ? '📩' : '📤'} {lastMessage.content}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>


      {/* <TabsContent value="ai-instructions">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Instruções do Assistente IA</CardTitle>
                <CardDescription>
                  Configure como o assistente deve responder aos clientes
                </CardDescription>
              </div>
              <div className="space-x-2">
                <Button variant="outline" onClick={() => setPrompt(defaultPrompt)}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Restaurar Padrão
                </Button>
                <Button onClick={saveInstructions} disabled={isSaving}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? 'Salvando...' : 'Salvar'}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="editor" className="w-full">
              <TabsList>
                <TabsTrigger value="editor">
                  <Code className="h-4 w-4 mr-2" />
                  Editor
                </TabsTrigger>
                <TabsTrigger value="preview">
                  <Eye className="h-4 w-4 mr-2" />
                  Visualização
                </TabsTrigger>
                <TabsTrigger value="help">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Ajuda
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="editor" className="mt-4">
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Digite as instruções para o assistente IA..."
                  rows={20}
                  className="font-mono text-sm"
                />
              </TabsContent>
              
              <TabsContent value="preview" className="mt-4">
                <div className="prose prose-sm max-w-none bg-gray-50 p-4 rounded-lg">
                  <pre className="whitespace-pre-wrap font-mono text-xs">{prompt}</pre>
                </div>
              </TabsContent>
              
              <TabsContent value="help" className="mt-4">
                <div className="space-y-4">
                  <Alert>
                    <HelpCircle className="h-4 w-4" />
                    <AlertDescription>
                      Use Markdown para formatar as instruções. O assistente usará essas instruções
                      para responder aos clientes de forma consistente.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Dicas de formatação:</h4>
                    <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                      <li>Use # para títulos</li>
                      <li>Use ## para subtítulos</li>
                      <li>Use - para listas</li>
                      <li>Use **texto** para negrito</li>
                      <li>Use *texto* para itálico</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </TabsContent> */}

      <TabsContent value="ai-instructions-file">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Instruções do Assistente IA</CardTitle>
                <CardDescription>
                  Conteúdo completo das instruções do assistente virtual da Pisos-Pró
                </CardDescription>
              </div>
              <div className="space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => loadAiInstructionsContent()}
                  disabled={isSavingAiContent}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Restaurar
                </Button>
                <Button 
                  onClick={saveAiInstructionsContent} 
                  disabled={isSavingAiContent}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSavingAiContent ? 'Salvando...' : 'Salvar'}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={aiInstructionsContent}
              onChange={(e) => setAiInstructionsContent(e.target.value)}
              rows={25}
              className="font-mono text-sm"
              placeholder="Digite as instruções para o assistente IA..."
            />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="test">
        <Card>
          <CardHeader>
            <CardTitle>Testar Mensagem</CardTitle>
            <CardDescription>
              Envie uma mensagem de teste para validar a configuração
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {whatsappStatus.connectionStatus !== 'connected' ? (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  O WhatsApp precisa estar conectado para enviar mensagens de teste.
                </AlertDescription>
              </Alert>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Número do WhatsApp (com código do país)
                  </label>
                  <Input
                    placeholder="5511999999999"
                    value={testNumber}
                    onChange={(e) => setTestNumber(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Mensagem
                  </label>
                  <Textarea
                    placeholder="Digite sua mensagem de teste..."
                    value={testMessage}
                    onChange={(e) => setTestMessage(e.target.value)}
                    rows={4}
                  />
                </div>
                
                <Button onClick={sendTestMessage} className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Mensagem de Teste
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Configurações do WhatsApp</CardTitle>
                <CardDescription>
                  Configure Evolution API e webhook para WhatsApp
                </CardDescription>
              </div>
              <Button 
                onClick={saveAiSetup} 
                disabled={isSavingSetup}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSavingSetup ? 'Salvando...' : 'Salvar Configurações'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Evolution API Configuration */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Evolution API</h3>
              
              <div>
                <label htmlFor="evolutionApiUrl" className="block text-sm font-medium mb-2">
                  URL da Evolution API *
                </label>
                <Input
                  id="evolutionApiUrl"
                  value={evolutionApiUrl}
                  onChange={(e) => setEvolutionApiUrl(e.target.value)}
                  placeholder="https://evo.pegue.app"
                  disabled={isSavingSetup}
                />
              </div>
              
              <div>
                <label htmlFor="evolutionApiKey" className="block text-sm font-medium mb-2">
                  Chave da Evolution API *
                </label>
                <Input
                  id="evolutionApiKey"
                  type="password"
                  value={evolutionApiKey}
                  onChange={(e) => setEvolutionApiKey(e.target.value)}
                  placeholder="Sua chave da Evolution API"
                  disabled={isSavingSetup}
                />
              </div>
            </div>

            <Separator />

            {/* Webhook Configuration */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Webhook</h3>
              
              <div>
                <label htmlFor="webhookUrl" className="block text-sm font-medium mb-2">
                  URL do Webhook
                </label>
                <Input
                  id="webhookUrl"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://n8n.ebrecho.com/webhook-test/..."
                  disabled={isSavingSetup}
                />
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">URL do Webhook Local</h4>
                <code className="text-sm text-blue-800 bg-white px-2 py-1 rounded">
                  {process.env.NEXT_PUBLIC_APP_URL || window.location.origin}/api/whatsapp/webhook
                </code>
              </div>
            </div>

            <Separator />

            {/* Configuration Status */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Status da Configuração</h3>
              
              {aiSetup ? (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-900">
                      Configuração salva no banco de dados
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-green-800">
                    Última atualização: {aiSetup.updatedAt ? new Date(aiSetup.updatedAt).toLocaleString('pt-BR') : 'N/A'}
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                    <span className="text-sm font-medium text-yellow-900">
                      Nenhuma configuração encontrada
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-yellow-800">
                    Configure e salve a Evolution API para começar
                  </div>
                </div>
              )}
            </div>
            
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                As configurações são salvas no banco de dados e aplicadas automaticamente ao bot do WhatsApp.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </TabsContent>
      </Tabs>
    </div>
  )
}