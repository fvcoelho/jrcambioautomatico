'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Calendar,
  MapPin,
  Tag,
  Image as ImageIcon,
  Video,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  MoreHorizontal
} from 'lucide-react'

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

interface Category {
  id: number
  name: string
  slug: string
}

interface ProjectCardProps {
  project: Project
  categories: Category[]
  onEdit: (project: Project) => void
  onDelete: (id: number) => void
  onManageImages: (project: Project) => void
  onToggleActive?: (id: number, isActive: boolean) => void
}

export default function ProjectCard({
  project,
  categories,
  onEdit,
  onDelete,
  onManageImages,
  onToggleActive
}: ProjectCardProps) {
  const activeImages = project.galleryImages?.filter(img => img.isActive) || []
  const totalImages = activeImages.length + project.imageUrls.length
  const hasImages = totalImages > 0
  const primaryImage = activeImages[0] || null
  const fallbackImage = project.imageUrls[0] || null

  const category = categories.find(cat =>
    cat.slug === project.category || cat.name === project.category
  )

  const handleDelete = () => {
    if (confirm('Tem certeza que deseja remover este projeto? Esta ação não pode ser desfeita.')) {
      onDelete(project.id)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  return (
    <Card className={`overflow-hidden transition-all duration-200 hover:shadow-xl bg-steel-800/50 backdrop-blur-sm border ${!project.isActive
        ? 'opacity-70 border-steel-700'
        : 'border-steel-700 hover:border-accent-500/40'
      }`}>
      {/* Project Image */}
      <div className="relative aspect-video bg-steel-900">
        {hasImages ? (
          <div className="relative w-full h-full">
            {primaryImage ? (
              primaryImage.fileType === 'video' ? (
                <div className="w-full h-full bg-gradient-to-br from-steel-600 to-steel-900 flex items-center justify-center">
                  <Video className="h-12 w-12 text-white" />
                </div>
              ) : (
                <img
                  src={primaryImage.imageUrl}
                  alt={primaryImage.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/logo.svg'
                      ; (e.target as HTMLImageElement).classList.add('p-4', 'bg-steel-900')
                  }}
                />
              )
            ) : fallbackImage ? (
              <img
                src={fallbackImage}
                alt={project.title}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/logo.svg'
                    ; (e.target as HTMLImageElement).classList.add('p-4', 'bg-steel-900')
                }}
              />
            ) : null}

            {/* Image Counter */}
            {totalImages > 1 && (
              <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                +{totalImages - 1} imagens
              </div>
            )}

            {/* Status Indicator */}
            <div className="absolute top-2 left-2">
              <Badge variant={project.isActive ? 'success' : 'destructive'}>
                {project.isActive ? 'Ativo' : 'Inativo'}
              </Badge>
            </div>

            {/* Inactive overlay */}
            {!project.isActive && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                  Projeto Desativado
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="relative w-full h-full bg-gradient-to-br from-steel-800 to-steel-900 flex items-center justify-center">
            <div className="text-center">
              <ImageIcon className="h-12 w-12 text-steel-500 mx-auto mb-2" />
              <p className="text-sm text-steel-400">Sem imagens</p>
            </div>

            {/* Status Indicator for no images */}
            <div className="absolute top-2 left-2">
              <Badge variant={project.isActive ? 'success' : 'destructive'}>
                {project.isActive ? 'Ativo' : 'Inativo'}
              </Badge>
            </div>

            {/* Inactive overlay for no images */}
            {!project.isActive && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                  Projeto Desativado
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-white text-lg leading-tight line-clamp-2">
              {project.title}
            </h3>
            {project.description && (
              <p className="text-sm text-steel-300 mt-1 line-clamp-2">
                {project.description}
              </p>
            )}
          </div>
        </div>

        {/* Metadata */}
        <div className="space-y-2 mb-4">
          {project.location && (
            <div className="flex items-center gap-2 text-sm text-steel-400">
              <MapPin className="h-3 w-3" />
              <span>{project.location}</span>
            </div>
          )}

          {category && (
            <div className="flex items-center gap-2 text-sm text-steel-400">
              <Tag className="h-3 w-3" />
              <span>{category.name}</span>
            </div>
          )}

          {project.completedAt && (
            <div className="flex items-center gap-2 text-sm text-steel-400">
              <Calendar className="h-3 w-3" />
              <span>Concluído em {formatDate(project.completedAt)}</span>
            </div>
          )}
        </div>

        {/* Gallery Info */}
        {totalImages > 0 && (
          <div className="flex items-center gap-4 text-xs text-steel-400 mb-4 py-2 border-t border-steel-700">
            {activeImages.length > 0 && (
              <span className="flex items-center gap-1">
                <ImageIcon className="h-3 w-3 text-accent-400" />
                {activeImages.length} na galeria
              </span>
            )}
            {project.imageUrls.length > 0 && (
              <span className="flex items-center gap-1">
                <MoreHorizontal className="h-3 w-3 text-amber-400" />
                {project.imageUrls.length} URL{project.imageUrls.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onManageImages(project)}
            className="flex-1 border-steel-600 text-steel-200 hover:bg-steel-700 hover:text-white"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Imagens
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(project)}
            className="border-steel-600 text-steel-200 hover:bg-steel-700 hover:text-white"
          >
            <Edit className="h-4 w-4" />
          </Button>

          {onToggleActive && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleActive(project.id, !project.isActive)}
              title={project.isActive ? 'Desativar projeto' : 'Ativar projeto'}
              className={project.isActive ? 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10' : 'text-steel-400 hover:text-emerald-300 hover:bg-emerald-500/10'}
            >
              {project.isActive ?
                <Eye className="h-4 w-4" /> :
                <EyeOff className="h-4 w-4" />
              }
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-3 pt-3 border-t border-steel-700 text-xs text-steel-500">
          Criado em {formatDate(project.createdAt)}
        </div>
      </div>
    </Card>
  )
}
