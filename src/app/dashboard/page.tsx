'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import PermissionRequestForm from '@/components/PermissionRequestForm'
import ApprovalDashboard from '@/components/ApprovalDashboard'
import AuditLogDashboard from '@/components/AuditLogDashboard'
import { LayoutDashboard, Shield, FileText, Settings } from 'lucide-react'

// Mock user - would be fetched from auth in production
const MOCK_USER = {
  id: 'user-1',
  teamId: 'team-1',
  name: 'Demo User',
  email: 'demo@permitflow.ai',
  role: 'admin' as const,
}

type Tab = 'request' | 'approvals' | 'audit'

export default function DashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('request')
  const [user] = useState(MOCK_USER)

  const tabs = [
    { id: 'request' as const, label: 'Request', icon: Shield },
    { id: 'approvals' as const, label: 'Approvals', icon: LayoutDashboard },
    { id: 'audit' as const, label: 'Audit Trail', icon: FileText },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={{ name: user.name, email: user.email }} />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-800 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {activeTab === 'request' && (
            <>
              <div className="lg:col-span-2">
                <PermissionRequestForm
                  teamId={user.teamId}
                  userId={user.id}
                />
              </div>
              <div>
                <div className="card">
                  <h3 className="font-bold mb-4">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-700 dark:text-gray-300">Pending Requests</span>
                      <span className="font-semibold">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700 dark:text-gray-300">Approved Today</span>
                      <span className="font-semibold text-green-600">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700 dark:text-gray-300">Denied Today</span>
                      <span className="font-semibold text-red-600">2</span>
                    </div>
                  </div>
                </div>

                <div className="card mt-4">
                  <h3 className="font-bold mb-4">Recent Activity</h3>
                  <div className="space-y-2 text-sm">
                    <div className="text-gray-900 dark:text-gray-100">
                      <span className="text-green-600">✓</span> API endpoint creation approved
                    </div>
                    <div className="text-gray-900 dark:text-gray-100">
                      <span className="text-red-600">✗</span> Database migration denied
                    </div>
                    <div className="text-gray-900 dark:text-gray-100">
                      <span className="text-blue-600">→</span> New permission requested
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'approvals' && (
            <div className="lg:col-span-3">
              <ApprovalDashboard
                teamId={user.teamId}
                currentUserId={user.id}
              />
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="lg:col-span-3">
              <AuditLogDashboard teamId={user.teamId} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}