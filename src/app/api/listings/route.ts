import { NextRequest, NextResponse } from 'next/server'

// Stockage en mémoire (sera réinitialisé au redémarrage du serveur)
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
    description: "Magnifique villa avec piscine et jardin",
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

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const city = searchParams.get('city')
  const type = searchParams.get('type')
  const category = searchParams.get('category')
  const search = searchParams.get('search')

  let filtered = [...listings].filter(l => l.status === 'active')

  if (city) filtered = filtered.filter(l => l.city === city)
  if (type) filtered = filtered.filter(l => l.type === type)
  if (category) filtered = filtered.filter(l => l.category === category)
  if (search) {
    const term = search.toLowerCase()
    filtered = filtered.filter(l => 
      l.title?.toLowerCase().includes(term) ||
      l.city?.toLowerCase().includes(term) ||
      l.district?.toLowerCase().includes(term)
    )
  }

  // Trier par date (plus récent d'abord)
  filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return NextResponse.json(filtered)
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  
  const newListing = {
    id: listings.length + 1,
    title: data.title,
    price: parseInt(data.price) || 0,
    city: data.city,
    district: data.district || '',
    category: data.category || 'house',
    type: data.type || 'sale',
    phone: data.phone || '',
    description: data.description || '',
    images: data.images || [],
    createdAt: new Date().toISOString(),
    status: 'active',
    views: 0
  }

  // Ajouter au début du tableau pour qu'il apparaisse en premier
  listings.unshift(newListing)
  
  console.log('📝 Nouvelle annonce:', newListing.title)
  console.log('📊 Total annonces:', listings.length)

  return NextResponse.json({ 
    success: true, 
    listing: newListing 
  }, { status: 201 })
}
