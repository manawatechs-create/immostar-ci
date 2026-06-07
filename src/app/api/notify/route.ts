import { NextRequest, NextResponse } from 'next/server'

let notificationsSent: any[] = []

export async function POST(request: NextRequest) {
  const { phone, message, type } = await request.json()

  const notification = {
    id: Date.now(),
    phone,
    message,
    type, // 'welcome', 'reminder', 'payment', 'boost'
    sentAt: new Date().toISOString(),
    status: 'sent',
  }

  notificationsSent.push(notification)
  console.log(`📱 SMS envoyé à ${phone}: ${message}`)

  return NextResponse.json({
    success: true,
    message: 'Notification envoyée',
    notification,
  })
}

export async function GET() {
  return NextResponse.json({
    total: notificationsSent.length,
    today: notificationsSent.filter(n => {
      return new Date(n.sentAt).toDateString() === new Date().toDateString()
    }).length,
    recent: notificationsSent.slice(-10),
  })
}
