import { NextRequest, NextResponse } from 'next/server'

let globalFeatures = {
  subscriptions: false,
  boosts: false,
  commissions: false,
  mobileMoney: false,
  photoService: false,
  trialActive: true,
  showUpgradeBanner: false,
  chatbot: true,
  darkMode: true,
  messaging: true,
  reviews: true,
  pdfExport: true,
  virtualTour: true,
  blog: true,
  notifications: true,
  compareTool: true,
}

export async function GET() {
  return NextResponse.json(globalFeatures)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  if (body.action === 'toggle') {
    globalFeatures = { ...globalFeatures, [body.key]: body.value }
  }
  
  if (body.action === 'saveAll') {
    globalFeatures = { ...globalFeatures, ...body.features }
  }

  return NextResponse.json({ success: true, features: globalFeatures })
}
