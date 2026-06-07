import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    console.log('📊 Tracking:', {
      page: data.page,
      source: data.source,
      device: data.device || 'unknown',
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    total: 12580,
    today: 234,
    current: 12,
    sources: [
      { name: 'google', count: 4230 },
      { name: 'facebook', count: 2150 },
      { name: 'whatsapp', count: 1890 },
      { name: 'direct', count: 1560 },
    ],
    devices: [
      { name: 'mobile', count: 6780 },
      { name: 'desktop', count: 4120 },
      { name: 'tablet', count: 1680 },
    ],
    recentVisits: [],
  })
}
