import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { count: totalProperties } = await supabase
      .from('properties')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'available')
    
    const { count: totalAgencies } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('user_type', 'agency')
    
    return NextResponse.json({
      totalProperties: totalProperties || 0,
      totalAgencies: totalAgencies || 0,
      totalTransactions: 0,
      satisfiedClients: 0
    })
  } catch (error: any) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    )
  }
}
