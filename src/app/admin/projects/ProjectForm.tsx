'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { CalendarDays, MapPin, Tag, FileText, Plus, X, Edit } from 'lucide-react'

interface Category {
  id: number
  name: string
  slug: string
}

interface ProjectFormProps {
  mode: 'create' | 'edit'
  initialData?: {
    title: string
    description?: string | null
    location?: string | null
    category?: string | null
    completedAt?: string | null
    isActive: boolean
  }
  categories: Category[]
  onSubmit: (data: ProjectFormData) => Promise<void>
  onCancel: () => void
  loading?: boolean
}

export interface ProjectFormData {
  title: string
  description?: string | null
  location?: string | null
  category?: string | null
  completedAt?: string | null
  isActive: boolean
}

export default function ProjectForm({
  mode,
  initialData,
  categories,
  onSubmit,
  onCancel,
  loading = false
}: ProjectFormProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    location: initialData?.location || '',
    category: initialData?.category || '',
    completedAt: initialData?.completedAt 
      ? new Date(initialData.completedAt).toISOString().split('T')[0] 
      : '',
    isActive: initialData?.isActive ?? true
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.title?.trim()) {
      newErrors.title = 'Título é obrigatório'
    }
    
    if (formData.title && formData.title.trim().length < 3) {
      newErrors.title = 'Título deve ter pelo menos 3 caracteres'
    }
    
    if (formData.description && formData.description.trim().length > 500) {
      newErrors.description = 'Descrição deve ter no máximo 500 caracteres'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const processedData = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description?.trim() || null,
      location: formData.location?.trim() || null,
      category: formData.category?.trim() || null,
      completedAt: formData.completedAt || null,
    }

    try {
      await onSubmit(processedData)
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  const updateField = (field: keyof ProjectFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const isCreateMode = mode === 'create'

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isCreateMode ? 'bg-blue-100' : 'bg-green-100'}`}>
            {isCreateMode ? (
              <Plus className="h-5 w-5 text-blue-600" />
            ) : (
              <Edit className="h-5 w-5 text-green-600" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {isCreateMode ? 'Criar Novo Projeto' : 'Editar Projeto'}
            </h2>
            <p className="text-sm text-gray-500">
              {isCreateMode 
                ? 'Adicione um novo projeto ao portfólio' 
                : 'Atualize as informações do projeto'}
            </p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onCancel}
          disabled={loading}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Project Info Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-4 w-4 text-gray-500" />
            <h3 className="font-medium text-gray-900">Informações Básicas</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                Título do Projeto *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="Ex: Instalação de piso laminado em residência"
                className={errors.title ? 'border-red-500' : ''}
                disabled={loading}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            <div>
              <Label htmlFor="location" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Localização
              </Label>
              <Input
                id="location"
                value={formData.location || ''}
                onChange={(e) => updateField('location', e.target.value)}
                placeholder="Ex: São Paulo, SP"
                disabled={loading}
              />
            </div>

            <div>
              <Label htmlFor="category" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <Tag className="h-3 w-3" />
                Categoria
              </Label>
              <Select
                id="category"
                value={formData.category || ''}
                onChange={(e) => updateField('category', e.target.value)}
                disabled={loading}
              >
                <option value="">Selecione uma categoria</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Descrição
            </Label>
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Descreva o projeto realizado, materiais utilizados, desafios superados..."
              rows={4}
              className={errors.description ? 'border-red-500' : ''}
              disabled={loading}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              {formData.description?.length || 0}/500 caracteres
            </p>
          </div>
        </div>

        <Separator />

        {/* Project Details Section */}
        <div className="space-y-4">
          {/* <div className="flex items-center gap-2 mb-4">
            <CalendarDays className="h-4 w-4 text-gray-500" />
            <h3 className="font-medium text-gray-900">Detalhes do Projeto</h3>
          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div>
              <Label htmlFor="completedAt" className="text-sm font-medium text-gray-700">
                Data de Conclusão
              </Label>
              <Input
                id="completedAt"
                type="date"
                value={formData.completedAt || ''}
                onChange={(e) => updateField('completedAt', e.target.value)}
                disabled={loading}
              />
            </div>

            {/* <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => updateField('isActive', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                disabled={loading}
              />
              <Label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                Projeto ativo (visível no portfólio)
              </Label>
            </div> */}
          </div>
        </div>

        {isCreateMode && (
          <Alert>
            <AlertDescription className="flex items-start gap-2">
              <div className="text-2xl">📸</div>
              <div>
                <p className="font-medium">Sobre as imagens do projeto</p>
                <p className="text-sm text-gray-600 mt-1">
                  Após criar o projeto, você poderá adicionar e organizar as imagens 
                  usando o botão &quot;Gerenciar Imagens&quot; na lista de projetos.
                </p>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <Separator />

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            disabled={loading}
            className="min-w-[120px]"
          >
            {loading 
              ? (isCreateMode ? 'Criando...' : 'Salvando...') 
              : (isCreateMode ? 'Criar Projeto' : 'Salvar Alterações')
            }
          </Button>
        </div>
      </form>
    </Card>
  )
}