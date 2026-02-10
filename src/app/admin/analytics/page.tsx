'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  BarChart3,
  MousePointer2,
  Users,
  RefreshCw,
  Layout,
  ExternalLink,
  Clock,
  ArrowRight,
  TrendingUp,
  Activity as ActivityIcon
} from 'lucide-react'

import {
  AdminPageWrapper,
  AdminHeader,
  AdminStatCard,
  AdminCard
} from '@/components/admin'

interface Activity {
  id: string
  page: string
  elementId?: string
  elementText?: string
  elementType?: string
  createdAt: string
  session: {
    sessionId: string
    ipAddress?: string
    userAgent?: string
    referrer?: string
  }
}

interface PageView {
  id: string
  page: string
  title?: string
  timeSpent?: number
  createdAt: string
  session: {
    sessionId: string
    ipAddress?: string
    userAgent?: string
    referrer?: string
  }
}

interface AnalyticsData {
  activities: Activity[]
  pageViews: PageView[]
  stats: {
    totalClicks: number
    totalPageViews: number
    uniqueSessions: number
    mostClickedElements: Array<{ elementText: string; _count: number }>
    mostVisitedPages: Array<{ page: string; _count: number }>
  }
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'clicks' | 'pages'>('overview')
  const [limit, setLimit] = useState(100)
  const [orderBy, setOrderBy] = useState('createdAt')
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('desc')

  const fetchData = async () => {
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        orderBy,
        orderDirection
      })
      const response = await fetch(`/api/analytics/recent?${params}`)
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [limit, orderBy, orderDirection])

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR')
  }

  const getDeviceType = (userAgent?: string) => {
    if (!userAgent) return 'Desconhecido'
    if (userAgent.includes('Mobile')) return 'Celular'
    if (userAgent.includes('Tablet')) return 'Tablet'
    return 'Desktop'
  }

  if (loading) {
    return (
      <AdminPageWrapper>
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="h-8 w-8 animate-spin text-accent-400" />
          <span className="ml-3 text-lg text-steel-400">Carregando analytics...</span>
        </div>
      </AdminPageWrapper>
    )
  }

  if (!data) {
    return (
      <AdminPageWrapper>
        <AdminCard className="p-12 text-center">
          <p className="text-steel-400 mb-6">Erro ao carregar dados de analytics</p>
          <Button onClick={fetchData} className="bg-accent-500 hover:bg-accent-600">
            Tentar Novamente
          </Button>
        </AdminCard>
      </AdminPageWrapper>
    )
  }

  return (
    <AdminPageWrapper>
      <AdminHeader
        title="Analytics Dashboard"
        description="Acompanhamento de atividade do site em tempo real"
        actions={
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/analytics/sessions">
              <Button variant="outline" className="border-steel-700 text-steel-300 hover:bg-steel-800">
                <Users className="h-4 w-4 mr-2" />
                Sessões
              </Button>
            </Link>
            <Button onClick={fetchData} className="bg-accent-500 hover:bg-accent-600 text-white">
              <RefreshCw className="h-4 w-4 mr-2" />
              Atualizar
            </Button>
          </div>
        }
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <AdminStatCard
          label="Visualizações"
          value={data.stats.totalPageViews}
          icon={<Layout className="h-5 w-5 text-accent-400" />}
          iconClassName="bg-accent-500/20"
        />
        <AdminStatCard
          label="Cliques"
          value={data.stats.totalClicks}
          icon={<MousePointer2 className="h-5 w-5 text-emerald-400" />}
          iconClassName="bg-emerald-500/20"
        />
        <AdminStatCard
          label="Sessões Únicas"
          value={data.stats.uniqueSessions}
          icon={<Users className="h-5 w-5 text-blue-400" />}
          iconClassName="bg-blue-500/20"
        />
        <AdminStatCard
          label="Taxa de Conversão"
          value={`${data.stats.totalPageViews > 0 ?
            Math.round((data.stats.totalClicks / data.stats.totalPageViews) * 100) : 0}%`}
          icon={<TrendingUp className="h-5 w-5 text-purple-400" />}
          iconClassName="bg-purple-500/20"
        />
      </div>

      {/* Controls & Filter */}
      <AdminCard className="mb-8 p-4">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-steel-400">Limite:</label>
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="bg-steel-800 border border-steel-700 text-white rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-accent-500"
            >
              <option value={50}>50 registros</option>
              <option value={100}>100 registros</option>
              <option value={200}>200 registros</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-steel-400">Ordenar por:</label>
            <select
              value={orderBy}
              onChange={(e) => setOrderBy(e.target.value)}
              className="bg-steel-800 border border-steel-700 text-white rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-accent-500"
            >
              <option value="createdAt">Data</option>
              <option value="page">Página</option>
            </select>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">Monitoramento em Tempo Real</span>
          </div>
        </div>
      </AdminCard>

      {/* Tabs Menu */}
      <div className="flex gap-2 mb-6 p-1 bg-steel-900/50 rounded-lg w-fit border border-steel-800">
        {[
          { id: 'overview', name: 'Visão Geral', icon: <BarChart3 className="h-4 w-4" /> },
          { id: 'clicks', name: 'Cliques Recentes', icon: <MousePointer2 className="h-4 w-4" /> },
          { id: 'pages', name: 'Visualizações', icon: <Layout className="h-4 w-4" /> }
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

      {/* Content Area */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AdminCard title="Elementos Mais Clicados" description="Ranking de interações dos usuários">
            <div className="space-y-4">
              {data.stats.mostClickedElements.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white font-medium truncate max-w-[70%]">
                      {item.elementText || 'Elemento sem texto'}
                    </span>
                    <span className="text-accent-400 font-bold">{item._count}</span>
                  </div>
                  <div className="w-full bg-steel-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-accent-500 h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${(item._count / data.stats.mostClickedElements[0]._count) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </AdminCard>

          <AdminCard title="Páginas Mais Visitadas" description="Tráfego por rota do site">
            <div className="space-y-4">
              {data.stats.mostVisitedPages.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white font-medium truncate max-w-[70%]">
                      {item.page}
                    </span>
                    <span className="text-emerald-400 font-bold">{item._count}</span>
                  </div>
                  <div className="w-full bg-steel-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${(item._count / data.stats.mostVisitedPages[0]._count) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </AdminCard>
        </div>
      )}

      {activeTab === 'clicks' && (
        <AdminCard title="Atividade de Cliques" description={`Últimos ${data.activities.length} cliques registrados`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-steel-700">
                  <th className="text-left py-3 px-4 text-steel-400 font-medium text-sm">Elemento</th>
                  <th className="text-left py-3 px-4 text-steel-400 font-medium text-sm">Origem</th>
                  <th className="text-right py-3 px-4 text-steel-400 font-medium text-sm">Data/Hora</th>
                  <th className="text-center py-3 px-4 text-steel-400 font-medium text-sm">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-steel-800">
                {data.activities.map((activity) => (
                  <tr key={activity.id} className="hover:bg-steel-800/30 transition-colors group">
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="text-white font-medium">
                          {activity.elementText || activity.elementId || 'N/A'}
                        </span>
                        <span className="text-xs text-steel-500 uppercase">{activity.elementType}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-steel-800/50 border-steel-700 text-steel-400 font-normal">
                          {activity.page}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex flex-col">
                        <span className="text-sm text-steel-300">{formatTime(activity.createdAt)}</span>
                        <span className="text-xs text-steel-500">{getDeviceType(activity.session.userAgent)}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Link href={`/admin/analytics/session/${activity.session.sessionId}`}>
                        <Button size="sm" variant="ghost" className="text-accent-400 hover:text-accent-300 hover:bg-accent-500/10 h-8">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AdminCard>
      )}

      {activeTab === 'pages' && (
        <AdminCard title="Visualizações de Página" description={`Últimas ${data.pageViews.length} visitas registradas`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-steel-700">
                  <th className="text-left py-3 px-4 text-steel-400 font-medium text-sm">Título da Página</th>
                  <th className="text-left py-3 px-4 text-steel-400 font-medium text-sm">Permanência</th>
                  <th className="text-right py-3 px-4 text-steel-400 font-medium text-sm">Data/Hora</th>
                  <th className="text-center py-3 px-4 text-steel-400 font-medium text-sm">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-steel-800">
                {data.pageViews.map((pageView) => (
                  <tr key={pageView.id} className="hover:bg-steel-800/30 transition-colors group">
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="text-white font-medium line-clamp-1">
                          {pageView.title || 'Sem título'}
                        </span>
                        <span className="text-xs text-steel-500">{pageView.page}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {pageView.timeSpent ? (
                        <div className="flex items-center gap-1.5 text-emerald-400">
                          <Clock className="h-3 w-3" />
                          <span className="text-sm">{pageView.timeSpent}s</span>
                        </div>
                      ) : (
                        <span className="text-steel-600">-</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex flex-col">
                        <span className="text-sm text-steel-300">{formatTime(pageView.createdAt)}</span>
                        <span className="text-xs text-steel-500">{getDeviceType(pageView.session.userAgent)}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Link href={`/admin/analytics/session/${pageView.session.sessionId}`}>
                        <Button size="sm" variant="ghost" className="text-accent-400 hover:text-accent-300 hover:bg-accent-500/10 h-8">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AdminCard>
      )}
    </AdminPageWrapper>
  )
}
