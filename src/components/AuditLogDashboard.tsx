'use client'

import { useState, useEffect } from 'react'
import { Shield, User, Calendar, ArrowRight, CheckCircle, XCircle, Clock } from 'lucide-react'
import { format } from 'date-fns'

interface AuditLogProps {
  teamId: string
}

interface Log {
  id: string
  action: string
  resource_type: string
  resource_id: string
  details: Record<string, any>
  created_at: string
  users: { name: string; email: string }
}

export default function AuditLogDashboard({ teamId }: AuditLogProps) {
  const [logs, setLogs] = useState<Log[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLogs()
  }, [teamId])

  const fetchLogs = async () => {
    try {
      const res = await fetch(`/api/audit?teamId=${teamId}`)
      const data = await res.json()
      setLogs(data.logs || [])
    } catch (err) {
      console.error('Failed to fetch audit logs:', err)
    } finally {
      setLoading(false)
    }
  }

  const getActionIcon = (action: string) => {
    if (action.includes('approved')) return <CheckCircle className="w-4 h-4 text-green-500" />
    if (action.includes('denied')) return <XCircle className="w-4 h-4 text-red-500" />
    return <Shield className="w-4 h-4 text-blue-500" />
  }

  const getActionColor = (action: string) => {
    if (action.includes('approved')) return 'bg-green-50 border-green-200'
    if (action.includes('denied')) return 'bg-red-50 border-red-200'
    return 'bg-blue-50 border-blue-200'
  }

  if (loading) {
    return (
      <div className="card">
        <div className="animate-pulse space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4">Audit Trail</h2>
      
      {logs.length === 0 ? (
        <p className="text-gray-700 text-center py-4">No activity yet</p>
      ) : (
        <div className="space-y-2 max-h-[500px] overflow-y-auto">
          {logs.map((log) => (
            <div
              key={log.id}
              className={`flex items-center gap-3 p-3 rounded-lg border ${getActionColor(log.action)}`}
            >
              {getActionIcon(log.action)}
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium capitalize">
                    {log.action.replace(/_/g, ' ')}
                  </span>
                  <ArrowRight className="w-3 h-3 text-gray-600" />
                  <span className="text-sm text-gray-900 dark:text-gray-100">{log.resource_type}</span>
                </div>
                <p className="text-xs text-gray-700 dark:text-gray-300">
                  <User className="w-3 h-3 inline mr-1" />
                  {log.users?.name || log.users?.email || 'System'}
                  {' • '}
                  <Calendar className="w-3 h-3 inline mr-1" />
                  {format(new Date(log.created_at), 'MMM d, yyyy h:mm a')}
                </p>
              </div>

              {log.details && (
                <div className="text-xs text-gray-700 max-w-xs truncate">
                  {log.details.tool && `${log.details.tool}: `}
                  {log.details.action || log.details.reason || ''}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}