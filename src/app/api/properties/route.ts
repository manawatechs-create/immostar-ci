import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const city = searchParams.get('city')
    const type = searchParams.get('type') || searchParams.get('property_type')
    const listingType = searchParams.get('listing_type')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')

    let whereConditions: string[] = ['status = $1']
    let params: any[] = ['available']
    let paramCount = 2

    if (city) {
      whereConditions.push(`city = $${paramCount}`)
      params.push(city)
      paramCount++
    }
    if (type) {
      whereConditions.push(`property_type = $${paramCount}`)
      params.push(type)
      paramCount++
    }
    if (listingType) {
      whereConditions.push(`listing_type = $${paramCount}`)
      params.push(listingType)
      paramCount++
    }
    if (featured === 'true') {
      whereConditions.push('is_featured = true')
    }
    if (minPrice) {
      whereConditions.push(`price >= $${paramCount}`)
      params.push(parseInt(minPrice))
      paramCount++
    }
    if (maxPrice) {
      whereConditions.push(`price <= $${paramCount}`)
      params.push(parseInt(maxPrice))
      paramCount++
    }
    if (search) {
      whereConditions.push(`(title ILIKE $${paramCount} OR city ILIKE $${paramCount} OR district ILIKE $${paramCount})`)
      params.push(`%${search}%`)
      paramCount++
    }

    const whereClause = whereConditions.join(' AND ')

    // Compter le total
    const countResult = await query(
      `SELECT COUNT(*) FROM properties WHERE ${whereClause}`,
      params
    )
    const total = parseInt(countResult.rows[0].count)

    // Récupérer les données paginées
    const offset = (page - 1) * limit
    const result = await query(
      `SELECT * FROM properties WHERE ${whereClause} ORDER BY created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`,
      [...params, limit, offset]
    )

    return NextResponse.json({
      data: result.rows,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error: any) {
    console.error('Database error:', error.message)
    return NextResponse.json({
      data: [],
      total: 0,
      page: 1,
      limit: 12,
      totalPages: 0,
      error: 'Erreur base de données'
    }, { status: 200 }) // Retourne 200 avec data vide pour ne pas casser le front
  }
}
