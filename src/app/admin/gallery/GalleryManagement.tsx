'use client'

import { useState, useEffect } from 'react'
import GalleryUploadForm from '@/components/GalleryUploadForm'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface Project {
  id: number
  title: string
  description: string | null
  location: string | null
  isActive: boolean
}

interface GalleryImage {
  id: number
  title: string
  description: string | null
  location: string | null
  imageUrl: string
  publicId: string
  category: string | null
  projectId: number
  fileType: string
  mimeType: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
  project?: Project
}

const categories = [
  { value: 'all', label: 'Todas as Categorias' },
  { value: 'diagnostico', label: 'Diagnóstico' },
  { value: 'reparo', label: 'Reparo de Câmbio' },
  { value: 'retifica', label: 'Retífica' },
  { value: 'manutencao', label: 'Manutenção' },
  { value: 'outros', label: 'Outros' }
]

interface EditImageFormProps {
  image: GalleryImage
  categories: { value: string; label: string }[]
  projects: Project[]
  onSave: (data: any) => void
  onCancel: () => void
}

function EditImageForm({ image, categories, projects, onSave, onCancel }: EditImageFormProps) {
  const [title, setTitle] = useState(image.title)
  const [description, setDescription] = useState(image.description || '')
  const [projectId, setProjectId] = useState(image.projectId.toString())
  const [isActive, setIsActive] = useState(image.isActive)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!projectId) {
      alert('Projeto é obrigatório')
      return
    }

    onSave({
      title,
      description: description || null,
      location: image.location,
      category: image.category,
      projectId: parseInt(projectId),
      isActive
    })
  }

  return (
    <div className="bg-steel-800/50 backdrop-blur-sm rounded-xl border border-steel-700 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Editar Imagem</h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-steel-300 mb-2">
              Título *
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título da imagem"
              required
              className="bg-steel-700/50 border-steel-600 text-white placeholder:text-steel-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-steel-300 mb-2">
              Descrição
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Digite uma descrição para a imagem"
              rows={3}
              className="bg-steel-700/50 border-steel-600 text-white placeholder:text-steel-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-steel-300 mb-2">
              Projeto *
            </label>
            <Select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              required
              className="bg-steel-700/50 border-steel-600 text-white"
            >
              <option value="">Selecione um projeto</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id.toString()}>
                  {project.title}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="rounded bg-steel-700 border-steel-600"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-steel-300">
              Imagem ativa (visível na galeria)
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-steel-300 mb-2">
              Pré-visualização
            </label>
            <div className="aspect-video relative border border-steel-600 rounded-lg overflow-hidden">
              {image.fileType === 'video' ? (
                <video
                  src={image.imageUrl}
                  controls
                  className="w-full h-full object-cover"
                >
                  Seu navegador não suporta o elemento de vídeo.
                </video>
              ) : (
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/logo.svg'
                    target.classList.add('bg-steel-800', 'p-6')
                  }}
                />
              )}
            </div>
            <div className="mt-2 text-xs text-steel-400">
              <strong>Tipo:</strong> {image.fileType === 'video' ? 'Vídeo' : 'Imagem'}
              {image.mimeType && (
                <>
                  {' • '}
                  <strong>Formato:</strong> {image.mimeType}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <Button onClick={handleSubmit} className="flex-1 bg-accent-500 hover:bg-accent-600 text-white">
          Salvar Alterações
        </Button>
        <Button variant="outline" onClick={onCancel} className="flex-1 border-steel-600 text-steel-300 hover:bg-steel-700 hover:text-white">
          Cancelar
        </Button>
      </div>
    </div>
  )
}

export default function GalleryManagement() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState('all')
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)

  const fetchImages = async (projectFilter = selectedProject) => {
    try {
      const url = projectFilter === 'all'
        ? '/api/gallery'
        : `/api/gallery?projectId=${projectFilter}`
      const response = await fetch(url)
      const data = await response.json()
      setImages(data.images || [])
    } catch (error) {
      console.error('Error fetching images:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects?status=all')
      const data = await response.json()
      setProjects(data.projects || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  useEffect(() => {
    fetchProjects()
    fetchImages()
  }, [])

  useEffect(() => {
    fetchImages()
  }, [selectedProject])

  const handleDeleteImage = async (id: number) => {
    if (!confirm('Tem certeza que deseja remover esta imagem?')) return

    try {
      const response = await fetch(`/api/gallery?id=${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        alert('Imagem removida com sucesso!')
        fetchImages()
      } else {
        alert('Erro ao remover imagem')
      }
    } catch (error) {
      console.error('Error deleting image:', error)
      alert('Erro ao remover imagem')
    }
  }

  const handleUploadSuccess = () => {
    fetchImages()
    setShowUploadForm(false)
  }

  const handleEditImage = (image: GalleryImage) => {
    setEditingImage(image)
    setShowUploadForm(false)
  }

  const handleUpdateImage = async (updatedData: any) => {
    if (!editingImage) return

    try {
      const response = await fetch(`/api/gallery/${editingImage.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      })

      if (response.ok) {
        alert('Imagem atualizada com sucesso!')
        fetchImages()
        setEditingImage(null)
      } else {
        alert('Erro ao atualizar imagem')
      }
    } catch (error) {
      console.error('Error updating image:', error)
      alert('Erro ao atualizar imagem')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-steel-400">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-400 mx-auto mb-4"></div>
            Carregando...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Gerenciar Galeria</h1>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex gap-4 items-center">
              <Select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-64 bg-steel-800/50 border-steel-600 text-white"
              >
                <option value="all">Todos os Projetos</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id.toString()}>
                    {project.title}
                  </option>
                ))}
              </Select>
            </div>
            <Button
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="whitespace-nowrap bg-accent-500 hover:bg-accent-600 text-white"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {showUploadForm ? 'Fechar Formulário' : 'Adicionar Nova Mídia'}
            </Button>
          </div>
        </div>

        {showUploadForm && (
          <div className="mb-8">
            <GalleryUploadForm onUploadSuccess={handleUploadSuccess} />
          </div>
        )}

        {editingImage && (
          <div className="mb-8">
            <EditImageForm
              image={editingImage}
              categories={categories}
              projects={projects}
              onSave={handleUpdateImage}
              onCancel={() => setEditingImage(null)}
            />
          </div>
        )}

        <div className="bg-steel-800/50 backdrop-blur-sm rounded-xl border border-steel-700 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">
              Mídia ({images.length})
            </h2>
          </div>

          {images.length === 0 ? (
            <div className="text-center py-12 text-steel-400">
              <div className="w-16 h-16 mx-auto mb-4 bg-steel-700/50 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-steel-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-lg">Nenhuma mídia encontrada</p>
              <p className="text-sm text-steel-500">Adicione algumas imagens ou vídeos à galeria para começar</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {images.map((image) => (
                <div key={image.id} className="border border-steel-700 rounded-xl overflow-hidden bg-steel-800/30">
                  <div className="aspect-video relative">
                    {image.fileType === 'video' ? (
                      <video
                        src={image.imageUrl}
                        className="w-full h-full object-cover"
                        controls
                        preload="metadata"
                      >
                        Seu navegador não suporta o elemento de vídeo.
                      </video>
                    ) : (
                      <img
                        src={image.imageUrl}
                        alt={image.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = '/logo.svg'
                          target.classList.add('bg-steel-800', 'p-6')
                        }}
                      />
                    )}
                    {/* File type indicator */}
                    <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                      {image.fileType === 'video' ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white mb-1">{image.title}</h3>
                    {image.description && (
                      <p className="text-sm text-steel-400 mb-3 line-clamp-2">
                        {image.description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {image.project && (
                        <span className="inline-block bg-accent-500/20 text-accent-300 text-xs px-2 py-1 rounded-full">
                          {image.project.title}
                        </span>
                      )}
                      <span className="inline-block bg-steel-700/50 text-steel-300 text-xs px-2 py-1 rounded-full">
                        {image.fileType === 'video' ? 'Vídeo' : 'Imagem'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditImage(image)}
                        className="flex-1 border-steel-600 text-steel-300 hover:bg-steel-700 hover:text-white"
                      >
                        Editar
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteImage(image.id)}
                        className="flex-1 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white border-0"
                      >
                        Remover
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
