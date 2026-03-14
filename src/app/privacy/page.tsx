export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-gray">
        <p className="text-gray-900 dark:text-gray-100 mb-4">Last updated: March 2024</p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
        <p className="text-gray-900 dark:text-gray-100 mb-4">
          We collect information you provide directly: name, email, team information, and permission request data. We also collect usage data to improve our services.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
        <p className="text-gray-900 dark:text-gray-100 mb-4">
          We use your information to provide and improve PermGuard, process transactions, send notifications, and protect against fraud.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">3. Data Security</h2>
        <p className="text-gray-900 dark:text-gray-100 mb-4">
          We implement industry-standard security measures including encryption at rest and in transit. Your data is stored in secure data centers with access controls.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">4. Third-Party Services</h2>
        <p className="text-gray-900 dark:text-gray-100 mb-4">
          We use Stripe for payment processing and Supabase for data storage. These services have their own privacy policies.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">5. Your Rights</h2>
        <p className="text-gray-900 dark:text-gray-100 mb-4">
          You have the right to access, correct, or delete your data. Contact us at privacy@ravenops.ai for data requests.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">6. Contact</h2>
        <p className="text-gray-900 dark:text-gray-100 mb-4">
          For privacy questions, contact us at privacy@ravenops.ai
        </p>
      </div>
    </div>
  )
}
