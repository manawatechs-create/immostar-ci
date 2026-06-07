import { NextRequest, NextResponse } from 'next/server'

// Système de boost d'annonces
let boostedProperties: any[] = []

export async function POST(request: NextRequest) {
  const { propertyId, type } = await request.json()
  
  const boostOptions = {
    'top-3days': { name: 'Top recherche 3 jours', price: 5000, duration: 3 },
    'top-7days': { name: 'Top recherche 7 jours', price: 10000, duration: 7 },
    'urgent': { name: 'Urgent !', price: 3000, duration: 7 },
    'premium': { name: 'Premium +', price: 15000, duration: 30 },
  }

  const option = boostOptions[type as keyof typeof boostOptions]
  if (!option) {
    return NextResponse.json({ error: 'Option invalide' }, { status: 400 })
  }

  boostedProperties.push({
    propertyId,
    type,
    ...option,
    activatedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + option.duration * 86400000).toISOString(),
  })

  return NextResponse.json({ 
    success: true, 
    message: `✅ Annonce boostée en "${option.name}" pour ${option.price.toLocaleString()} FCFA`,
    price: option.price 
  })
}

export async function GET() {
  return NextResponse.json({ boostedProperties })
}
