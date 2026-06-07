import { NextRequest, NextResponse } from 'next/server'

let referrals: any[] = []

export async function POST(request: NextRequest) {
  const { referrerId, referredName, referredPhone } = await request.json()
  
  const referral = {
    id: referrals.length + 1,
    referrerId,
    referredName,
    referredPhone,
    date: new Date().toISOString(),
    status: 'pending',
    reward: 0,
  }

  referrals.push(referral)

  return NextResponse.json({
    success: true,
    message: '✅ Filleul enregistré ! Vous gagnerez 10% de commission si il vend un bien.',
    referral,
  })
}

export async function GET() {
  return NextResponse.json({ referrals, total: referrals.length })
}
