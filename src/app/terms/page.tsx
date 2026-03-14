export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose prose-gray">
        <p className="text-gray-900 dark:text-gray-100 mb-4">Last updated: March 2024</p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="text-gray-900 dark:text-gray-100 mb-4">
          By accessing and using PermGuard, you agree to be bound by these Terms of Service and all applicable laws and regulations.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">2. Subscription and Payment</h2>
        <p className="text-gray-900 dark:text-gray-100 mb-4">
          PermGuard offers subscription-based access. You will be charged the applicable subscription fees on a monthly basis. All payments are processed securely through Stripe.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">3. Use License</h2>
        <p className="text-gray-900 dark:text-gray-100 mb-4">
          Permission is granted to temporarily use PermGuard for personal or commercial business purposes. This license does not include reselling or redistributing the service.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">4. User Data</h2>
        <p className="text-gray-900 dark:text-gray-100 mb-4">
          We collect and store data necessary to provide our services. Your data is stored securely and will not be shared with third parties without your consent.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">5. Termination</h2>
        <p className="text-gray-900 dark:text-gray-100 mb-4">
          You may terminate your subscription at any time. Upon termination, your data will be retained for 30 days before deletion.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">6. Contact</h2>
        <p className="text-gray-900 dark:text-gray-100 mb-4">
          For questions about these terms, contact us at support@ravenops.ai
        </p>
      </div>
    </div>
  )
}
