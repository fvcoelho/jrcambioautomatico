'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ChevronLeft,
  MapPin,
  Laptop,
  Clock,
  Layout,
  MousePointer2,
  Activity as ActivityIcon,
  Monitor,
  Globe,
  Terminal,
  RefreshCw
} from 'lucide-react'

import {
  AdminPageWrapper,
  AdminHeader,
  AdminStatCard,
  AdminCard
} from '@/components/admin'

interface SessionDetail {
  id: string
  sessionId: string
  ipAddress?: string
  userAgent?: string
  referrer?: string
  landingPage?: string
  headers?: Record<string, string>
  country?: string
  city?: string
  region?: string
  language?: string
  device?: string
  browser?: string
  os?: string
  screenResolution?: string
  viewport?: string
  colorDepth?: number
  timezone?: string
  createdAt: string
  updatedAt: string
  pageViews: Array<{
    id: string
    page: string
    title?: string
    timeSpent?: number
    createdAt: string
  }>
  activities: Array<{
    id: string
    page: string
    elementId?: string
    elementText?: string
    elementType?: string
    createdAt: string
  }>
}

export default function SessionDetailPage() {
  const params = useParams()
  const [session, setSession] = useState<SessionDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'technical'>('overview')

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch(`/api/analytics/session/${params.id}`)
        if (!response.ok) throw new Error('Failed to fetch session')
        const data = await response.json()
        setSession(data)
      } catch (error) {
        console.error('Error fetching session:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSession()
  }, [params.id])

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR')
  }

  const formatDuration = (start: string, end: string) => {
    const duration = new Date(end).getTime() - new Date(start).getTime()
    const minutes = Math.floor(duration / 60000)
    const seconds = Math.floor((duration % 60000) / 1000)
    return `${minutes}m ${seconds}s`
  }

  if (loading) {
    return (
      <AdminPageWrapper>
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="h-8 w-8 animate-spin text-accent-400" />
          <span className="ml-3 text-lg text-steel-400">Carregando detalhes da sessão...</span>
        </div>
      </AdminPageWrapper>
    )
  }

  if (!session) {
    return (
      <AdminPageWrapper>
        <AdminCard className="p-12 text-center">
          <p className="text-steel-400 mb-6">Sessão não encontrada</p>
          <Link href="/admin/analytics">
            <Button className="bg-accent-500 hover:bg-accent-600">
              Voltar ao Dashboard
            </Button>
          </Link>
        </AdminCard>
      </AdminPageWrapper>
    )
  }

  return (
    <AdminPageWrapper>
      <AdminHeader
        title="Detalhes da Sessão"
        description={`ID: ${session.sessionId}`}
        actions={
          <Link href="/admin/analytics">
            <Button variant="outline" className="border-steel-700 text-steel-300 hover:bg-steel-800">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Voltar
            </Button>
          </Link>
        }
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <AdminStatCard
          label="Dispositivo"
          value={session.device || 'Desktop'}
          subValue={session.browser}
          subLabel={session.os}
          icon={<Laptop className="h-5 w-5 text-accent-400" />}
          iconClassName="bg-accent-500/20"
        />
        <AdminStatCard
          label="Localização"
          value={session.city || session.country || 'Desconhecido'}
          subValue={session.ipAddress}
          icon={<MapPin className="h-5 w-5 text-emerald-400" />}
          iconClassName="bg-emerald-500/20"
        />
        <AdminStatCard
          label="Atividade"
          value={`${session.pageViews.length} Páginas`}
          subValue={session.activities.length}
          subLabel="cliques"
          icon={<ActivityIcon className="h-5 w-5 text-blue-400" />}
          iconClassName="bg-blue-500/20"
        />
        <AdminStatCard
          label="Duração Total"
          value={formatDuration(session.createdAt, session.updatedAt)}
          subValue={formatTime(session.createdAt).split(' ')[1]}
          subLabel="início"
          icon={<Clock className="h-5 w-5 text-purple-400" />}
          iconClassName="bg-purple-500/20"
        />
      </div>

      {/* Tabs Menu */}
      <div className="flex gap-2 mb-6 p-1 bg-steel-900/50 rounded-lg w-fit border border-steel-800">
        {[
          { id: 'overview', name: 'Visão Geral', icon: <Globe className="h-4 w-4" /> },
          { id: 'timeline', name: 'Timeline', icon: <ActivityIcon className="h-4 w-4" /> },
          { id: 'technical', name: 'Dados Técnicos', icon: <Terminal className="h-4 w-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${activeTab === tab.id
              ? 'bg-steel-800 text-white shadow-sm border border-steel-700'
              : 'text-steel-400 hover:text-white hover:bg-steel-800/50'
              }`}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AdminCard title="Informações da Sessão">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              <div className="group">
                <dt className="text-xs font-medium text-steel-500 uppercase tracking-wider mb-1">IP Address</dt>
                <dd className="text-sm text-steel-200 font-mono">{session.ipAddress || 'Unknown'}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-steel-500 uppercase tracking-wider mb-1">Idioma / Região</dt>
                <dd className="text-sm text-steel-200">{session.language} / {session.timezone}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-medium text-steel-500 uppercase tracking-wider mb-1">Referrer (Origem)</dt>
                <dd className="text-sm text-steel-200">{session.referrer || 'Acesso Direto'}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-medium text-steel-500 uppercase tracking-wider mb-1">Landing Page (Entrada)</dt>
                <dd className="text-sm text-accent-400">{session.landingPage || '/'}</dd>
              </div>
            </dl>
          </AdminCard>

          <AdminCard title="Engagement">
            <h3 className="text-sm font-medium text-steel-400 mb-4">Ranking de Visitas</h3>
            <div className="space-y-4">
              {Object.entries(
                session.pageViews.reduce((acc, pv) => {
                  acc[pv.page] = (acc[pv.page] || 0) + 1
                  return acc
                }, {} as Record<string, number>)
              )
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([page, count]) => (
                  <div key={page} className="flex items-center justify-between p-2 rounded-lg bg-steel-900/30 border border-steel-800/50">
                    <span className="text-sm text-steel-300 font-medium">{page}</span>
                    <Badge variant="outline" className="bg-accent-500/10 border-accent-500/20 text-accent-400 font-bold">
                      {count}x
                    </Badge>
                  </div>
                ))}
            </div>
          </AdminCard>
        </div>
      )}

      {activeTab === 'timeline' && (
        <AdminCard title="Timeline de Atividades" description="Histórico cronológico de navegação e interações">
          <div className="relative pl-8 border-l border-steel-800 py-2 space-y-10 ml-4 mt-4">
            {[...session.pageViews, ...session.activities]
              .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
              .map((event, idx) => (
                <div key={event.id} className="relative">
                  {/* Dot */}
                  <span className={`absolute -left-10 top-0 h-4 w-4 rounded-full border-2 border-steel-950 ring-4 ring-steel-900 ${'elementId' in event ? 'bg-emerald-500' : 'bg-accent-500'
                    }`} />

                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {'elementId' in event ? (
                          <Badge variant="outline" className="bg-emerald-500/10 border-emerald-500/20 text-emerald-400 text-[10px]">CLIQUE</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-accent-500/10 border-accent-500/20 text-accent-400 text-[10px]">VISITA</Badge>
                        )}
                        <span className="text-xs text-steel-500">{formatTime(event.createdAt)}</span>
                      </div>

                      <p className="text-sm text-white font-medium mb-1">
                        {'elementId' in event ? (
                          <>Interação com "{event.elementText || event.elementId || 'elemento'}"</>
                        ) : (
                          <>Visitou: {('title' in event ? event.title : null) || event.page}</>
                        )}
                      </p>

                      <div className="flex items-center gap-3 text-xs text-steel-500">
                        <span className="font-mono">{event.page}</span>
                        {'timeSpent' in event && event.timeSpent && (
                          <span className="flex items-center gap-1 text-emerald-500/70">
                            <Clock className="h-3 w-3" />
                            {event.timeSpent}s permanência
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </AdminCard>
      )}

      {activeTab === 'technical' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AdminCard title="Ambiente do Usuário">
            <div className="space-y-6">
              <div>
                <dt className="text-xs font-medium text-steel-500 uppercase tracking-wider mb-2">User Agent String</dt>
                <dd className="text-sm text-steel-300 font-mono bg-steel-900/50 p-3 rounded-lg border border-steel-800 break-all leading-relaxed">
                  {session.userAgent || 'N/A'}
                </dd>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <dt className="text-xs font-medium text-steel-500 uppercase tracking-wider mb-1">Resolução</dt>
                  <dd className="text-sm text-steel-200">{session.screenResolution}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-steel-500 uppercase tracking-wider mb-1">Viewport</dt>
                  <dd className="text-sm text-steel-200">{session.viewport}</dd>
                </div>
              </div>
            </div>
          </AdminCard>

          <AdminCard title="Headers da Requisição">
            <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {session.headers ? (
                <dl className="space-y-4">
                  {Object.entries(session.headers)
                    .filter(([key]) => !key.toLowerCase().includes('cookie'))
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([key, value]) => (
                      <div key={key} className="border-b border-steel-800 pb-2">
                        <dt className="text-xs font-medium text-accent-400/70 font-mono mb-1">{key}</dt>
                        <dd className="text-xs text-steel-400 font-mono break-all">{value}</dd>
                      </div>
                    ))}
                </dl>
              ) : (
                <p className="text-sm text-steel-600 text-center py-8 italic">Sem detalhes de headers disponíveis</p>
              )}
            </div>
          </AdminCard>
        </div>
      )}
    </AdminPageWrapper>
  )
}