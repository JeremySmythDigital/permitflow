'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, Clock, User, ChevronDown, ChevronUp } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface ApprovalDashboardProps {
  teamId: string
  currentUserId: string
}

interface Request {
  id: string
  tool: string
  action: string
  context: string
  risk_level: string
  status: string
  created_at: string
  users: { name: string; email: string }
}

export default function ApprovalDashboard({ teamId, currentUserId }: ApprovalDashboardProps) {
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    fetchRequests()
  }, [teamId])

  const fetchRequests = async () => {
    try {
      const res = await fetch(`/api/permissions?teamId=${teamId}&status=pending`)
      const data = await res.json()
      setRequests(data.requests || [])
    } catch (err) {
      console.error('Failed to fetch requests:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (requestId: string) => {
    setActionLoading(requestId)
    try {
      const res = await fetch(`/api/permissions/${requestId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approverId: currentUserId }),
      })
      if (res.ok) {
        setRequests(requests.filter((r) => r.id !== requestId))
      }
    } catch (err) {
      console.error('Failed to approve:', err)
    } finally {
      setActionLoading(null)
    }
  }

  const handleDeny = async (requestId: string, reason: string) => {
    setActionLoading(requestId)
    try {
      const res = await fetch(`/api/permissions/${requestId}/deny`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approverId: currentUserId, reason }),
      })
      if (res.ok) {
        setRequests(requests.filter((r) => r.id !== requestId))
      }
    } catch (err) {
      console.error('Failed to deny:', err)
    } finally {
      setActionLoading(null)
    }
  }

  if (loading) {
    return (
      <div className="card">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded" />
          ))}
        </div>
      </div>
    )
  }

  if (requests.length === 0) {
    return (
      <div className="card text-center py-8">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <p className="text-gray-800 dark:text-gray-600">No pending requests</p>
      </div>
    )
  }

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4">Pending Approvals ({requests.length})</h2>
      
      <div className="space-y-3">
        {requests.map((request) => {
          const isExpanded = expandedId === request.id
          
          return (
            <div
              key={request.id}
              className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : request.id)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      request.risk_level === 'high'
                        ? 'bg-red-500'
                        : request.risk_level === 'medium'
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                  />
                  <div>
                    <p className="font-medium">{request.action}</p>
                    <p className="text-sm text-gray-700 flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {request.users?.name || 'Unknown'} • {request.tool}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDistanceToNow(new Date(request.created_at), { addSuffix: true })}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </div>
              </div>

              {isExpanded && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm mb-4">
                    <span className="font-medium">Context:</span> {request.context}
                  </p>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleApprove(request.id)
                      }}
                      disabled={actionLoading === request.id}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        const reason = prompt('Reason for denial:')
                        if (reason) handleDeny(request.id, reason)
                      }}
                      disabled={actionLoading === request.id}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <XCircle className="w-4 h-4" />
                      Deny
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}