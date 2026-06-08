import { NextRequest, NextResponse } from 'next/server'

// Données de démonstration avec images réelles
const demoListings = [
  {
    id: 101,
    title: "Villa Moderne Cocody - Piscine & Jardin",
    price: 85000000,
    city: "Abidjan",
    district: "Cocody",
    category: "villa",
    type: "sale",
    phone: "+225 07 08 43 21 72",
    description: "Magnifique villa moderne située dans le quartier résidentiel de Cocody. 5 chambres, 3 salles de bain, piscine, jardin paysager, garage double, sécurité 24/7. Proche des écoles et commerces.",
    bedrooms: 5,
    bathrooms: 3,
    area_sqm: 350,
    isFurnished: false,
    isFeatured: true,
    rating: 4.8,
    views: 1234,
    createdAt: "2026-06-01",
    status: "active",
    features: ["Piscine", "Garage", "Jardin", "Sécurité 24/7", "Climatisation", "Groupe électrogène"],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"
    ]
  },
  {
    id: 102,
    title: "Appartement Luxueux Plateau - Vue Panoramique",
    price: 450000,
    city: "Abidjan",
    district: "Plateau",
    category: "apartment",
    type: "rent",
    phone: "+225 07 08 43 21 72",
    description: "Superbe appartement rénové au cœur du Plateau. 3 chambres, 2 salles de bain, cuisine équipée, climatisation, parking sécurisé. Vue imprenable sur la lagune.",
    bedrooms: 3,
    bathrooms: 2,
    area_sqm: 120,
    isFurnished: true,
    isFeatured: true,
    rating: 4.6,
    views: 856,
    createdAt: "2026-06-02",
    status: "active",
    features: ["Climatisation", "Cuisine équipée", "Parking", "Vue lagune", "Ascenseur"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop"
    ]
  },
  {
    id: 103,
    title: "Duplex Grand-Bassam - Bord de Mer",
    price: 65000000,
    city: "Grand-Bassam",
    district: "Quartier France",
    category: "house",
    type: "sale",
    phone: "+225 07 08 43 21 72",
    description: "Magnifique duplex à 5 minutes de la plage. 4 chambres, 3 salles de bain, grand salon, terrasse, jardin tropical. Idéal pour résidence secondaire ou investissement locatif.",
    bedrooms: 4,
    bathrooms: 3,
    area_sqm: 280,
    isFurnished: false,
    isFeatured: true,
    rating: 4.7,
    views: 678,
    createdAt: "2026-06-03",
    status: "active",
    features: ["Terrasse", "Jardin tropical", "Parking", "Proche plage", "Eau chaude"],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop"
    ]
  },
  {
    id: 104,
    title: "Studio Meublé Marcory - WiFi & Clim",
    price: 250000,
    city: "Abidjan",
    district: "Marcory",
    category: "studio",
    type: "rent",
    phone: "+225 07 08 43 21 72",
    description: "Studio moderne entièrement meublé et équipé. WiFi haut débit, climatisation, cuisine équipée, salle de bain privative. Idéal pour étudiant ou jeune professionnel.",
    bedrooms: 1,
    bathrooms: 1,
    area_sqm: 45,
    isFurnished: true,
    isFeatured: false,
    rating: 4.5,
    views: 445,
    createdAt: "2026-06-04",
    status: "active",
    features: ["WiFi", "Climatisation", "Cuisine équipée", "Meublé", "Sécurité"],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop"
    ]
  },
  {
    id: 105,
    title: "Penthouse Deux Plateaux - Luxe Absolu",
    price: 950000,
    city: "Abidjan",
    district: "Deux Plateaux",
    category: "penthouse",
    type: "rent",
    phone: "+225 07 08 43 21 72",
    description: "Penthouse d'exception au dernier étage avec terrasse panoramique. 4 chambres, 3 salles de bain, salon double, cuisine haut de gamme. Prestations luxueuses.",
    bedrooms: 4,
    bathrooms: 3,
    area_sqm: 200,
    isFurnished: true,
    isFeatured: true,
    rating: 4.9,
    views: 1567,
    createdAt: "2026-06-05",
    status: "active",
    features: ["Terrasse panoramique", "Cuisine haut de gamme", "Parking", "Ascenseur privé", "Sécurité 24/7"],
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop"
    ]
  },
  {
    id: 106,
    title: "Terrain Constructible Yamoussoukro",
    price: 15000000,
    city: "Yamoussoukro",
    district: "Centre-ville",
    category: "land",
    type: "sale",
    phone: "+225 07 08 43 21 72",
    description: "Grand terrain constructible de 1000m² bien situé. Titre foncier disponible. Idéal pour construction de villa ou immeuble. Proche des administrations.",
    bedrooms: 0,
    bathrooms: 0,
    area_sqm: 1000,
    isFurnished: false,
    isFeatured: false,
    rating: 4.2,
    views: 234,
    createdAt: "2026-06-06",
    status: "active",
    features: ["Titre foncier", "Viabilisé", "Proche route", "Quartier calme"],
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop"
    ]
  },
  {
    id: 107,
    title: "Local Commercial Zone 4 - Idéal Business",
    price: 750000,
    city: "Abidjan",
    district: "Zone 4",
    category: "commercial",
    type: "rent",
    phone: "+225 07 08 43 21 72",
    description: "Espace commercial moderne et lumineux. 150m², vitrine sur rue passante, parking clients, climatisation. Idéal pour bureau, showroom ou commerce.",
    bedrooms: 0,
    bathrooms: 1,
    area_sqm: 150,
    isFurnished: false,
    isFeatured: false,
    rating: 4.4,
    views: 567,
    createdAt: "2026-06-07",
    status: "active",
    features: ["Vitrine", "Parking clients", "Climatisation", "Sécurité", "Proche banques"],
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
    ]
  },
  {
    id: 108,
    title: "Villa Meublée Bassam - Vacances Rêvées",
    price: 85000,
    city: "Grand-Bassam",
    district: "Bord de mer",
    category: "villa",
    type: "vacation",
    phone: "+225 07 08 43 21 72",
    description: "Villa de vacances entièrement meublée avec piscine privée. 6 chambres, 4 salles de bain, cuisine équipée, WiFi, climatisation. Parfaite pour séjours en famille.",
    bedrooms: 6,
    bathrooms: 4,
    area_sqm: 500,
    isFurnished: true,
    isFeatured: true,
    rating: 5.0,
    views: 2345,
    createdAt: "2026-06-08",
    status: "active",
    features: ["Piscine privée", "WiFi", "Climatisation", "Cuisine équipée", "Jardin", "Parking"],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
    ]
  }
]

let listings = [...demoListings]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const city = searchParams.get('city')
  const type = searchParams.get('type')
  const category = searchParams.get('category')
  const search = searchParams.get('search')
  const featured = searchParams.get('featured')

  let filtered = [...listings].filter(l => l.status === 'active')

  if (city) filtered = filtered.filter(l => l.city === city)
  if (type) filtered = filtered.filter(l => l.type === type)
  if (category) filtered = filtered.filter(l => l.category === category)
  if (featured === 'true') filtered = filtered.filter(l => l.isFeatured)
  if (search) {
    const s = search.toLowerCase()
    filtered = filtered.filter(l => 
      l.title.toLowerCase().includes(s) || 
      l.city.toLowerCase().includes(s) || 
      l.district.toLowerCase().includes(s)
    )
  }

  filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return NextResponse.json(filtered)
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  
  const newListing = {
    id: Date.now(),
    ...data,
    price: parseInt(data.price) || 0,
    views: 0,
    rating: 4.0,
    createdAt: new Date().toISOString(),
    status: 'active',
    images: data.images || [],
    features: data.features || [],
  }

  listings.unshift(newListing)
  
  return NextResponse.json({ success: true, listing: newListing }, { status: 201 })
}
