'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  AdminPageWrapper,
  AdminHeader,
  AdminStatCard,
  AdminCard
} from '@/components/admin'
import {
  Camera,
  BarChart3,
  MessageSquare,
  Activity,
  ChevronRight,
  Plus,
  FolderOpen
} from 'lucide-react'

interface DashboardStats {
  gallery: {
    totalImages: number
    activeImages: number
    inactiveImages: number
  }
  analytics: {
    recentSessions: number
    totalSessions: number
    recentPageViews: number
    topPages: Array<{ page: string; visits: number }>
  }
  whatsapp: {
    activeConversations: number
    totalConversations: number
  }
  activity: {
    recentActivities: Array<{
      id: string
      page: string
      elementText?: string
      elementType?: string
      createdAt: string
      location?: string
      device?: string
      browser?: string
    }>
  }
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      const data = await response.json()

      if (data.success) {
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const adminRoutes = [
    {
      title: 'Portfólio',
      description: 'Gerenciar trabalhos e reparos realizados',
      href: '/admin/projects',
      icon: <FolderOpen className="w-8 h-8" />,
      gradient: 'from-zinc-400 to-zinc-600',
      stat: null,
      statLabel: 'ver todos'
    },
    {
      title: 'Galeria',
      description: 'Gerenciar imagens de serviços',
      href: '/admin/gallery',
      icon: <Camera className="w-8 h-8" />,
      gradient: 'from-steel-400 to-steel-600',
      stat: stats?.gallery.totalImages || 0,
      statLabel: 'imagens'
    },
    {
      title: 'Analytics',
      description: 'Visualizar dados de uso e sessões',
      href: '/admin/analytics',
      icon: <BarChart3 className="w-8 h-8" />,
      gradient: 'from-accent-400 to-accent-600',
      stat: stats?.analytics.recentSessions || 0,
      statLabel: 'sessões (24h)'
    },
    {
      title: 'WhatsApp',
      description: 'Gerenciar conversas e atendimentos',
      href: '/admin/whatsapp',
      icon: <MessageSquare className="w-8 h-8" />,
      gradient: 'from-emerald-500 to-emerald-700',
      stat: stats?.whatsapp.activeConversations || 0,
      statLabel: 'conversas ativas'
    }
  ]

  return (
    <AdminPageWrapper>
      <AdminHeader
        title="Painel Administrativo"
        description="Gerencie todos os aspectos do sistema JR Câmbio Automático"
        actions={
          <Link href="/">
            <Button variant="outline" className="border-steel-600 bg-steel-900/40 text-steel-200 hover:bg-steel-700/80 hover:text-white">
              <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
              Voltar ao Site
            </Button>
          </Link>
        }
      />

      {/* Quick Stats Overview */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">
          Visão Geral - Últimas 24 Horas
        </h2>
        {loading ? (
          <div className="text-center py-8 text-steel-400">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-400 mx-auto mb-4"></div>
            Carregando estatísticas...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <AdminStatCard
              label="Total de Imagens"
              value={stats?.gallery.totalImages || 0}
              subValue={stats?.gallery.activeImages || 0}
              subLabel="ativas"
              icon={<Camera className="w-6 h-6" />}
            />
            <AdminStatCard
              label="Sessões Recentes"
              value={stats?.analytics.recentSessions || 0}
              subValue={stats?.analytics.recentPageViews || 0}
              subLabel="visualizações"
              icon={<BarChart3 className="w-6 h-6" />}
            />
            <AdminStatCard
              label="Conversas Ativas"
              value={stats?.whatsapp.activeConversations || 0}
              subValue={stats?.whatsapp.totalConversations || 0}
              subLabel="total"
              icon={<MessageSquare className="w-6 h-6" />}
              iconClassName="bg-emerald-500/20 text-emerald-400"
            />
            <AdminStatCard
              label="Atividades Recentes"
              value={stats?.activity.recentActivities.length || 0}
              subLabel="ações do usuário"
              icon={<Activity className="w-6 h-6" />}
              iconClassName="bg-accent-500/20 text-accent-400"
            />
          </div>
        )}
      </div>

      {/* Grid for Activity and Top Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Activity Feed */}
        {stats?.activity.recentActivities.length ? (
          <AdminCard title="Atividade Recente">
            <div className="space-y-3">
              {stats.activity.recentActivities.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex items-center justify-between py-3 border-b border-steel-700 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent-400 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {activity.elementText ? `"${activity.elementText}"` : activity.elementType || 'Interação'}
                      </p>
                      <p className="text-xs text-steel-400">
                        {activity.page} • {activity.location && `${activity.location} • `}
                        {new Date(activity.createdAt).toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  {activity.device && (
                    <span className="text-xs text-steel-400 bg-steel-700/50 px-2 py-1 rounded">
                      {activity.device}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link href="/admin/analytics">
                <Button variant="outline" size="sm" className="border-steel-600 text-steel-300 hover:bg-steel-700 hover:text-white">
                  Ver Todos os Dados
                </Button>
              </Link>
            </div>
          </AdminCard>
        ) : null}

        {/* Top Pages */}
        {stats?.analytics.topPages.length ? (
          <AdminCard title="Páginas Mais Visitadas (24h)">
            <div className="space-y-2">
              {stats.analytics.topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-steel-400 w-6">
                      #{index + 1}
                    </span>
                    <span className="text-sm text-white">
                      {page.page === '/' ? 'Página Inicial' : page.page}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-accent-400">
                    {page.visits} visitas
                  </span>
                </div>
              ))}
            </div>
          </AdminCard>
        ) : null}
      </div>

      {/* Admin Routes Grid */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">
          Módulos Administrativos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminRoutes.map((route, index) => (
            <Link key={index} href={route.href}>
              <div className={`bg-gradient-to-br ${route.gradient} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer`}>
                <div className="p-6 text-white">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <div className="mr-4 opacity-90">
                          {route.icon}
                        </div>
                        <h3 className="text-xl font-bold">
                          {route.title}
                        </h3>
                      </div>
                      <p className="text-white/80 mb-4">
                        {route.description}
                      </p>
                      {route.stat !== null && (
                        <div className="flex items-center text-white/90">
                          <span className="text-2xl font-bold mr-2">
                            {route.stat}
                          </span>
                          <span className="text-sm">
                            {route.statLabel}
                          </span>
                        </div>
                      )}
                      {route.stat === null && (
                        <div className="text-white/80 text-sm">
                          {route.statLabel}
                        </div>
                      )}
                    </div>
                    <div className="text-white/60">
                      <ChevronRight className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <AdminCard title="Ações Rápidas">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/admin/gallery">
            <Button className="w-full bg-steel-700 hover:bg-steel-600 text-white border-0">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Imagem
            </Button>
          </Link>
          <Link href="/admin/projects">
            <Button className="w-full bg-steel-700 hover:bg-steel-600 text-white border-0">
              <FolderOpen className="w-4 h-4 mr-2" />
              Gerenciar Portfólio
            </Button>
          </Link>
          <Link href="/admin/analytics">
            <Button className="w-full bg-steel-700 hover:bg-steel-600 text-white border-0">
              <BarChart3 className="w-4 h-4 mr-2" />
              Ver Analytics
            </Button>
          </Link>
          <Link href="/">
            <Button className="w-full bg-steel-700 hover:bg-steel-600 text-white border-0">
              <Activity className="w-4 h-4 mr-2" />
              Visualizar Site
            </Button>
          </Link>
        </div>
      </AdminCard>

      {/* Footer Info */}
      <div className="mt-8 text-center text-sm text-steel-500">
        <p>JR Câmbio Automático - Painel Admin v1.0</p>
        <p className="mt-1">
          Especialistas em Câmbio Automático
        </p>
      </div>
    </AdminPageWrapper>
  )
}
