import { createServerClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { teamId, userId, tool, action, context, riskLevel } = body

    if (!teamId || !userId || !tool || !action || !context) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('permission_requests')
      .insert({
        user_id: userId,
        team_id: teamId,
        tool,
        action,
        context,
        risk_level: riskLevel || 'medium',
        status: 'pending',
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Log to audit
    await supabase.from('audit_logs').insert({
      team_id: teamId,
      user_id: userId,
      action: 'permission_requested',
      resource_type: 'permission_request',
      resource_id: data.id,
      details: { tool, action, risk_level: riskLevel || 'medium' },
    })

    return NextResponse.json({ request: data }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const teamId = searchParams.get('teamId')
    const status = searchParams.get('status')

    if (!teamId) {
      return NextResponse.json({ error: 'teamId required' }, { status: 400 })
    }

    const supabase = createServerClient()

    let query = supabase
      .from('permission_requests')
      .select('*, users(name, email)')
      .eq('team_id', teamId)
      .order('created_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ requests: data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}