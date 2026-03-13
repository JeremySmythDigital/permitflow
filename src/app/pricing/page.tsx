'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, Zap } from 'lucide-react'

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      price: 0,
      description: 'For individual developers',
      features: [
        '5 team members',
        'Basic audit trail',
        'Manual approvals',
        '7-day history',
      ],
      cta: 'Start Free',
      popular: false,
    },
    {
      name: 'Pro',
      price: 9,
      description: 'For growing teams',
      features: [
        'Unlimited team members',
        'Full audit trail',
        'Approval workflows',
        'Permission templates',
        '90-day history',
        'Priority support',
      ],
      cta: 'Start 14-Day Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: null,
      description: 'For large organizations',
      features: [
        'Everything in Pro',
        'SSO/SAML',
        'Custom integrations',
        'Unlimited history',
        'Dedicated support',
        'SLA guarantee',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ]

  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    // This would integrate with the Stripe checkout API
    // For MVP, redirect to signup
    window.location.href = '/signup'
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.822 10.29 9 11.622 5.178-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-xl font-bold">PermitFlow</span>
          </Link>
        </div>
      </header>

      {/* Pricing */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-gray-900 dark:text-gray-100">Start free. Scale as you grow.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`card relative ${
                  plan.popular ? 'ring-2 ring-primary-500 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold">{plan.name}</h2>
                  <p className="text-gray-700 dark:text-gray-300">{plan.description}</p>
                </div>

                <div className="text-center mb-6">
                  {plan.price !== null ? (
                    <>
                      <span className="text-5xl font-bold">${plan.price}</span>
                      <span className="text-gray-700 dark:text-gray-300">/month</span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold">Custom</span>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-900 dark:text-gray-100">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? 'btn-primary'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  {loading && plan.popular ? 'Loading...' : plan.cta}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center text-gray-700 dark:text-gray-300">
            <p className="flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              All plans include 14-day free trial
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {[
              {
                q: 'What AI tools does PermitFlow work with?',
                a: 'Currently supports Claude Code, Cursor, Continue, and can be extended to any AI coding tool.',
              },
              {
                q: 'How does the approval workflow work?',
                a: 'Developers submit permission requests through our dashboard. Team leads receive notifications and can approve or deny with a single click.',
              },
              {
                q: 'Can I use my existing authentication?',
                a: 'Yes! PermitFlow supports SSO/SAML on Enterprise plans, and we can integrate with your existing auth provider.',
              },
              {
                q: 'What happens if my trial ends?',
                a: 'You can still view your audit logs, but new permission requests will be paused until you subscribe.',
              },
            ].map((faq) => (
              <div key={faq.q} className="card">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-gray-900 dark:text-gray-100">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}