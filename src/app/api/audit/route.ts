import { createServerClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const teamId = searchParams.get('teamId')
    const limit = searchParams.get('limit') || '100'

    if (!teamId) {
      return NextResponse.json({ error: 'teamId required' }, { status: 400 })
    }

    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('audit_logs')
      .select('*, users(name, email)')
      .eq('team_id', teamId)
      .order('created_at', { ascending: false })
      .limit(Number(limit))

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ logs: data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}