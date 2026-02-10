'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Users,
  ChevronLeft,
  ChevronRight,
  Search,
  RefreshCw,
  ExternalLink,
  MapPin,
  Laptop,
  Clock
} from 'lucide-react'

import {
  AdminPageWrapper,
  AdminHeader,
  AdminCard
} from '@/components/admin'

interface SessionSummary {
  id: string
  sessionId: string
  ipAddress?: string
  userAgent?: string
  referrer?: string
  landingPage?: string
  country?: string
  city?: string
  device?: string
  browser?: string
  os?: string
  createdAt: string
  updatedAt: string
  _count: {
    pageViews: number
    activities: number
  }
}

export default function SessionsListPage() {
  const [sessions, setSessions] = useState<SessionSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [limit, setLimit] = useState(50)
  const [orderBy, setOrderBy] = useState('createdAt')
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('desc')

  useEffect(() => {
    fetchSessions()
  }, [page, limit, orderBy, orderDirection])

  const fetchSessions = async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        orderBy,
        orderDirection
      })
      const response = await fetch(`/api/analytics/sessions?${params}`)
      const data = await response.json()
      setSessions(data.sessions)
      setHasMore(data.sessions.length === limit)
    } catch (error) {
      console.error('Error fetching sessions:', error)
    } finally {
      setLoading(false)
    }
  }

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
          <span className="ml-3 text-lg text-steel-400">Carregando sessões...</span>
        </div>
      </AdminPageWrapper>
    )
  }

  return (
    <AdminPageWrapper>
      <AdminHeader
        title="Todas as Sessões"
        description="Lista completa de sessões de usuários e atividade"
        actions={
          <Link href="/admin/analytics">
            <Button variant="outline" className="border-steel-700 text-steel-300 hover:bg-steel-800">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Voltar
            </Button>
          </Link>
        }
      />

      {/* Controls */}
      <AdminCard className="mb-8 p-4">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-steel-400">Limite:</label>
            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value))
                setPage(1)
              }}
              className="bg-steel-800 border border-steel-700 text-white rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-accent-500"
            >
              <option value={50}>50 por página</option>
              <option value={100}>100 por página</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-steel-400">Ordenar por:</label>
            <select
              value={orderBy}
              onChange={(e) => {
                setOrderBy(e.target.value)
                setPage(1)
              }}
              className="bg-steel-800 border border-steel-700 text-white rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-accent-500"
            >
              <option value="createdAt">Data de Criação</option>
              <option value="updatedAt">Última Atividade</option>
            </select>
          </div>

          <Button onClick={fetchSessions} variant="ghost" className="text-steel-400 hover:text-white ml-auto">
            <RefreshCw className="h-4 w-4 mr-2" />
            Recarregar
          </Button>
        </div>
      </AdminCard>

      {/* Sessions Table */}
      <AdminCard>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-steel-700">
                <th className="text-left py-3 px-4 text-steel-400 font-medium text-sm">Sessão / ID</th>
                <th className="text-left py-3 px-4 text-steel-400 font-medium text-sm">Dispositivo</th>
                <th className="text-left py-3 px-4 text-steel-400 font-medium text-sm">Localização</th>
                <th className="text-center py-3 px-4 text-steel-400 font-medium text-sm">Atividade</th>
                <th className="text-right py-3 px-4 text-steel-400 font-medium text-sm">Duração</th>
                <th className="text-center py-3 px-4 text-steel-400 font-medium text-sm">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-steel-800">
              {sessions.map((session) => (
                <tr key={session.id} className="hover:bg-steel-800/30 transition-colors group">
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="text-white font-medium font-mono text-xs">
                        {session.sessionId.slice(0, 12)}...
                      </span>
                      <span className="text-xs text-steel-500">{formatTime(session.createdAt)}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-start gap-2">
                      <Laptop className="h-4 w-4 text-steel-500 mt-0.5" />
                      <div className="flex flex-col">
                        <span className="text-sm text-steel-200">{session.device || 'Desktop'}</span>
                        <span className="text-xs text-steel-500">{session.browser} • {session.os}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-steel-500 mt-0.5" />
                      <div className="flex flex-col">
                        <span className="text-sm text-steel-200">
                          {session.city || session.country || 'Desconhecido'}
                        </span>
                        <span className="text-xs text-steel-500 font-mono">{session.ipAddress}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Badge variant="outline" className="bg-accent-500/10 border-accent-500/20 text-accent-400 font-normal">
                        {session._count.pageViews} páginas
                      </Badge>
                      <Badge variant="outline" className="bg-emerald-500/10 border-emerald-500/20 text-emerald-400 font-normal">
                        {session._count.activities} cliques
                      </Badge>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5 text-steel-400">
                      <Clock className="h-3 w-3" />
                      <span className="text-sm">{formatDuration(session.createdAt, session.updatedAt)}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Link href={`/admin/analytics/session/${session.sessionId}`}>
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

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-between">
        <div className="text-sm text-steel-500">
          Mostrando página <span className="text-steel-300 font-medium">{page}</span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="border-steel-700 text-steel-400 hover:bg-steel-800 disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page + 1)}
            disabled={!hasMore}
            className="border-steel-700 text-steel-400 hover:bg-steel-800 disabled:opacity-30"
          >
            Próxima
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </AdminPageWrapper>
  )
}
