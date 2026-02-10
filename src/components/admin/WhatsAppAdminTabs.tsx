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
  BookOpen,
  Clock
} from 'lucide-react'
import {
  AdminCard
} from '@/components/admin'

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

const defaultPrompt = `# Instruções do Assistente Virtual - JR Câmbio Automático

## Função
Você é um assistente virtual especializado em câmbio automático da empresa JR Câmbio Automático. Seu papel é atender clientes de forma profissional, clara e eficiente, ajudando em dúvidas sobre:
- Diagnóstico de problemas no câmbio automático
- Serviços de reparo e manutenção
- Orçamentos e prazos
- Formas de pagamento
- Garantia dos serviços

## Instruções principais

- Sempre cumprimente o cliente de forma profissional e acolhedora
- Responda de maneira objetiva e técnica, mas mantenha um tom cordial
- Quando não souber uma resposta específica, ofereça conectar o cliente com um especialista
- Colete informações relevantes para diagnóstico (modelo do veículo, ano, sintomas do problema)

## Serviços oferecidos:
- Diagnóstico computadorizado (GRATUITO)
- Conserto de câmbio automático
- Retífica completa do câmbio
- Troca de óleo ATF
- Revisão preventiva
- Troca de componentes (solenoides, conversores, etc.)

## Horários de atendimento:
Segunda a Sexta: 08:00 - 18:00
Sábado: 09:00 - 14:00
Domingo: Fechado

## Exemplo de início de conversa:
👋 Olá! Bem-vindo à JR Câmbio Automático, especialistas em transmissão automática. Como posso ajudar você hoje?

- Deseja agendar um diagnóstico gratuito?
- Precisa de um orçamento de reparo?
- Tem dúvidas sobre nossos serviços?`

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
        if (data.prompt) {
          setAiInstructionsContent(data.prompt)
        } else {
          loadAiInstructionsContent()
        }
      } else {
        loadAiInstructionsContent()
      }
    } catch (error) {
      console.error('Error loading instructions:', error)
      loadAiInstructionsContent()
    } finally {
      setIsLoading(false)
    }
  }

  const loadAiInstructionsContent = async () => {
    try {
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
        setPrompt(aiInstructionsContent)
        alert('Instruções salvas com sucesso!')
      } else {
        const errorData = await response.json()
        alert(`Erro ao salvar: ${errorData.error || 'Erro desconhecido'}`)
      }
    } catch (error) {
      console.error('Error saving AI instructions content:', error)
      alert('Erro ao salvar instruções')
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
        alert('Configurações salvas com sucesso!')
      } else {
        const errorData = await response.json()
        alert(`Erro ao salvar: ${errorData.error || 'Erro desconhecido'}`)
      }
    } catch (error) {
      console.error('Error saving AI setup:', error)
      alert('Erro ao salvar configurações')
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
        alert('Mensagem enviada com sucesso!')
        setTestNumber('')
        setTestMessage('')
      }
    } catch (error) {
      console.error('Error sending test message:', error)
      alert('Erro ao enviar mensagem')
    }
  }

  const getStatusUi = () => {
    switch (whatsappStatus.connectionStatus) {
      case 'connected':
        return {
          color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
          icon: <CheckCircle className="h-5 w-5 text-emerald-400" />,
          label: 'Conectado'
        }
      case 'connecting':
        return {
          color: 'text-accent-400 bg-accent-500/10 border-accent-500/20',
          icon: <RefreshCw className="h-5 w-5 text-accent-400 animate-spin" />,
          label: 'Conectando...'
        }
      default:
        return {
          color: 'text-red-400 bg-red-500/10 border-red-500/20',
          icon: <XCircle className="h-5 w-5 text-red-400" />,
          label: 'Desconectado'
        }
    }
  }

  const status = getStatusUi()

  return (
    <div className="space-y-6">
      {/* WhatsApp Connection Control */}
      <AdminCard className="overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${status.color.split(' ')[1]}`}>
              {status.icon}
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-none">WhatsApp Bot</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className={`${status.color} border-none font-medium px-2 py-0`}>
                  {status.label}
                </Badge>
                {whatsappStatus.instanceId && (
                  <span className="text-[10px] text-steel-500 font-mono uppercase tracking-widest">
                    ID: {whatsappStatus.instanceId}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {!whatsappStatus.botEnabled ? (
              <Button onClick={enableWhatsApp} disabled={isConnecting} className="bg-accent-500 hover:bg-accent-600">
                <Wifi className="h-4 w-4 mr-2" />
                {isConnecting ? 'Conectando...' : 'Conectar Agora'}
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={checkWhatsAppStatus} className="border-steel-700 text-steel-300 hover:bg-steel-800">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Atualizar
                </Button>
                <Button variant="ghost" onClick={disableWhatsApp} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                  <WifiOff className="h-4 w-4 mr-2" />
                  Desconectar
                </Button>
              </>
            )}
          </div>
        </div>

        {whatsappStatus.qrcode && whatsappStatus.connectionStatus !== 'connected' && (
          <div className="mt-8 p-8 bg-steel-900/50 rounded-xl border border-steel-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="flex flex-col items-center">
                <div className="p-4 bg-white rounded-2xl shadow-2xl shadow-accent-500/10">
                  <img
                    src={whatsappStatus.qrcode}
                    alt="QR Code"
                    className="w-64 h-64 object-contain"
                  />
                </div>
                <div className="flex items-center gap-2 mt-6 text-accent-400">
                  <QrCode className="h-5 w-5" />
                  <span className="font-medium">Escaneie para conectar</span>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-white font-bold text-lg">Como conectar:</h4>
                <ol className="space-y-3 text-steel-400 text-sm">
                  <li className="flex gap-3">
                    <span className="bg-steel-800 text-steel-200 w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">1</span>
                    Abra o WhatsApp no seu celular
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-steel-800 text-steel-200 w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">2</span>
                    Toque em Menu ou Configurações
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-steel-800 text-steel-200 w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">3</span>
                    Selecione "Dispositivos conectados"
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-steel-800 text-steel-200 w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">4</span>
                    Toque em "Conectar dispositivo" e aponte para o QR Code
                  </li>
                </ol>
                <Alert className="bg-blue-500/10 border-blue-500/20 text-blue-400">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    O QR Code expira em alguns minutos. Se necessário, clique em atualizar.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>
        )}
      </AdminCard>

      {/* Tabs Menu */}
      <div className="flex gap-2 p-1 bg-steel-900/50 rounded-lg w-fit border border-steel-800">
        {[
          { id: 'conversations', name: 'Conversas', icon: <MessageCircle className="h-4 w-4" /> },
          { id: 'ai-instructions-file', name: 'Instruções IA', icon: <Bot className="h-4 w-4" /> },
          { id: 'test', name: 'Testar Mensagem', icon: <Send className="h-4 w-4" /> },
          { id: 'settings', name: 'Configurações', icon: <Settings className="h-4 w-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 py-2 px-6 rounded-md text-sm font-medium transition-all ${activeTab === tab.id
              ? 'bg-steel-800 text-white shadow-sm border border-steel-700'
              : 'text-steel-400 hover:text-white hover:bg-steel-800/50'
              }`}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {activeTab === 'conversations' && (
          <AdminCard title="Log de Atividades" description="Últimas interações via WhatsApp">
            <div className="space-y-4">
              {conversations.length === 0 ? (
                <div className="py-12 text-center">
                  <MessageCircle className="h-12 w-12 text-steel-700 mx-auto mb-4" />
                  <p className="text-steel-500">Nenhuma conversa encontrada no momento</p>
                </div>
              ) : (
                conversations.map((conversation) => {
                  const lastMessage = conversation.messages[0]
                  const statusInfo = {
                    ACTIVE: { color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', label: 'Ativo' },
                    COMPLETED: { color: 'text-blue-400 bg-blue-500/10 border-blue-500/20', label: 'Finalizado' },
                    HANDED_OFF: { color: 'text-purple-400 bg-purple-500/10 border-purple-500/20', label: 'Transf.' }
                  }
                  const s = statusInfo[conversation.status as keyof typeof statusInfo] || { color: 'text-steel-400 bg-steel-800', label: conversation.status }

                  return (
                    <div key={conversation.id} className="group border border-steel-800/50 rounded-xl p-5 hover:bg-steel-800/20 transition-all hover:border-steel-700">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-steel-800 border border-steel-700 flex items-center justify-center text-accent-400 font-bold text-lg group-hover:bg-accent-500/10 transition-colors">
                            {conversation.customerName?.charAt(0).toUpperCase() || '?'}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-white font-bold">{conversation.customerName || 'Visitante'}</p>
                              <Badge variant="outline" className={`${s.color} border-none text-[10px] font-bold h-5 px-1.5`}>
                                {s.label}
                              </Badge>
                            </div>
                            <p className="text-sm text-steel-400 font-mono">{conversation.phoneNumber}</p>
                          </div>
                        </div>
                        <div className="text-left sm:text-right">
                          <div className="flex items-center gap-1.5 text-xs text-steel-500 sm:justify-end">
                            <Clock className="h-3 w-3" />
                            {new Date(conversation.lastMessageAt).toLocaleString('pt-BR')}
                          </div>
                          {conversation.state && (
                            <p className="text-[10px] text-accent-400/70 font-bold uppercase tracking-widest mt-1">
                              Passo: {conversation.state.currentStep}
                            </p>
                          )}
                        </div>
                      </div>
                      {lastMessage && (
                        <div className="mt-4 p-4 bg-steel-900/50 rounded-lg border border-steel-800/50 relative">
                          <div className="absolute top-0 left-4 -translate-y-1/2 w-4 h-4 bg-steel-900/50 border-t border-l border-steel-800/50 rotate-45" />
                          <p className="text-sm text-steel-200">
                            <span className="opacity-50 mr-2">{lastMessage.direction === 'INBOUND' ? '←' : '→'}</span>
                            {lastMessage.content}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })
              )}
            </div>
          </AdminCard>
        )}

        {activeTab === 'ai-instructions-file' && (
          <AdminCard
            title="Personalidade do Assistente"
            description="Configure as diretrizes de comportamento e conhecimento da IA"
          >
            <div className="flex justify-end gap-2 mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => loadAiInstructionsContent()}
                disabled={isSavingAiContent}
                className="border-steel-700 text-steel-300 hover:bg-steel-800"
              >
                <RefreshCw className="h-3 w-3 mr-2" />
                Restaurar
              </Button>
              <Button
                size="sm"
                onClick={saveAiInstructionsContent}
                disabled={isSavingAiContent}
                className="bg-accent-500 hover:bg-accent-600"
              >
                <Save className="h-3 w-3 mr-2" />
                {isSavingAiContent ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            </div>
            <div className="rounded-xl border border-steel-800 overflow-hidden bg-steel-900/30">
              <Textarea
                value={aiInstructionsContent}
                onChange={(e) => setAiInstructionsContent(e.target.value)}
                rows={22}
                className="font-mono text-sm border-none focus-visible:ring-0 bg-transparent text-steel-200 p-6 leading-relaxed custom-scrollbar"
                placeholder="Insira as instruções detalhadas..."
              />
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-steel-500">
              <HelpCircle className="h-4 w-4" />
              Dica: Use Markdown para organizar as informações por tópicos. O assistente prioriza as instruções do topo.
            </div>
          </AdminCard>
        )}

        {activeTab === 'test' && (
          <AdminCard title="Testar Mensagem" description="Envie uma mensagem de teste para validar a configuração">
            <div className="space-y-6 max-w-2xl">
              {whatsappStatus.connectionStatus !== 'connected' ? (
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg flex items-center gap-3 text-red-400">
                  <AlertCircle className="h-5 w-5" />
                  <p className="text-sm font-medium">O WhatsApp precisa estar conectado para enviar mensagens.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-steel-500 uppercase tracking-wider block">
                      Número do Destinatário
                    </label>
                    <Input
                      placeholder="5511999999999"
                      value={testNumber}
                      onChange={(e) => setTestNumber(e.target.value)}
                      className="bg-steel-800 border-steel-700 text-white focus:border-accent-500"
                    />
                    <p className="text-[10px] text-steel-500">Inclua código do país e DDD (Ex: 5511999999999)</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-steel-500 uppercase tracking-wider block">
                      Mensagem de Texto
                    </label>
                    <Textarea
                      placeholder="Digite sua mensagem aqui..."
                      value={testMessage}
                      onChange={(e) => setTestMessage(e.target.value)}
                      rows={5}
                      className="bg-steel-800 border-steel-700 text-white focus:border-accent-500"
                    />
                  </div>

                  <Button onClick={sendTestMessage} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold">
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Mensagem de Teste
                  </Button>
                </>
              )}
            </div>
          </AdminCard>
        )}

        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AdminCard title="Infraestrutura Evolution">
              <div className="space-y-6">
                <div>
                  <label htmlFor="evolutionApiUrl" className="text-xs font-bold text-steel-500 uppercase tracking-wider mb-2 block">
                    Endpoint API
                  </label>
                  <Input
                    id="evolutionApiUrl"
                    value={evolutionApiUrl}
                    onChange={(e) => setEvolutionApiUrl(e.target.value)}
                    placeholder="https://sua-api.com"
                    className="bg-steel-800 border-steel-700 text-white focus:border-accent-500"
                  />
                </div>

                <div>
                  <label htmlFor="evolutionApiKey" className="text-xs font-bold text-steel-500 uppercase tracking-wider mb-2 block">
                    API Key (Security Token)
                  </label>
                  <Input
                    id="evolutionApiKey"
                    type="password"
                    value={evolutionApiKey}
                    onChange={(e) => setEvolutionApiKey(e.target.value)}
                    placeholder="••••••••••••••••"
                    className="bg-steel-800 border-steel-700 text-white focus:border-accent-500 font-mono"
                  />
                </div>

                <div>
                  <label htmlFor="webhookUrl" className="text-xs font-bold text-steel-500 uppercase tracking-wider mb-2 block">
                    Webhook URL (Opcional)
                  </label>
                  <Input
                    id="webhookUrl"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    placeholder="https://seu-webhook.com"
                    className="bg-steel-800 border-steel-700 text-white focus:border-accent-500 font-mono"
                  />
                </div>

                <Button
                  onClick={saveAiSetup}
                  disabled={isSavingSetup}
                  className="w-full bg-accent-500 hover:bg-accent-600"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSavingSetup ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </div>
            </AdminCard>

            <AdminCard title="Ajuda & Diagnostic">
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-steel-900/50 border border-steel-800">
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <Wifi className="h-4 w-4 text-emerald-400" />
                    Validação de Conexão
                  </h4>
                  <p className="text-xs text-steel-400 leading-relaxed">
                    Certifique-se de que a API Evolution está acessível a partir deste servidor.
                    O chatbot utiliza webhooks para receber mensagens em tempo real.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-steel-900/50 border border-steel-800">
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-accent-400" />
                    Problemas Comuns
                  </h4>
                  <ul className="text-xs text-steel-400 space-y-2 list-disc list-inside">
                    <li>Sessão do WhatsApp expirada no celular</li>
                    <li>Chave de API incorreta ou permissões negadas</li>
                    <li>Servidor da API Evolution fora do ar</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <h4 className="text-sm font-bold text-blue-400 mb-2 font-mono">Status da Configuração</h4>
                  {aiSetup ? (
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-emerald-400">
                        <CheckCircle className="h-3 w-3 mr-2" />
                        Ativa e salva no banco
                      </div>
                      <p className="text-[10px] text-steel-500">
                        Atualizado em: {aiSetup.updatedAt ? new Date(aiSetup.updatedAt).toLocaleString('pt-BR') : 'N/A'}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center text-xs text-amber-400">
                      <AlertCircle className="h-3 w-3 mr-2" />
                      Não configurado
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <h4 className="text-sm font-bold text-blue-400 mb-2">Endpoint de Webhook Local</h4>
                  <code className="text-[10px] text-blue-300 block bg-black/30 p-2 rounded break-all">
                    {process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/whatsapp/webhook
                  </code>
                </div>
              </div>
            </AdminCard>
          </div>
        )}
      </div>
    </div>
  )
}