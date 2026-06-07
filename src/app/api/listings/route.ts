import { NextRequest, NextResponse } from 'next/server'

// Stockage des annonces (en mémoire pour la démo)
let listings: any[] = [
  {
    id: 1,
    title: "Villa Moderne Cocody",
    price: 85000000,
    city: "Abidjan",
    district: "Cocody",
    category: "villa",
    type: "sale",
    phone: "+225 07 00 00 01",
    description: "Magnifique villa avec piscine",
    images: [],
    createdAt: "2025-01-15",
    status: "active"
  },
  {
    id: 2,
    title: "Appartement Plateau",
    price: 450000,
    city: "Abidjan",
    district: "Plateau",
    category: "apartment",
    type: "rent",
    phone: "+225 07 00 00 02",
    description: "Bel appartement au centre-ville",
    images: [],
    createdAt: "2025-01-14",
    status: "active"
  }
]

// GET - Récupérer toutes les annonces
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const city = searchParams.get('city')
  const type = searchParams.get('type')
  const category = searchParams.get('category')

  let filtered = [...listings].filter(l => l.status === 'active')

  if (city) filtered = filtered.filter(l => l.city === city)
  if (type) filtered = filtered.filter(l => l.type === type)
  if (category) filtered = filtered.filter(l => l.category === category)

  // Trier par date (plus récent d'abord)
  filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return NextResponse.json(filtered)
}

// POST - Créer une nouvelle annonce
export async function POST(request: NextRequest) {
  const data = await request.json()
  
  const newListing = {
    id: listings.length + 1,
    ...data,
    createdAt: new Date().toISOString(),
    status: 'active',
    views: 0
  }

  listings.unshift(newListing) // Ajouter au début du tableau
  
  console.log('📝 Nouvelle annonce publiée:', newListing.title)
  console.log('📊 Total annonces:', listings.length)

  return NextResponse.json({ 
    success: true, 
    listing: newListing,
    message: 'Annonce publiée avec succès !'
  }, { status: 201 })
}
