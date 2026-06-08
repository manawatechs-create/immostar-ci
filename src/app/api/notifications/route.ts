import { NextRequest, NextResponse } from 'next/server'

let notifications: any[] = [
  { id: 1, type: 'email', to: 'kouadio@email.com', subject: 'Nouveau contact', message: 'Quelqu\'un est intéressé par votre bien', sentAt: '2026-06-08T10:30:00', status: 'sent' },
  { id: 2, type: 'sms', to: '+225 07 00 00 01', message: 'Nouveau message sur ImmoStar', sentAt: '2026-06-08T11:00:00', status: 'sent' },
]

export async function GET() {
  return NextResponse.json({ total: notifications.length, notifications: notifications.slice(-20) })
}

export async function POST(request: NextRequest) {
  const { type, to, subject, message } = await request.json()
  
  const notif = { id: Date.now(), type, to, subject, message, sentAt: new Date().toISOString(), status: 'sent' }
  notifications.push(notif)
  
  return NextResponse.json({ success: true, notification: notif })
}
