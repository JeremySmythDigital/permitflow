'use client'
import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, Shield, FileText, Users, Zap, ChevronRight, ArrowRight, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react'

// Signature moment: Interactive permit workflow
const workflowSteps = [
  { id: 1, name: 'Application', status: 'completed', icon: FileText, description: 'Permission request submitted' },
  { id: 2, name: 'Review', status: 'current', icon: Users, description: 'Team lead reviewing...' },
  { id: 3, name: 'Approval', status: 'pending', icon: CheckCircle, description: 'Awaiting approval' },
]

function SignatureMoment() {
  const [activeStep, setActiveStep] = useState(2)
  const [status, setStatus] = useState<'idle' | 'processing' | 'approved'>('idle')
  
  const handleApprove = () => {
    setStatus('processing')
    setTimeout(() => {
      setActiveStep(3)
      setStatus('approved')
    }, 1500)
  }
  
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-success-600" />
            <span className="font-semibold text-warm-black">Permission Request</span>
          </div>
          <span className="text-sm font-mono text-neutral-600">#PR-2024-0847</span>
        </div>
      </div>
      
      {/* Workflow visualization */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          {workflowSteps.map((step, idx) => {
            const Icon = step.icon
            const isActive = step.id === activeStep
            const isCompleted = step.id < activeStep || status === 'approved' && step.id === 3
            
            return (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500
                    ${isCompleted ? 'bg-success-500 text-white' : isActive ? 'bg-amber-500 text-white animate-pulse' : 'bg-neutral-200 text-neutral-500'}
                  `}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`mt-2 text-sm font-medium ${isCompleted || isActive ? 'text-warm-black' : 'text-neutral-400'}`}>
                    {step.name}
                  </span>
                </div>
                {idx < workflowSteps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${isCompleted || (status === 'approved' && idx === 1) ? 'bg-success-500' : 'bg-neutral-200'}`} />
                )}
              </div>
            )
          })}
        </div>
        
        {/* Context panel */}
        <div className="bg-neutral-50 rounded-xl p-4 mb-4">
          <div className="font-mono text-sm">
            <div className="text-neutral-500 mb-1">Action Requested:</div>
            <code className="text-warm-black bg-neutral-100 px-2 py-1 rounded">fs.writeFile('/config/database.json')</code>
          </div>
        </div>
        
        {/* Risk indicator */}
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-4 h-4 text-amber-500" />
          <span className="text-sm text-neutral-600">Risk Level: </span>
          <span className="text-sm font-semibold text-amber-600">Medium</span>
        </div>
        
        {/* Action buttons */}
        {status === 'idle' && (
          <div className="flex gap-3">
            <button 
              onClick={handleApprove}
              className="flex-1 bg-success-600 hover:bg-success-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
            >
              <CheckCircle2 className="w-5 h-5" />
              Approve
            </button>
            <button className="flex-1 bg-neutral-200 hover:bg-neutral-300 text-warm-black font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all">
              <XCircle className="w-5 h-5" />
              Deny
            </button>
          </div>
        )}
        
        {status === 'processing' && (
          <div className="flex items-center justify-center gap-2 text-amber-600">
            <div className="animate-spin w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full" />
            <span className="font-medium">Processing approval...</span>
          </div>
        )}
        
        {status === 'approved' && (
          <div className="flex items-center justify-center gap-2 text-success-600 bg-success-50 py-3 rounded-lg">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">Approved - Audit Logged</span>
          </div>
        )}
      </div>
    </div>
  )
}

// Bento grid features
function BentoFeatures() {
  const features = [
    {
      title: 'Audit Trail',
      description: 'Every permission request and decision is logged with full context. Know who approved what, when, and why.',
      icon: FileText,
      color: 'success',
      span: 'col-span-1 md:col-span-2',
      height: 'h-48',
    },
    {
      title: 'Approval Workflow',
      description: 'Team leads review and approve/deny requests. Risk levels help prioritize what needs attention.',
      icon: Users,
      color: 'amber',
      span: 'col-span-1',
      height: 'h-48 md:h-104',
    },
    {
      title: 'Templates',
      description: 'Create reusable permission templates for common actions. Auto-approve safe operations.',
      icon: Zap,
      color: 'success',
      span: 'col-span-1',
      height: 'h-48',
    },
    {
      title: 'Real-time Alerts',
      description: 'Get notified instantly when permission requests are submitted or approved.',
      icon: Clock,
      color: 'amber',
      span: 'col-span-1',
      height: 'h-48',
    },
  ]
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {features.map((feature) => {
        const Icon = feature.icon
        const colorClass = feature.color === 'success' 
          ? 'bg-success-100 text-success-600' 
          : 'bg-amber-100 text-amber-600'
        
        return (
          <div 
            key={feature.title} 
            className={`${feature.span} ${feature.height} bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-shadow flex flex-col`}
          >
            <div className={`w-12 h-12 rounded-xl ${colorClass} flex items-center justify-center mb-4`}>
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-warm-black">{feature.title}</h3>
            <p className="text-neutral-600 leading-relaxed flex-grow">
              {feature.description}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-success-600 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-warm-black">PermGuard</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/docs" className="text-neutral-600 hover:text-warm-black transition-colors">Documentation</Link>
              <Link href="/pricing" className="text-neutral-600 hover:text-warm-black transition-colors">Pricing</Link>
              <Link href="/login" className="text-neutral-600 hover:text-warm-black transition-colors">Log In</Link>
              <Link
                href="/signup"
                className="bg-success-600 hover:bg-success-700 text-white font-semibold py-2 px-5 rounded-lg transition-all"
              >
                Start Free Trial
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero - Asymmetric 60/40 split */}
      <section className="pt-16 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-12 items-start">
            {/* Left content (60%) */}
            <div className="md:col-span-3">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full mb-6">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-semibold">AI Coding Permission Governance</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-warm-black mb-6 leading-tight">
                Stop running<br />
                <code className="bg-neutral-200 text-warm-black px-3 py-1 rounded-lg font-mono text-3xl md:text-5xl">
                  --dangerously-skip-permissions
                </code>
              </h1>
              
              <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-xl leading-relaxed">
                PermGuard gives teams audit trails, approval workflows, and reusable permission templates for AI coding tools.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/signup"
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  Start Free Trial
                  <ChevronRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/pricing"
                  className="btn-secondary inline-flex items-center justify-center gap-2"
                >
                  View Pricing
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
            
            {/* Right visual (40%) - Signature moment */}
            <div className="md:col-span-2">
              <SignatureMoment />
            </div>
          </div>
        </div>
      </section>

      {/* Problem section */}
      <section className="py-20 px-6 bg-white border-y border-neutral-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-warm-black text-left">The Problem</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
            Developers skip AI coding tool permissions because the UX is broken. They run{' '}
            <code className="bg-neutral-200 text-warm-black px-2 py-1 rounded font-mono text-sm">
              --dangerously-skip-permissions
            </code>{' '}
            to avoid friction, creating security blind spots.
          </p>
          <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-200 font-mono text-sm">
            <p className="text-neutral-500 mb-2"># What developers actually do:</p>
            <p className="text-blue-600">claude</p>
            <p className="text-warm-black">  code --dangerously-skip-permissions</p>
            <br />
            <p className="text-neutral-500 mb-2"># What enterprises need:</p>
            <p className="text-success-600">✓ Audit trail for every action</p>
            <p className="text-success-600">✓ Approval workflows for high-risk actions</p>
            <p className="text-success-600">✓ Reusable permission templates</p>
          </div>
        </div>
      </section>

      {/* Features - Bento layout */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-warm-black">Key Features</h2>
          <BentoFeatures />
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 px-6 bg-white border-y border-neutral-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-warm-black">Works With Your Tools</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['Claude Code', 'Cursor', 'Continue', 'GitHub Copilot'].map((tool) => (
              <div
                key={tool}
                className="bg-neutral-50 px-6 py-3 rounded-lg border border-neutral-200 text-neutral-700 font-medium hover:border-neutral-300 transition-colors"
              >
                {tool}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-warm-black">Ready to secure your AI coding?</h2>
          <p className="text-lg text-neutral-600 mb-8">
            Start your 14-day free trial. No credit card required.
          </p>
          <Link
            href="/signup"
            className="btn-accent text-lg py-4 px-8 inline-flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 py-8 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-success-600 flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-warm-black">PermGuard</span>
          </div>
          <div className="flex gap-6 text-sm text-neutral-600">
            <Link href="/pricing" className="hover:text-warm-black transition-colors">Pricing</Link>
            <Link href="/docs" className="hover:text-warm-black transition-colors">Documentation</Link>
            <Link href="/privacy" className="hover:text-warm-black transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-warm-black transition-colors">Terms</Link>
          </div>
          <p className="text-sm text-neutral-600">© 2024 PermGuard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}