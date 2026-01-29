'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
// import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  X,
  Upload,
  Image as ImageIcon,
  Video,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Download
} from 'lucide-react'

interface ProjectImage {
  id: number
  title: string
  description?: string | null
  imageUrl: string
  fileType: string
  displayOrder: number
  isActive: boolean
}

interface ProjectImageManagerProps {
  projectId: number
  projectTitle: string
  images: ProjectImage[]
  onUpdate: () => void
  onClose?: () => void
}

interface UploadStatus {
  status: 'idle' | 'uploading' | 'success' | 'error'
  message?: string
  progress?: number
}

export default function ProjectImageManager({ 
  projectId, 
  projectTitle,
  images: initialImages,
  onUpdate,
  onClose
}: ProjectImageManagerProps) {
  const [images, setImages] = useState<ProjectImage[]>(
    initialImages.sort((a, b) => a.displayOrder - b.displayOrder)
  )
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [dragOver, setDragOver] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({ status: 'idle' })
  const [activeTab, setActiveTab] = useState('gallery')

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).filter(file => 
        file.type.startsWith('image/') || file.type.startsWith('video/')
      )
      setSelectedFiles(files)
    }
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    )
    
    if (files.length > 0) {
      setSelectedFiles(files)
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }, [])

  const uploadImages = async () => {
    if (selectedFiles.length === 0) return

    setUploadStatus({ status: 'uploading', message: 'Preparando upload...', progress: 0 })

    try {
      let successCount = 0
      const totalFiles = selectedFiles.length

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i]
        setUploadStatus({ 
          status: 'uploading', 
          message: `Enviando ${i + 1} de ${totalFiles}: ${file.name}`,
          progress: Math.round((i / totalFiles) * 100)
        })

        const formData = new FormData()
        formData.append('file', file)
        formData.append('title', file.name.replace(/\.[^/.]+$/, ''))
        formData.append('projectId', projectId.toString())
        formData.append('description', `Imagem do projeto: ${projectTitle}`)
        
        const nextOrder = Math.max(...images.map(img => img.displayOrder), -1) + 1 + i
        formData.append('displayOrder', nextOrder.toString())

        const response = await fetch('/api/gallery/upload', {
          method: 'POST',
          body: formData
        })

        if (response.ok) {
          successCount++
          const data = await response.json()
          
          if (data.success && data.image) {
            const newImage: ProjectImage = {
              id: data.image.id,
              title: data.image.title,
              description: data.image.description,
              imageUrl: data.image.imageUrl,
              fileType: data.image.fileType || 'image',
              displayOrder: data.image.displayOrder || nextOrder,
              isActive: data.image.isActive
            }
            
            setImages(prev => [...prev, newImage])
          }
        }
      }

      setUploadStatus({ 
        status: 'success', 
        message: `${successCount} de ${totalFiles} arquivos enviados com sucesso!`,
        progress: 100
      })
      
      setTimeout(() => {
        setUploadStatus({ status: 'idle' })
        setSelectedFiles([])
        onUpdate()
      }, 3000)

    } catch (error) {
      console.error('Upload error:', error)
      setUploadStatus({ 
        status: 'error', 
        message: 'Erro durante o upload. Tente novamente.'
      })
    }
  }

  const moveImage = async (imageId: number, direction: 'up' | 'down') => {
    const currentIndex = images.findIndex(img => img.id === imageId)
    if (currentIndex === -1) return

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    if (newIndex < 0 || newIndex >= images.length) return

    const items = Array.from(images)
    const [movedItem] = items.splice(currentIndex, 1)
    items.splice(newIndex, 0, movedItem)

    const updatedItems = items.map((item, index) => ({
      ...item,
      displayOrder: index
    }))

    setImages(updatedItems)

    try {
      const response = await fetch(`/api/projects/${projectId}/images/order`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageOrders: updatedItems.map(img => ({
            id: img.id,
            displayOrder: img.displayOrder
          }))
        })
      })

      if (response.ok) {
        onUpdate()
      } else {
        setImages(initialImages)
      }
    } catch (error) {
      console.error('Error updating image order:', error)
      setImages(initialImages)
    }
  }

  const deleteImage = async (imageId: number) => {
    if (!confirm('Tem certeza que deseja remover esta imagem do projeto?')) return

    try {
      const response = await fetch(`/api/gallery/images/${imageId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setImages(prev => prev.filter(img => img.id !== imageId))
        onUpdate()
      } else {
        alert('Falha ao remover imagem')
      }
    } catch (error) {
      console.error('Error deleting image:', error)
      alert('Falha ao remover imagem')
    }
  }

  const toggleImageVisibility = async (imageId: number, isActive: boolean) => {
    try {
      const response = await fetch(`/api/gallery/images/${imageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive })
      })

      if (response.ok) {
        setImages(prev => prev.map(img => 
          img.id === imageId ? { ...img, isActive } : img
        ))
        onUpdate()
      }
    } catch (error) {
      console.error('Error toggling image visibility:', error)
    }
  }

  const clearSelectedFiles = () => {
    setSelectedFiles([])
    setUploadStatus({ status: 'idle' })
  }

  const downloadImage = async (imageUrl: string, fileName: string) => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading image:', error)
      alert('Falha ao baixar a imagem')
    }
  }

  const getStatusIcon = () => {
    switch (uploadStatus.status) {
      case 'uploading':
        return <RotateCcw className="h-4 w-4 animate-spin" />
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gerenciar Imagens</h2>
          <p className="text-gray-600">{projectTitle}</p>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">
            <Upload className="h-4 w-4 mr-2" />
            Upload ({selectedFiles.length})
          </TabsTrigger>
          <TabsTrigger value="gallery">
            <ImageIcon className="h-4 w-4 mr-2" />
            Galeria ({images.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-6">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Adicionar Novas Imagens</h3>
                
                {/* Upload Area */}
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                    dragOver 
                      ? 'border-blue-500 bg-blue-50' 
                      : selectedFiles.length > 0 
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <Upload className={`mx-auto h-12 w-12 mb-4 ${
                    dragOver ? 'text-blue-500' : selectedFiles.length > 0 ? 'text-green-500' : 'text-gray-400'
                  }`} />
                  
                  {selectedFiles.length > 0 ? (
                    <div className="space-y-2">
                      <p className="text-lg font-medium text-green-700">
                        {selectedFiles.length} arquivo{selectedFiles.length !== 1 ? 's' : ''} selecionado{selectedFiles.length !== 1 ? 's' : ''}
                      </p>
                      <p className="text-sm text-gray-600">
                        {selectedFiles.map(f => f.name).join(', ')}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-lg font-medium text-gray-700">
                        Arraste imagens/vídeos aqui ou clique para selecionar
                      </p>
                      <p className="text-sm text-gray-500">
                        Suporte para JPG, PNG, GIF, MP4, MOV e outros formatos
                      </p>
                    </div>
                  )}
                  
                  <Input
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                    disabled={uploadStatus.status === 'uploading'}
                  />
                  <Label 
                    htmlFor="file-upload"
                    className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                  >
                    Selecionar Arquivos
                  </Label>
                </div>

                {/* Upload Status */}
                {uploadStatus.status !== 'idle' && (
                  <Alert className="mt-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon()}
                      <AlertDescription>
                        {uploadStatus.message}
                        {uploadStatus.progress !== undefined && (
                          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${uploadStatus.progress}%` }}
                            />
                          </div>
                        )}
                      </AlertDescription>
                    </div>
                  </Alert>
                )}

                {/* Upload Actions */}
                {selectedFiles.length > 0 && uploadStatus.status === 'idle' && (
                  <div className="flex gap-3 mt-4">
                    <Button onClick={uploadImages} className="flex-1">
                      <Upload className="h-4 w-4 mr-2" />
                      Enviar {selectedFiles.length} arquivo{selectedFiles.length !== 1 ? 's' : ''}
                    </Button>
                    <Button variant="outline" onClick={clearSelectedFiles}>
                      Cancelar
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="gallery" className="mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">
                Imagens do Projeto ({images.length})
              </h3>
              {images.length > 0 && (
                <Badge variant="outline">
                  {images.filter(img => img.isActive).length} ativas
                </Badge>
              )}
            </div>

            {images.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <ImageIcon className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                <p className="text-lg font-medium">Nenhuma imagem adicionada</p>
                <p className="text-sm mt-2">
                  Use a aba &quot;Upload&quot; para adicionar imagens ao projeto
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {images.map((image, index) => (
                  <div
                    key={image.id}
                    className={`flex items-center gap-4 p-4 bg-white border rounded-lg transition-all duration-200 ${
                      !image.isActive ? 'opacity-60' : 'hover:shadow-md'
                    }`}
                  >
                    {/* Order Controls */}
                    <div className="flex flex-col gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveImage(image.id, 'up')}
                        disabled={index === 0}
                        className="p-1 h-8 w-8"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <div className="text-xs text-center text-gray-500 font-medium w-8">
                        #{index + 1}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveImage(image.id, 'down')}
                        disabled={index === images.length - 1}
                        className="p-1 h-8 w-8"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Image Preview */}
                    <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      {image.fileType === 'video' ? (
                        <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                          <Video className="h-8 w-8 text-white" />
                        </div>
                      ) : (
                        <img
                          src={image.imageUrl}
                          alt={image.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.png'
                          }}
                        />
                      )}
                    </div>

                    {/* Image Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">
                        {image.title}
                      </h4>
                      {image.description && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                          {image.description}
                        </p>
                      )}
                      <div className="flex items-center gap-3 mt-2">
                        <Badge variant={image.fileType === 'video' ? 'default' : 'secondary'}>
                          {image.fileType === 'video' ? 'Vídeo' : 'Imagem'}
                        </Badge>
                        {!image.isActive && (
                          <Badge variant="outline">Oculta</Badge>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => downloadImage(image.imageUrl, `${image.title}.${image.fileType === 'video' ? 'mp4' : 'jpg'}`)}
                        title="Baixar imagem"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleImageVisibility(image.id, !image.isActive)}
                        title={image.isActive ? 'Ocultar imagem' : 'Mostrar imagem'}
                      >
                        {image.isActive ?
                          <Eye className="h-4 w-4" /> :
                          <EyeOff className="h-4 w-4" />
                        }
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteImage(image.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}