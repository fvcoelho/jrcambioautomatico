'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  AdminPageWrapper,
  AdminHeader,
  AdminCard
} from '@/components/admin'
import {
  Plus,
  FolderOpen,
  Edit2,
  Trash2,
  X,
  RefreshCw
} from 'lucide-react'

interface Category {
  id: number
  name: string
  description: string | null
  slug: string
  imageUrl: string | null
  createdAt: string
  updatedAt: string
  _count?: {
    projects: number
  }
}

interface CategoryFormProps {
  category?: Category | null
  onSave: (data: any) => void
  onCancel: () => void
}

function CategoryForm({ category, onSave, onCancel }: CategoryFormProps) {
  const [name, setName] = useState(category?.name || '')
  const [description, setDescription] = useState(category?.description || '')
  const [slug, setSlug] = useState(category?.slug || '')
  const [imageUrl, setImageUrl] = useState(category?.imageUrl || '')

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleNameChange = (value: string) => {
    setName(value)
    if (!category) {
      setSlug(generateSlug(value))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !slug) {
      alert('Nome e slug são obrigatórios')
      return
    }

    onSave({
      name,
      description: description || null,
      slug,
      imageUrl: imageUrl || null
    })
  }

  return (
    <AdminCard title={category ? 'Editar Categoria' : 'Nova Categoria'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-steel-300 mb-2">
            Nome *
          </label>
          <Input
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Ex: Reparo de Câmbio"
            required
            className="bg-steel-700/50 border-steel-600 text-white placeholder:text-steel-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-steel-300 mb-2">
            Slug *
          </label>
          <Input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Ex: reparo-de-cambio"
            required
            className="bg-steel-700/50 border-steel-600 text-white placeholder:text-steel-400"
          />
          <p className="text-xs text-steel-500 mt-1">
            URL amigável para a categoria (usado em links)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-steel-300 mb-2">
            Descrição
          </label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição da categoria"
            rows={3}
            className="bg-steel-700/50 border-steel-600 text-white placeholder:text-steel-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-steel-300 mb-2">
            URL da Imagem
          </label>
          <Input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://exemplo.com/imagem.jpg"
            className="bg-steel-700/50 border-steel-600 text-white placeholder:text-steel-400"
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit" className="flex-1 bg-accent-500 hover:bg-accent-600 text-white">
            {category ? 'Salvar Alterações' : 'Criar Categoria'}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1 border-steel-600 text-steel-300 hover:bg-steel-700 hover:text-white">
            Cancelar
          </Button>
        </div>
      </form>
    </AdminCard>
  )
}

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data.categories || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleCreateCategory = async (data: any) => {
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        alert('Categoria criada com sucesso!')
        fetchCategories()
        setShowForm(false)
      } else {
        const error = await response.json()
        alert(error.message || 'Erro ao criar categoria')
      }
    } catch (error) {
      console.error('Error creating category:', error)
      alert('Erro ao criar categoria')
    }
  }

  const handleUpdateCategory = async (data: any) => {
    if (!editingCategory) return

    try {
      const response = await fetch(`/api/categories/${editingCategory.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        alert('Categoria atualizada com sucesso!')
        fetchCategories()
        setEditingCategory(null)
      } else {
        const error = await response.json()
        alert(error.message || 'Erro ao atualizar categoria')
      }
    } catch (error) {
      console.error('Error updating category:', error)
      alert('Erro ao atualizar categoria')
    }
  }

  const handleDeleteCategory = async (id: number) => {
    if (!confirm('Tem certeza que deseja remover esta categoria?')) return

    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        alert('Categoria removida com sucesso!')
        fetchCategories()
      } else {
        const error = await response.json()
        alert(error.message || 'Erro ao remover categoria')
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      alert('Erro ao remover categoria')
    }
  }

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category)
    setShowForm(false)
  }

  if (loading) {
    return (
      <AdminPageWrapper>
        <div className="text-center text-steel-400 py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-400 mx-auto mb-4"></div>
          Carregando...
        </div>
      </AdminPageWrapper>
    )
  }

  return (
    <AdminPageWrapper>
      <AdminHeader
        title="Gerenciar Categorias"
        description="Gerencie as categorias de serviços para organizar o portfólio"
        actions={
          <Button
            onClick={() => {
              setShowForm(!showForm)
              setEditingCategory(null)
            }}
            className="whitespace-nowrap bg-accent-500 hover:bg-accent-600 text-white"
          >
            {showForm ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
            {showForm ? 'Fechar Formulário' : 'Nova Categoria'}
          </Button>
        }
      />

      {showForm && (
        <div className="mb-8">
          <CategoryForm
            onSave={handleCreateCategory}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {editingCategory && (
        <div className="mb-8">
          <CategoryForm
            category={editingCategory}
            onSave={handleUpdateCategory}
            onCancel={() => setEditingCategory(null)}
          />
        </div>
      )}

      <AdminCard title={`Categorias (${categories.length})`}>
        {categories.length === 0 ? (
          <div className="text-center py-12 text-steel-400">
            <div className="w-16 h-16 mx-auto mb-4 bg-steel-700/50 rounded-full flex items-center justify-center">
              <FolderOpen className="w-8 h-8 text-steel-500" />
            </div>
            <p className="text-lg">Nenhuma categoria encontrada</p>
            <p className="text-sm text-steel-500">Crie sua primeira categoria para organizar os serviços</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-steel-700">
                  <th className="text-left py-3 px-4 font-semibold text-steel-300">Nome</th>
                  <th className="text-left py-3 px-4 font-semibold text-steel-300">Slug</th>
                  <th className="text-left py-3 px-4 font-semibold text-steel-300">Descrição</th>
                  <th className="text-center py-3 px-4 font-semibold text-steel-300">Itens</th>
                  <th className="text-center py-3 px-4 font-semibold text-steel-300">Ações</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="border-b border-steel-700/50 hover:bg-steel-700/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {category.imageUrl && (
                          <img
                            src={category.imageUrl}
                            alt={category.name}
                            className="w-10 h-10 rounded object-cover"
                          />
                        )}
                        <span className="font-medium text-white">{category.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-steel-400">{category.slug}</td>
                    <td className="py-3 px-4 text-steel-400">
                      <span className="line-clamp-2">{category.description || '-'}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-block bg-accent-500/20 text-accent-300 text-xs px-2 py-1 rounded-full">
                        {category._count?.projects || 0}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2 justify-center">
                        <Button
                          size="sm"
                          onClick={() => handleEditCategory(category)}
                          className="bg-accent-500 hover:bg-accent-600 text-white border-0"
                        >
                          <Edit2 className="w-3 h-3 mr-1" />
                          Editar
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteCategory(category.id)}
                          className="bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white border-0"
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Remover
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminCard>
    </AdminPageWrapper>
  )
}
