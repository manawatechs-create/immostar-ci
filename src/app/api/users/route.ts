import { NextRequest, NextResponse } from 'next/server'

// Simuler une base de données d'utilisateurs
let users: any[] = [
  {
    id: 1,
    name: 'M. Kouadio',
    email: 'kouadio@email.com',
    phone: '+225 07 00 00 01',
    type: 'owner',
    registeredAt: '2025-01-10',
    totalProperties: 3,
    soldProperties: 1,
    totalCommissionDue: 2550000,
    commissionPaid: 2550000,
    properties: [
      { id: 1, title: 'Villa Moderne Cocody', status: 'sold', price: 85000000, commission: 2550000, commissionPaid: true },
      { id: 4, title: 'Appartement Cocody', status: 'active', price: 35000000, commission: 0, commissionPaid: false },
    ]
  },
  {
    id: 2,
    name: 'Agence ImmoPlus',
    email: 'contact@immoplus.ci',
    phone: '+225 07 00 00 02',
    type: 'agency',
    registeredAt: '2025-01-05',
    totalProperties: 5,
    soldProperties: 2,
    totalCommissionDue: 4450000,
    commissionPaid: 1950000,
    properties: [
      { id: 2, title: 'Duplex Bassam', status: 'sold', price: 65000000, commission: 1950000, commissionPaid: true },
      { id: 5, title: 'Terrain Yamoussoukro', status: 'pending', price: 15000000, commission: 450000, commissionPaid: false },
      { id: 6, title: 'Immeuble Plateau', status: 'sold', price: 250000000, commission: 2500000, commissionPaid: false },
    ]
  },
  {
    id: 3,
    name: 'Mme. Koné',
    email: 'kone@email.com',
    phone: '+225 07 00 00 03',
    type: 'owner',
    registeredAt: '2025-01-18',
    totalProperties: 1,
    soldProperties: 0,
    totalCommissionDue: 0,
    commissionPaid: 0,
    properties: [
      { id: 3, title: 'Studio Marcory', status: 'active', price: 250000, commission: 0, commissionPaid: false },
    ]
  },
]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const userId = searchParams.get('id')
  
  if (userId) {
    const user = users.find(u => u.id === parseInt(userId))
    return NextResponse.json(user || null)
  }

  // Stats globales
  const totalUsers = users.length
  const totalOwners = users.filter(u => u.type === 'owner').length
  const totalAgencies = users.filter(u => u.type === 'agency').length
  const totalCommissionPending = users.reduce((sum, u) => {
    return sum + u.properties
      .filter((p: any) => !p.commissionPaid && p.status === 'sold')
      .reduce((s: number, p: any) => s + p.commission, 0)
  }, 0)
  const totalCommissionCollected = users.reduce((sum, u) => sum + u.commissionPaid, 0)

  return NextResponse.json({
    users,
    stats: {
      totalUsers,
      totalOwners,
      totalAgencies,
      totalCommissionPending,
      totalCommissionCollected,
    }
  })
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  const newUser = {
    id: users.length + 1,
    ...data,
    registeredAt: new Date().toISOString(),
    totalProperties: 0,
    soldProperties: 0,
    totalCommissionDue: 0,
    commissionPaid: 0,
    properties: [],
  }
  users.push(newUser)
  return NextResponse.json({ success: true, user: newUser }, { status: 201 })
}
