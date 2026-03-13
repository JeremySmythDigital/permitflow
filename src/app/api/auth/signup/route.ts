import { createServerClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, teamName, password } = body

    if (!name || !email || !teamName || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = createServerClient()

    // Create team
    const { data: team, error: teamError } = await supabase
      .from('teams')
      .insert({ name: teamName })
      .select()
      .single()

    if (teamError) {
      return NextResponse.json({ error: teamError.message }, { status: 500 })
    }

    // Create user
    const { data: user, error: userError } = await supabase
      .from('users')
      .insert({
        name,
        email,
        team_id: team.id,
        role: 'admin',
      })
      .select()
      .single()

    if (userError) {
      // Cleanup team
      await supabase.from('teams').delete().eq('id', team.id)
      return NextResponse.json({ error: userError.message }, { status: 500 })
    }

    // Log audit
    await supabase.from('audit_logs').insert({
      team_id: team.id,
      user_id: user.id,
      action: 'team_created',
      resource_type: 'team',
      resource_id: team.id,
      details: { team_name: teamName, email },
    })

    return NextResponse.json({ 
      user, 
      team,
      message: 'Account created successfully' 
    }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}