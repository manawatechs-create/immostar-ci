import { NextRequest, NextResponse } from 'next/server'

// Données de démo PERSISTANTES (ne disparaissent pas)
const DEMO_LISTINGS = [
  {
    id: 101, title: "Villa Moderne Cocody - Piscine & Jardin", price: 85000000,
    city: "Abidjan", district: "Cocody", category: "villa", type: "sale",
    phone: "+225 07 08 43 21 72", description: "Magnifique villa moderne avec piscine, jardin paysager, garage double. 5 chambres, 3 salles de bain.",
    bedrooms: 5, bathrooms: 3, area_sqm: 350, isFurnished: false, isFeatured: true, rating: 4.8, views: 1234,
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"],
    features: ["Piscine", "Garage", "Jardin", "Sécurité 24/7", "Climatisation"], status: "active", created_at: "2026-06-01"
  },
  {
    id: 102, title: "Appartement Luxueux Plateau - Vue Lagune", price: 450000,
    city: "Abidjan", district: "Plateau", category: "apartment", type: "rent",
    phone: "+225 07 08 43 21 72", description: "Superbe appartement rénové au cœur du Plateau. 3 chambres, cuisine équipée, parking.",
    bedrooms: 3, bathrooms: 2, area_sqm: 120, isFurnished: true, isFeatured: true, rating: 4.6, views: 856,
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"],
    features: ["Climatisation", "Cuisine équipée", "Parking", "Ascenseur"], status: "active", created_at: "2026-06-02"
  },
  {
    id: 103, title: "Duplex Grand-Bassam - Bord de Mer", price: 65000000,
    city: "Grand-Bassam", district: "Quartier France", category: "house", type: "sale",
    phone: "+225 07 08 43 21 72", description: "Magnifique duplex à 5min de la plage. 4 chambres, jardin tropical, terrasse.",
    bedrooms: 4, bathrooms: 3, area_sqm: 280, isFurnished: false, isFeatured: true, rating: 4.7, views: 678,
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"],
    features: ["Terrasse", "Jardin tropical", "Parking", "Proche plage"], status: "active", created_at: "2026-06-03"
  },
  {
    id: 104, title: "Studio Meublé Marcory - WiFi & Clim", price: 250000,
    city: "Abidjan", district: "Marcory", category: "studio", type: "rent",
    phone: "+225 07 08 43 21 72", description: "Studio moderne entièrement meublé. WiFi, climatisation, cuisine équipée.",
    bedrooms: 1, bathrooms: 1, area_sqm: 45, isFurnished: true, isFeatured: false, rating: 4.5, views: 445,
    images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"],
    features: ["WiFi", "Climatisation", "Cuisine équipée", "Meublé"], status: "active", created_at: "2026-06-04"
  },
  {
    id: 105, title: "Penthouse Deux Plateaux - Luxe Absolu", price: 950000,
    city: "Abidjan", district: "Deux Plateaux", category: "penthouse", type: "rent",
    phone: "+225 07 08 43 21 72", description: "Penthouse d'exception avec terrasse panoramique. Prestations haut de gamme.",
    bedrooms: 4, bathrooms: 3, area_sqm: 200, isFurnished: true, isFeatured: true, rating: 4.9, views: 1567,
    images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop"],
    features: ["Terrasse panoramique", "Ascenseur privé", "Parking", "Sécurité 24/7"], status: "active", created_at: "2026-06-05"
  },
  {
    id: 106, title: "Terrain Constructible Yamoussoukro", price: 15000000,
    city: "Yamoussoukro", district: "Centre-ville", category: "land", type: "sale",
    phone: "+225 07 08 43 21 72", description: "Grand terrain de 1000m² avec titre foncier. Idéal construction.",
    bedrooms: 0, bathrooms: 0, area_sqm: 1000, isFurnished: false, isFeatured: false, rating: 4.2, views: 234,
    images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop"],
    features: ["Titre foncier", "Viabilisé", "Proche route"], status: "active", created_at: "2026-06-06"
  },
  {
    id: 107, title: "Local Commercial Zone 4 - Idéal Business", price: 750000,
    city: "Abidjan", district: "Zone 4", category: "commercial", type: "rent",
    phone: "+225 07 08 43 21 72", description: "Espace commercial moderne avec vitrine sur rue passante.",
    bedrooms: 0, bathrooms: 1, area_sqm: 150, isFurnished: false, isFeatured: false, rating: 4.4, views: 567,
    images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"],
    features: ["Vitrine", "Parking", "Climatisation", "Sécurité"], status: "active", created_at: "2026-06-07"
  },
  {
    id: 108, title: "Villa Meublée Bassam - Vacances Rêvées", price: 85000,
    city: "Grand-Bassam", district: "Bord de mer", category: "villa", type: "vacation",
    phone: "+225 07 08 43 21 72", description: "Villa de vacances avec piscine privée. 6 chambres, WiFi, climatisation.",
    bedrooms: 6, bathrooms: 4, area_sqm: 500, isFurnished: true, isFeatured: true, rating: 5.0, views: 2345,
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop"],
    features: ["Piscine privée", "WiFi", "Climatisation", "Jardin", "Parking"], status: "active", created_at: "2026-06-08"
  }
]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const city = searchParams.get('city')
  const type = searchParams.get('type')
  const search = searchParams.get('search')
  const featured = searchParams.get('featured')

  let filtered = [...DEMO_LISTINGS]

  if (city) filtered = filtered.filter(l => l.city === city)
  if (type) filtered = filtered.filter(l => l.type === type)
  if (featured === 'true') filtered = filtered.filter(l => l.isFeatured)
  if (search) {
    const s = search.toLowerCase()
    filtered = filtered.filter(l => l.title.toLowerCase().includes(s) || l.city.toLowerCase().includes(s) || l.district?.toLowerCase().includes(s))
  }

  return NextResponse.json(filtered)
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  const newListing = {
    id: Date.now(),
    ...data,
    price: parseInt(data.price) || 0,
    rating: 4.0,
    views: 0,
    status: 'active',
    created_at: new Date().toISOString(),
    images: data.images || [],
    features: data.features || [],
  }
  
  DEMO_LISTINGS.unshift(newListing)
  
  return NextResponse.json({ success: true, listing: newListing }, { status: 201 })
}
