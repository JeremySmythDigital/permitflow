'use client'

import { useState } from 'react'
import { Send, AlertCircle, CheckCircle, Code, Terminal, Cpu } from 'lucide-react'

interface PermissionRequestFormProps {
  teamId: string
  userId: string
  onSuccess?: () => void
}

const TOOLS = [
  { id: 'claude-code', name: 'Claude Code', icon: Terminal },
  { id: 'cursor', name: 'Cursor', icon: Code },
  { id: 'continue', name: 'Continue', icon: Cpu },
  { id: 'other', name: 'Other', icon: AlertCircle },
] as const

const RISK_LEVELS = [
  { id: 'low', label: 'Low', color: 'text-green-600 bg-green-100' },
  { id: 'medium', label: 'Medium', color: 'text-yellow-600 bg-yellow-100' },
  { id: 'high', label: 'High', color: 'text-red-600 bg-red-100' },
] as const

export default function PermissionRequestForm({ teamId, userId, onSuccess }: PermissionRequestFormProps) {
  const [tool, setTool] = useState<string>('claude-code')
  const [action, setAction] = useState('')
  const [context, setContext] = useState('')
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high'>('medium')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/permissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamId,
          userId,
          tool,
          action,
          context,
          riskLevel,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to submit request')
      }

      setSuccess(true)
      setAction('')
      setContext('')
      onSuccess?.()
      
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4">Request Permission</h2>
      
      {success && (
        <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-800 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Permission request submitted successfully!
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-800 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tool Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">AI Tool</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {TOOLS.map((t) => {
              const Icon = t.icon
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTool(t.id)}
                  className={`p-3 rounded-lg border-2 flex flex-col items-center gap-1 transition-all ${
                    tool === t.id
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{t.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Action */}
        <div>
          <label className="block text-sm font-medium mb-2">Action Requested</label>
          <input
            type="text"
            value={action}
            onChange={(e) => setAction(e.target.value)}
            placeholder="e.g., Create new API endpoint"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required
          />
        </div>

        {/* Context */}
        <div>
          <label className="block text-sm font-medium mb-2">Context / Reason</label>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Explain why this action is needed..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 min-h-[100px]"
            required
          />
        </div>

        {/* Risk Level */}
        <div>
          <label className="block text-sm font-medium mb-2">Risk Level</label>
          <div className="flex gap-2">
            {RISK_LEVELS.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRiskLevel(r.id as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  riskLevel === r.id
                    ? r.color + ' ring-2 ring-offset-1'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {loading ? (
            <span>Submitting...</span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Submit Request
            </>
          )}
        </button>
      </form>
    </div>
  )
}