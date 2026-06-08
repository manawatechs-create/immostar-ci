import { NextRequest, NextResponse } from 'next/server'

let publicationsByPhone: Record<string, number> = {}
const FREE_LIMIT = 3

export async function POST(request: NextRequest) {
  const { phone } = await request.json()
  
  if (!phone) {
    return NextResponse.json({ error: 'Telephone requis' }, { status: 400 })
  }

  const cleanPhone = phone.replace(/[\s+]/g, '')
  const count = publicationsByPhone[cleanPhone] || 0
  
  if (count >= FREE_LIMIT) {
    return NextResponse.json({
      canPublish: false,
      published: count,
      limit: FREE_LIMIT,
      message: `Vous avez atteint la limite de ${FREE_LIMIT} biens gratuits.`,
      requireRegistration: true,
    })
  }

  publicationsByPhone[cleanPhone] = count + 1

  return NextResponse.json({
    canPublish: true,
    published: count + 1,
    limit: FREE_LIMIT,
    remaining: FREE_LIMIT - (count + 1),
  })
}

export async function GET(request: NextRequest) {
  const phone = request.nextUrl.searchParams.get('phone')
  
  if (phone) {
    const cleanPhone = phone.replace(/[\s+]/g, '')
    const count = publicationsByPhone[cleanPhone] || 0
    return NextResponse.json({
      published: count,
      limit: FREE_LIMIT,
      remaining: FREE_LIMIT - count,
      requireRegistration: count >= FREE_LIMIT,
    })
  }

  return NextResponse.json({ publicationsByPhone })
}
