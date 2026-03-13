import Link from 'next/link'

export default function DocsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Documentation</h1>
      
      <div className="space-y-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">Getting Started</h2>
          <p className="text-gray-600 mb-4">
            Learn how to set up PermitFlow for your team and start managing AI coding permissions.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Create your team account</li>
            <li>Invite team members</li>
            <li>Configure permission templates</li>
            <li>Connect your AI tools</li>
          </ul>
        </div>
        
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">Permission Templates</h2>
          <p className="text-gray-600 mb-4">
            Create reusable templates to speed up approval workflows for common operations.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Safe operations: Auto-approve</li>
            <li>Medium risk: Single approval required</li>
            <li>High risk: Multiple approvals required</li>
          </ul>
        </div>
        
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">API Reference</h2>
          <p className="text-gray-600 mb-4">
            Integrate PermitFlow with your existing tools and workflows.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
            <p className="text-gray-500"># Check permission status</p>
            <p className="text-blue-600">GET /api/permissions/{'{requestId}'}</p>
            <p className="mt-2 text-gray-500"># Request new permission</p>
            <p className="text-blue-600">POST /api/permissions</p>
          </div>
        </div>
        
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">Supported AI Tools</h2>
          <p className="text-gray-600 mb-4">
            PermitFlow integrates with popular AI coding assistants.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Claude Code', 'Cursor', 'Continue', 'GitHub Copilot', 'Cline', 'Aider'].map((tool) => (
              <span key={tool} className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Need Help?</h3>
        <p className="text-gray-600">
          Contact us at <Link href="mailto:support@permitflow.ai" className="text-primary-600 hover:underline">support@permitflow.ai</Link>
        </p>
      </div>
    </div>
  )
}
