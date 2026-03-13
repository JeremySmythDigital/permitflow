import Link from 'next/link'
import { CheckCircle, Shield, FileText, Users, Zap, ChevronRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-bg text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">AI Coding Permission Governance</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Stop running <br />
            <code className="bg-black/30 px-3 py-1 rounded-lg">--dangerously-skip-permissions</code>
          </h1>
          
          <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-2xl mx-auto">
            PermitFlow gives teams audit trails, approval workflows, and reusable permission templates for AI coding tools.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
            >
              Start Free Trial
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              href="/pricing"
              className="bg-transparent border-2 border-white font-semibold py-3 px-8 rounded-lg hover:bg-white/10 transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">The Problem</h2>
          <p className="text-lg text-gray-600 mb-8">
            Developers skip AI coding tool permissions because the UX is broken. They run 
            <code className="bg-gray-200 px-2 py-1 rounded mx-1">--dangerously-skip-permissions</code> 
            to avoid friction, creating security blind spots.
          </p>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <p className="text-left font-mono text-sm text-gray-600">
              <span className="text-red-500"># What developers actually do:</span><br />
              <span className="text-blue-600">claude</span> code --dangerously-skip-permissions<br /><br />
              <span className="text-red-500"># What enterprises need:</span><br />
              <span className="text-green-600">✓</span> Audit trail for every action<br />
              <span className="text-green-600">✓</span> Approval workflows for high-risk actions<br />
              <span className="text-green-600">✓</span> Reusable permission templates
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Audit Trail</h3>
              <p className="text-gray-600">
                Every permission request and decision is logged with full context. 
                Know who approved what, when, and why.
              </p>
            </div>

            <div className="card">
              <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-accent-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Approval Workflow</h3>
              <p className="text-gray-600">
                Team leads review and approve/deny requests. Risk levels help prioritize 
                what needs attention.
              </p>
            </div>

            <div className="card">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Templates</h3>
              <p className="text-gray-600">
                Create reusable permission templates for common actions. 
                Auto-approve safe operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Works With Your Tools</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['Claude Code', 'Cursor', 'Continue', 'GitHub Copilot'].map((tool) => (
              <div
                key={tool}
                className="bg-white px-6 py-3 rounded-lg shadow border border-gray-200"
              >
                {tool}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to secure your AI coding?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Start your 14-day free trial. No credit card required.
          </p>
          <Link
            href="/signup"
            className="btn-primary text-lg py-4 px-8 inline-flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold">PermitFlow</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-600">
            <Link href="/pricing" className="hover:text-gray-900">Pricing</Link>
            <Link href="/docs" className="hover:text-gray-900">Documentation</Link>
            <Link href="/privacy" className="hover:text-gray-900">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-900">Terms</Link>
          </div>
          <p className="text-sm text-gray-500">© 2024 PermitFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}