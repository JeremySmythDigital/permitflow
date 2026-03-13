// Types for PermitFlow MVP

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'approver' | 'developer'
  team_id: string
  created_at: string
}

export interface Team {
  id: string
  name: string
  stripe_customer_id?: string
  stripe_subscription_id?: string
  subscription_status: 'active' | 'inactive' | 'past_due'
  created_at: string
}

export interface PermissionRequest {
  id: string
  user_id: string
  team_id: string
  tool: 'claude-code' | 'cursor' | 'continue' | 'other'
  action: string
  context: string
  risk_level: 'low' | 'medium' | 'high'
  status: 'pending' | 'approved' | 'denied' | 'expired'
  approved_by?: string
  approved_at?: string
  denial_reason?: string
  created_at: string
  expires_at: string
}

export interface AuditLog {
  id: string
  team_id: string
  user_id: string
  action: string
  resource_type: string
  resource_id: string
  details: Record<string, any>
  ip_address?: string
  created_at: string
}

export interface PermissionTemplate {
  id: string
  team_id: string
  name: string
  description: string
  tool: 'claude-code' | 'cursor' | 'continue' | 'all'
  default_actions: string[]
  auto_approve: boolean
  created_at: string
}