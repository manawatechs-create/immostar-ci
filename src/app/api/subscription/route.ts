import { NextRequest, NextResponse } from 'next/server'

let subscriptions: any[] = []
let freeTrialUsers: any[] = []

export async function POST(request: NextRequest) {
  const { userId, plan, phone } = await request.json()
  
  // Vérifier si l'utilisateur a déjà utilisé son essai gratuit
  const hasUsedTrial = freeTrialUsers.includes(userId || phone)
  
  const plans: any = {
    'free': { name: 'Gratuit', price: 0, properties: 3, duration: 0, trial: false },
    'pro': { name: 'Pro', price: hasUsedTrial ? 25000 : 0, properties: -1, duration: 30, trial: !hasUsedTrial },
    'agency': { name: 'Agence', price: hasUsedTrial ? 50000 : 0, properties: -1, duration: 30, trial: !hasUsedTrial },
  }

  const selectedPlan = plans[plan]
  if (!selectedPlan) {
    return NextResponse.json({ error: 'Plan invalide' }, { status: 400 })
  }

  // Essai gratuit de 7 jours pour Pro et Agence
  if (selectedPlan.trial && !hasUsedTrial) {
    freeTrialUsers.push(userId || phone)
    return NextResponse.json({
      success: true,
      trial: true,
      message: `🎉 Essai gratuit de 7 jours activé ! Vous pourrez publier des biens illimités pendant 7 jours.`,
      expiresAt: new Date(Date.now() + 7 * 86400000).toISOString(),
    })
  }

  const subscription = {
    id: subscriptions.length + 1,
    userId,
    plan: selectedPlan.name,
    price: selectedPlan.price,
    startedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 30 * 86400000).toISOString(),
    status: 'active',
  }

  subscriptions.push(subscription)

  return NextResponse.json({
    success: true,
    subscription,
    message: `✅ Abonnement ${selectedPlan.name} activé !`,
  })
}

export async function GET() {
  const monthlyRevenue = subscriptions
    .filter(s => s.status === 'active')
    .reduce((sum, s) => sum + s.price, 0)

  return NextResponse.json({
    subscriptions,
    freeTrialUsers: freeTrialUsers.length,
    monthlyRevenue,
    stats: {
      totalSubscribers: subscriptions.length,
      activeSubscribers: subscriptions.filter(s => s.status === 'active').length,
      trialUsers: freeTrialUsers.length,
      conversionRate: freeTrialUsers.length > 0 
        ? Math.round((subscriptions.filter(s => s.price > 0).length / freeTrialUsers.length) * 100) 
        : 0,
    }
  })
}
