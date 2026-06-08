import { NextRequest, NextResponse } from 'next/server'

let globalState = {
  features: {
    chatbot: true,
    darkMode: true,
    blog: true,
    messaging: true,
    reviews: true,
    pdfExport: true,
    virtualTour: true,
    compareTool: true,
    notifications: true,
    subscriptions: false,
    boosts: false,
    commissions: false,
    showUpgradeBanner: false,
    trialActive: true,
  },
  settings: {
    siteName: 'ImmoStar',
    commissionRate: 3,
    trialDays: 90,
  },
  lastUpdate: new Date().toISOString(),
  updateCount: 0,
}

export async function GET(request: NextRequest) {
  const since = request.nextUrl.searchParams.get('since')
  
  if (since && since === globalState.lastUpdate) {
    return NextResponse.json({ unchanged: true, lastUpdate: globalState.lastUpdate })
  }

  return NextResponse.json({ ...globalState, unchanged: false })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { action, data } = body

  if (action === 'toggleFeature') {
    globalState.features[data.key] = data.value
    globalState.updateCount++
    globalState.lastUpdate = new Date().toISOString()
  }
  
  if (action === 'updateFeatures') {
    globalState.features = { ...globalState.features, ...data }
    globalState.updateCount++
    globalState.lastUpdate = new Date().toISOString()
  }

  if (action === 'ping') {
    // Juste pour vérifier la connexion
  }

  return NextResponse.json({ success: true, lastUpdate: globalState.lastUpdate })
}
