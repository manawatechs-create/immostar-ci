import { NextResponse } from 'next/server'

export async function GET() {
  const featuredProperties = [
    { id: 1, title: "Villa Moderne Cocody", price: 85000000, rating: 4.9, city: "Abidjan" },
    { id: 3, title: "Duplex Grand-Bassam", price: 65000000, rating: 4.7, city: "Grand-Bassam" },
    { id: 5, title: "Villa Vue Mer Bassam", price: 120000000, rating: 5.0, city: "Grand-Bassam" },
    { id: 7, title: "Penthouse Deux Plateaux", price: 950000, rating: 4.9, city: "Abidjan" },
  ]
  
  return NextResponse.json(featuredProperties)
}
