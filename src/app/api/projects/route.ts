import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') // 'active', 'inactive', 'all'
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const limit = searchParams.get('limit')
    const page = searchParams.get('page')
    const pageSize = searchParams.get('pageSize')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc'
    const random = searchParams.get('random') === 'true'

    // Build where clause
    const where: Record<string, any> = {}
    
    // Status filter
    if (status === 'active') {
      where.isActive = true
    } else if (status === 'inactive') {
      where.isActive = false
    } else if (status === 'default') {
      // Default behavior for public - only show active
      where.isActive = true
    }
    // For admin and status === 'all', show everything (no filter)

    // Category filter
    if (category && category !== 'all') {
      where.category = category
    }

    // Search filter
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Pagination setup
    const currentPage = page ? parseInt(page) : 1
    const itemsPerPage = pageSize ? parseInt(pageSize) : (limit ? parseInt(limit) : 20)
    const skip = (currentPage - 1) * itemsPerPage

    // Get total count for pagination
    const totalCount = await prisma.project.count({ where })

    // Build orderBy - use random sorting if requested
    let orderBy: Record<string, 'asc' | 'desc'> | any = {}
    if (random) {
      // Use raw SQL for random ordering in PostgreSQL
      orderBy = { id: 'desc' } // Fallback, will be overridden by raw query
    } else if (sortBy === 'title') {
      orderBy.title = sortOrder
    } else if (sortBy === 'location') {
      orderBy.location = sortOrder
    } else if (sortBy === 'category') {
      orderBy.category = sortOrder
    } else if (sortBy === 'completedAt') {
      orderBy.completedAt = sortOrder
    } else if (sortBy === 'updatedAt') {
      orderBy.updatedAt = sortOrder
    } else {
      orderBy.createdAt = sortOrder
    }

    // Fetch projects with pagination, including gallery images
    let projects: any[]
    if (random) {
      // For random selection, first get all matching project IDs, then select random ones
      const allProjectIds = await prisma.project.findMany({
        where,
        select: { id: true }
      })
      
      // Shuffle the IDs and take the required number
      const shuffledIds = allProjectIds
        .map(p => p.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, itemsPerPage)
      
      // Fetch the full project data for the selected IDs
      projects = await prisma.project.findMany({
        where: {
          id: { in: shuffledIds }
        },
        include: {
          galleryImages: {
            where: { isActive: true },
            select: {
              id: true,
              title: true,
              description: true,
              imageUrl: true,
              fileType: true,
              mimeType: true,
              displayOrder: true,
              isActive: true,
              createdAt: true
            },
            orderBy: { displayOrder: 'asc' },
            take: 5 // Limit to first 5 images for performance
          }
        }
      })
      
      // Maintain the random order
      projects = shuffledIds.map(id => projects.find(p => p.id === id)).filter(Boolean)
    } else {
      projects = await prisma.project.findMany({
        where,
        orderBy,
        skip: page ? skip : undefined,
        take: itemsPerPage,
        include: {
          galleryImages: {
            where: { isActive: true },
            select: {
              id: true,
              title: true,
              description: true,
              imageUrl: true,
              fileType: true,
              mimeType: true,
              displayOrder: true,
              isActive: true,
              createdAt: true
            },
            orderBy: { displayOrder: 'asc' },
            take: 5 // Limit to first 5 images for performance
          }
        }
      })
    }

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / itemsPerPage)
    const hasNextPage = currentPage < totalPages
    const hasPreviousPage = currentPage > 1

    return NextResponse.json({
      projects,
      pagination: {
        currentPage,
        pageSize: itemsPerPage,
        totalCount,
        totalPages,
        hasNextPage,
        hasPreviousPage
      }
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, location, category, imageUrls, completedAt, isActive } = body

    // Validate required fields
    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    // Create the project
    const project = await prisma.project.create({
      data: {
        title: title.trim(),
        description: description?.trim() || null,
        location: location?.trim() || null,
        category: category?.trim() || null,
        imageUrls: imageUrls || [],
        completedAt: completedAt ? new Date(completedAt) : null,
        isActive: isActive !== undefined ? isActive : true
      }
    })

    return NextResponse.json({
      success: true,
      project
    })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 })
    }

    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) }
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    // Mark as inactive in database instead of hard delete
    await prisma.project.update({
      where: { id: parseInt(id) },
      data: { isActive: false }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}