import { supabase, createServerClient } from './supabase'
import type { PermissionRequest, AuditLog } from './types'

// Request a new permission
export async function requestPermission(
  userId: string,
  teamId: string,
  tool: PermissionRequest['tool'],
  action: string,
  context: string,
  riskLevel: PermissionRequest['risk_level'] = 'medium'
): Promise<PermissionRequest> {
  const { data, error } = await supabase
    .from('permission_requests')
    .insert({
      user_id: userId,
      team_id: teamId,
      tool,
      action,
      context,
      risk_level: riskLevel,
      status: 'pending',
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hour expiry
    })
    .select()
    .single()

  if (error) throw error

  // Log audit trail
  await logAudit(teamId, userId, 'permission_requested', 'permission_request', data.id, {
    tool,
    action,
    risk_level: riskLevel,
  })

  return data
}

// Get pending requests for a team
export async function getPendingRequests(teamId: string): Promise<PermissionRequest[]> {
  const { data, error } = await supabase
    .from('permission_requests')
    .select('*, users(name, email)')
    .eq('team_id', teamId)
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// Approve a permission request
export async function approveRequest(
  requestId: string,
  approverId: string
): Promise<PermissionRequest> {
  const serverClient = createServerClient()
  
  // Get the request first
  const { data: request } = await serverClient
    .from('permission_requests')
    .select('*')
    .eq('id', requestId)
    .single()

  if (!request) throw new Error('Request not found')

  const { data, error } = await serverClient
    .from('permission_requests')
    .update({
      status: 'approved',
      approved_by: approverId,
      approved_at: new Date().toISOString(),
    })
    .eq('id', requestId)
    .select()
    .single()

  if (error) throw error

  // Log audit trail
  await logAudit(request.team_id, approverId, 'permission_approved', 'permission_request', requestId, {
    original_requester: request.user_id,
    tool: request.tool,
    action: request.action,
  })

  return data
}

// Deny a permission request
export async function denyRequest(
  requestId: string,
  approverId: string,
  reason: string
): Promise<PermissionRequest> {
  const serverClient = createServerClient()
  
  const { data: request } = await serverClient
    .from('permission_requests')
    .select('*')
    .eq('id', requestId)
    .single()

  if (!request) throw new Error('Request not found')

  const { data, error } = await serverClient
    .from('permission_requests')
    .update({
      status: 'denied',
      approved_by: approverId,
      denial_reason: reason,
    })
    .eq('id', requestId)
    .select()
    .single()

  if (error) throw error

  // Log audit trail
  await logAudit(request.team_id, approverId, 'permission_denied', 'permission_request', requestId, {
    original_requester: request.user_id,
    reason,
  })

  return data
}

// Log audit trail
export async function logAudit(
  teamId: string,
  userId: string,
  action: string,
  resourceType: string,
  resourceId: string,
  details: Record<string, any>
): Promise<void> {
  const serverClient = createServerClient()
  
  await serverClient.from('audit_logs').insert({
    team_id: teamId,
    user_id: userId,
    action,
    resource_type: resourceType,
    resource_id: resourceId,
    details,
  })
}

// Get audit logs for a team
export async function getAuditLogs(
  teamId: string,
  limit: number = 100
): Promise<AuditLog[]> {
  const { data, error } = await supabase
    .from('audit_logs')
    .select('*, users(name, email)')
    .eq('team_id', teamId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}