'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Plus,
  Search,
  Filter,
  RefreshCw,
  FolderOpen,
  AlertCircle,
  CheckCircle2,
  Clock,
  BarChart3
} from 'lucide-react'

import {
  AdminPageWrapper,
  AdminHeader,
  AdminStatCard,
  AdminCard
} from '@/components/admin'

import ProjectForm, { ProjectFormData } from './ProjectForm'
import ProjectCard from './ProjectCard'
import ProjectImageManager from './ProjectImageManager'

interface Category {
  id: number
  name: string
  description: string | null
  slug: string
  imageUrl: string | null
}

interface GalleryImage {
  id: number
  title: string
  description: string | null
  imageUrl: string
  category: string | null
  fileType: string
  displayOrder: number
  isActive: boolean
  createdAt: string
}

interface Project {
  id: number
  title: string
  description: string | null
  location: string | null
  category: string | null
  imageUrls: string[]
  completedAt: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
  galleryImages?: GalleryImage[]
}

type ViewMode = 'grid' | 'list'
type FormMode = 'hidden' | 'create' | 'edit'

export default function ProjectManagement() {
  // Data state
  const [projects, setProjects] = useState<Project[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  // Filter state - Admin should see all projects by default
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // UI state
  const [viewMode] = useState<ViewMode>('grid')
  const [formMode, setFormMode] = useState<FormMode>('hidden')
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [managingImagesProject, setManagingImagesProject] = useState<Project | null>(null)
  const [formLoading, setFormLoading] = useState(false)
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  // Data fetching
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data.categories || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
      showNotification('error', 'Erro ao carregar categorias')
    }
  }

  const fetchProjects = async () => {
    try {
      const params = new URLSearchParams()
      if (selectedStatus !== 'all') params.append('status', selectedStatus)
      if (selectedCategory !== 'all') params.append('category', selectedCategory)
      if (searchTerm.trim()) params.append('search', searchTerm.trim())

      const response = await fetch(`/api/projects?${params.toString()}`)
      const data = await response.json()
      setProjects(data.projects || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
      showNotification('error', 'Erro ao carregar projetos')
    } finally {
      setLoading(false)
    }
  }

  // Effects
  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [selectedStatus, selectedCategory, searchTerm])

  // Utility functions
  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 5000)
  }

  const refreshData = async () => {
    setLoading(true)
    await Promise.all([fetchCategories(), fetchProjects()])
    setLoading(false)
  }

  // Form handlers
  const handleCreateProject = () => {
    setEditingProject(null)
    setFormMode('create')
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setFormMode('edit')
  }

  const handleFormCancel = () => {
    setFormMode('hidden')
    setEditingProject(null)
    setFormLoading(false)
  }

  const handleFormSubmit = async (data: ProjectFormData) => {
    setFormLoading(true)
    try {
      const url = formMode === 'create'
        ? '/api/projects'
        : `/api/projects/${editingProject!.id}`

      const method = formMode === 'create' ? 'POST' : 'PUT'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const message = formMode === 'create'
          ? 'Projeto criado com sucesso!'
          : 'Projeto atualizado com sucesso!'

        showNotification('success', message)
        await fetchProjects()
        setFormMode('hidden')
        setEditingProject(null)
      } else {
        const error = await response.json()
        showNotification('error', error.error || 'Erro ao salvar projeto')
      }
    } catch (error) {
      console.error('Error saving project:', error)
      showNotification('error', 'Erro ao salvar projeto')
    } finally {
      setFormLoading(false)
    }
  }

  // Project actions
  const handleDeleteProject = async (id: number) => {
    try {
      const response = await fetch(`/api/projects?id=${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        showNotification('success', 'Projeto removido com sucesso!')
        await fetchProjects()
      } else {
        showNotification('error', 'Erro ao remover projeto')
      }
    } catch (error) {
      console.error('Error deleting project:', error)
      showNotification('error', 'Erro ao remover projeto')
    }
  }

  const handleToggleProjectActive = async (id: number, isActive: boolean) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive })
      })

      if (response.ok) {
        const message = isActive
          ? 'Projeto ativado com sucesso!'
          : 'Projeto desativado com sucesso!'
        showNotification('success', message)
        await fetchProjects()
      } else {
        showNotification('error', 'Erro ao alterar status do projeto')
      }
    } catch (error) {
      console.error('Error toggling project status:', error)
      showNotification('error', 'Erro ao alterar status do projeto')
    }
  }

  const handleManageImages = (project: Project) => {
    setManagingImagesProject(project)
  }

  const handleImageManagerClose = () => {
    setManagingImagesProject(null)
    fetchProjects() // Refresh to get updated image counts
  }

  // Stats calculations
  const stats = {
    total: projects.length,
    active: projects.filter(p => p.isActive).length,
    inactive: projects.filter(p => !p.isActive).length,
    withImages: projects.filter(p =>
      (p.galleryImages && p.galleryImages.length > 0) || p.imageUrls.length > 0
    ).length
  }

  if (loading) {
    return (
      <AdminPageWrapper>
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="h-8 w-8 animate-spin text-accent-400" />
          <span className="ml-3 text-lg text-steel-400">Carregando projetos...</span>
        </div>
      </AdminPageWrapper>
    )
  }

  return (
    <AdminPageWrapper>
      {/* Notification */}
      {notification && (
        <div className="fixed top-20 right-4 z-[100] max-w-sm">
          <Alert variant={notification.type === 'error' ? 'destructive' : 'default'} className="shadow-2xl border-steel-700 bg-steel-900/90 backdrop-blur-md">
            {notification.type === 'success' ?
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> :
              <AlertCircle className="h-4 w-4 text-red-400" />
            }
            <AlertDescription className="text-white">{notification.message}</AlertDescription>
          </Alert>
        </div>
      )}

      <AdminHeader
        title="Gerenciar Projetos"
        description="Gerencie o portfólio com imagens e detalhes dos serviços realizados"
        actions={
          <Button onClick={handleCreateProject} size="lg" className="bg-accent-500 hover:bg-accent-600 text-white">
            <Plus className="h-5 w-5 mr-2" />
            Novo Projeto
          </Button>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <AdminStatCard
          label="Total"
          value={stats.total}
          icon={<FolderOpen className="h-5 w-5" />}
        />
        <AdminStatCard
          label="Ativos"
          value={stats.active}
          icon={<CheckCircle2 className="h-5 w-5 text-emerald-400" />}
          iconClassName="bg-emerald-500/20"
        />
        <AdminStatCard
          label="Inativos"
          value={stats.inactive}
          icon={<Clock className="h-5 w-5 text-steel-400" />}
        />
        <AdminStatCard
          label="Com Imagens"
          value={stats.withImages}
          icon={<BarChart3 className="h-5 w-5 text-accent-400" />}
          iconClassName="bg-accent-500/20"
        />
      </div>

      {/* Filters */}
      <AdminCard className="mb-8 p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex items-center gap-2 text-sm font-medium text-steel-300">
            <Filter className="h-4 w-4" />
            Filtros:
          </div>

          <div className="flex flex-wrap gap-4 flex-1">
            <div className="flex items-center gap-2">
              <Select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-40 bg-steel-700/50 border-steel-600 text-white"
              >
                <option value="all">Todos os Status</option>
                <option value="active">Apenas Ativos</option>
                <option value="inactive">Apenas Inativos</option>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-48 bg-steel-700/50 border-steel-600 text-white"
              >
                <option value="all">Todas as Categorias</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </Select>
            </div>

            <div className="flex items-center gap-2 flex-1 min-w-64">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por título, descrição ou localização..."
                  className="pl-10 bg-steel-700/50 border-steel-600 text-white placeholder:text-steel-400"
                />
              </div>
            </div>
          </div>

          <Button variant="outline" onClick={refreshData} size="sm" className="border-steel-600 text-steel-300 hover:bg-steel-700 hover:text-white">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </AdminCard>

      <Dialog open={formMode !== 'hidden'} onOpenChange={(open) => !open && handleFormCancel()}>
        <DialogContent className="max-w-4xl p-0 bg-steel-900 border-steel-700 rounded-2xl shadow-2xl">
          <ProjectForm
            mode={formMode === 'create' ? 'create' : 'edit'}
            initialData={editingProject ? {
              title: editingProject.title,
              description: editingProject.description,
              location: editingProject.location,
              category: editingProject.category,
              completedAt: editingProject.completedAt,
              isActive: editingProject.isActive
            } : undefined}
            categories={categories}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            loading={formLoading}
          />
        </DialogContent>
      </Dialog>

      {managingImagesProject && (
        <AdminCard className="mb-8">
          <ProjectImageManager
            projectId={managingImagesProject.id}
            projectTitle={managingImagesProject.title}
            images={managingImagesProject.galleryImages || []}
            onUpdate={fetchProjects}
            onClose={handleImageManagerClose}
          />
        </AdminCard>
      )}

      {/* Results */}
      {projects.length === 0 ? (
        <AdminCard className="p-12">
          <div className="text-center">
            <FolderOpen className="mx-auto h-16 w-16 text-steel-500 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              {searchTerm || selectedStatus !== 'all' || selectedCategory !== 'all'
                ? 'Nenhum projeto encontrado'
                : 'Nenhum projeto cadastrado'
              }
            </h3>
            <p className="text-steel-400 mb-6 max-w-md mx-auto">
              {searchTerm || selectedStatus !== 'all' || selectedCategory !== 'all'
                ? 'Tente ajustar os filtros de busca para encontrar projetos.'
                : 'Comece criando seu primeiro projeto para o portfólio.'
              }
            </p>
            {(!searchTerm && selectedStatus === 'all' && selectedCategory === 'all') && (
              <Button onClick={handleCreateProject} size="lg" className="bg-accent-500 hover:bg-accent-600 text-white">
                <Plus className="h-5 w-5 mr-2" />
                Criar Primeiro Projeto
              </Button>
            )}
          </div>
        </AdminCard>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-white">
                Projetos ({projects.length})
              </h2>
              {(searchTerm || selectedStatus !== 'all' || selectedCategory !== 'all') && (
                <Badge variant="outline" className="border-steel-600 text-steel-300">
                  {searchTerm && `"${searchTerm}"`}
                  {selectedStatus !== 'all' && ` ${selectedStatus === 'active' ? 'Ativos' : 'Inativos'}`}
                  {selectedCategory !== 'all' && ` ${categories.find(c => c.slug === selectedCategory)?.name}`}
                </Badge>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                categories={categories}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
                onManageImages={handleManageImages}
                onToggleActive={handleToggleProjectActive}
              />
            ))}
          </div>
        </div>
      )}
    </AdminPageWrapper>
  )
}
