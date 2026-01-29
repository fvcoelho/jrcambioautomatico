import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const projectId = parseInt(params.id)
    
    if (isNaN(projectId)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { imageOrders } = body

    if (!imageOrders || !Array.isArray(imageOrders)) {
      return NextResponse.json(
        { error: 'Invalid image orders data' },
        { status: 400 }
      )
    }

    // Verify project exists
    const project = await prisma.project.findUnique({
      where: { id: projectId }
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    // Update all image orders in a transaction
    await prisma.$transaction(
      imageOrders.map((order: { id: number; displayOrder: number }) =>
        prisma.galleryImage.update({
          where: { 
            id: order.id,
            projectId: projectId // Ensure image belongs to this project
          },
          data: { displayOrder: order.displayOrder }
        })
      )
    )

    // Fetch updated images
    const updatedImages = await prisma.galleryImage.findMany({
      where: { projectId },
      orderBy: { displayOrder: 'asc' }
    })

    return NextResponse.json({
      success: true,
      images: updatedImages
    })
  } catch (error) {
    console.error('Error updating image order:', error)
    return NextResponse.json(
      { error: 'Failed to update image order' },
      { status: 500 }
    )
  }
}