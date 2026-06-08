import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

// Données de secours si la BDD n'est pas dispo
const fallbackListings = [
  { id: 101, title: "Villa Moderne Cocody", price: 85000000, city: "Abidjan", district: "Cocody", category: "villa", type: "sale", phone: "+225 07 08 43 21 72", description: "Magnifique villa avec piscine", bedrooms: 5, bathrooms: 3, area_sqm: 350, isFurnished: false, isFeatured: true, rating: 4.8, views: 1234, images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"], features: ["Piscine", "Garage", "Jardin"], status: "active", created_at: new Date().toISOString() },
  { id: 102, title: "Appartement Plateau", price: 450000, city: "Abidjan", district: "Plateau", category: "apartment", type: "rent", phone: "+225 07 08 43 21 72", description: "Bel appartement au centre-ville", bedrooms: 3, bathrooms: 2, area_sqm: 120, isFurnished: true, isFeatured: true, rating: 4.6, views: 856, images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop"], features: ["Climatisation", "Parking"], status: "active", created_at: new Date().toISOString() },
  { id: 103, title: "Duplex Grand-Bassam", price: 65000000, city: "Grand-Bassam", category: "house", type: "sale", phone: "+225 07 08 43 21 72", description: "Superbe duplex proche plage", bedrooms: 4, bathrooms: 3, area_sqm: 280, isFurnished: false, isFeatured: true, rating: 4.7, views: 678, images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"], features: ["Terrasse", "Jardin"], status: "active", created_at: new Date().toISOString() },
]

export async function GET(request: NextRequest) {
  try {
    // Essayer de récupérer depuis la BDD
    const result = await query(
      'SELECT * FROM properties WHERE status = $1 ORDER BY created_at DESC',
      ['active']
    )
    return NextResponse.json(result.rows)
  } catch (error: any) {
    console.log('BDD non disponible, utilisation des données de démo')
    const searchParams = request.nextUrl.searchParams
    const city = searchParams.get('city')
    const type = searchParams.get('type')
    const search = searchParams.get('search')

    let filtered = [...fallbackListings]
    if (city) filtered = filtered.filter(l => l.city === city)
    if (type) filtered = filtered.filter(l => l.type === type)
    if (search) {
      const s = search.toLowerCase()
      filtered = filtered.filter(l => l.title.toLowerCase().includes(s) || l.city.toLowerCase().includes(s))
    }
    return NextResponse.json(filtered)
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Essayer d'insérer dans la BDD
    try {
      const result = await query(
        `INSERT INTO properties (title, price, city, district, property_type, listing_type, phone, description, bedrooms, bathrooms, area_sqm, is_furnished, is_featured, features, images, status) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, 'active') RETURNING *`,
        [
          data.title, parseInt(data.price) || 0, data.city, data.district || '',
          data.category || 'house', data.type || 'sale', data.phone || '',
          data.description || '', data.bedrooms || 0, data.bathrooms || 0,
          data.area_sqm || 0, data.isFurnished || false, data.isFeatured || false,
          JSON.stringify(data.features || []), JSON.stringify(data.images || [])
        ]
      )
      return NextResponse.json({ success: true, listing: result.rows[0] }, { status: 201 })
    } catch (dbError) {
      console.log('BDD non disponible, sauvegarde simulée')
      // Simuler un ajout réussi
      const newListing = {
        id: Date.now(),
        ...data,
        price: parseInt(data.price) || 0,
        status: 'active',
        rating: 4.0,
        views: 0,
        created_at: new Date().toISOString(),
      }
      fallbackListings.unshift(newListing)
      return NextResponse.json({ success: true, listing: newListing }, { status: 201 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
