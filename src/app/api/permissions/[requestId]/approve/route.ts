import { createServerClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(
  request: Request,
  { params }: { params: { requestId: string } }
) {
  try {
    const body = await request.json()
    const { approverId } = body
    const { requestId } = params

    if (!requestId || !approverId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = createServerClient()

    // Get request
    const { data: permissionRequest } = await supabase
      .from('permission_requests')
      .select('*')
      .eq('id', requestId)
      .single()

    if (!permissionRequest) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 })
    }

    // Update request
    const { data, error } = await supabase
      .from('permission_requests')
      .update({
        status: 'approved',
        approved_by: approverId,
        approved_at: new Date().toISOString(),
      })
      .eq('id', requestId)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Log to audit
    await supabase.from('audit_logs').insert({
      team_id: permissionRequest.team_id,
      user_id: approverId,
      action: 'permission_approved',
      resource_type: 'permission_request',
      resource_id: requestId,
      details: {
        original_requester: permissionRequest.user_id,
        tool: permissionRequest.tool,
        action: permissionRequest.action,
      },
    })

    return NextResponse.json({ request: data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}