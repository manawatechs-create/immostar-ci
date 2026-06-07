import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ 
        success: false, 
        message: 'Nom, email et message requis' 
      }, { status: 400 })
    }

    const result = await query(
      `INSERT INTO contacts (name, email, phone, subject, message) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, email, phone || '', subject || '', message]
    )

    return NextResponse.json({ 
      success: true, 
      data: result.rows[0],
      message: 'Message envoyé avec succès !'
    })
  } catch (error: any) {
    console.error('Contact error:', error.message)
    return NextResponse.json({ 
      success: false, 
      message: 'Erreur lors de l\'envoi. Réessayez plus tard.'
    }, { status: 500 })
  }
}
