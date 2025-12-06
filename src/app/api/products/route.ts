import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')
    const coverage = searchParams.get('coverage')
    
    const skip = (page - 1) * limit
    
    // Build where clause
    const where: any = {
      status: 'ACTIVE'
    }
    
    if (category) {
      where.category = {
        slug: category
      }
    }
    
    if (featured === 'true') {
      where.featured = true
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }
    
    if (coverage) {
      where.coverageLevel = coverage.toUpperCase()
    }
    
    // Get products
    const products = await db.product.findMany({
      where,
      include: {
        variants: {
          select: {
            id: true,
            sku: true,
            size: true,
            color: true,
            colorHex: true,
            price: true,
            stock: true
          }
        },
        images: {
          select: {
            id: true,
            url: true,
            altText: true,
            position: true
          },
          orderBy: {
            position: 'asc'
          }
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: limit
    })
    
    // Get total count for pagination
    const total = await db.product.count({ where })
    
    // Format response
    const formattedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      coverageLevel: product.coverageLevel,
      fabricType: product.fabricType,
      activityType: product.activityType,
      basePrice: product.basePrice,
      comparePrice: product.comparePrice,
      images: product.images,
      variants: product.variants,
      category: product.category,
      tags: product.tags ? JSON.parse(product.tags) : [],
      featured: product.featured,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }))
    
    return NextResponse.json({
      products: formattedProducts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const product = await db.product.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        coverageLevel: body.coverageLevel,
        fabricType: body.fabricType,
        activityType: body.activityType,
        basePrice: body.basePrice,
        comparePrice: body.comparePrice,
        categoryId: body.categoryId,
        tags: body.tags ? JSON.stringify(body.tags) : null,
        metaTitle: body.metaTitle,
        metaDesc: body.metaDesc,
        featured: body.featured || false,
        status: body.status || 'ACTIVE'
      }
    })
    
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}