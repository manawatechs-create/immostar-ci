import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
  // Données mockées pour la démo
  const property = {
    id: id,
    title: "Villa Moderne Cocody",
    description: "Magnifique villa avec piscine et jardin dans le quartier résidentiel de Cocody.",
    price: 85000000,
    listing_type: "sale",
    city: "Abidjan",
    district: "Cocody",
    bedrooms: 5,
    bathrooms: 3,
    area_sqm: 350,
    rating: 4.9,
    views: 1234,
    features: ['Piscine', 'Garage', 'Jardin', 'Sécurité 24/7', 'Climatisation'],
    owner: { 
      name: "M. Kouadio", 
      phone: "+225 07 00 00 01", 
      email: "kouadio@email.com" 
    }
  }

  return NextResponse.json(property)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const data = await request.json()
  
  return NextResponse.json({ 
    success: true, 
    message: `Bien #${id} mis à jour`,
    data 
  })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
  return NextResponse.json({ 
    success: true, 
    message: `Bien #${id} supprimé` 
  })
}
