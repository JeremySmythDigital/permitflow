import Stripe from 'stripe'
import { createServerClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const sig = request.headers.get('stripe-signature')!

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message)
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
    }

    const supabase = createServerClient()

    // Handle event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const teamId = session.metadata?.teamId

        if (teamId && session.subscription) {
          await supabase
            .from('teams')
            .update({
              stripe_customer_id: session.customer as string,
              stripe_subscription_id: session.subscription as string,
              subscription_status: 'active',
            })
            .eq('id', teamId)

          // Log audit
          await supabase.from('audit_logs').insert({
            team_id: teamId,
            user_id: 'system',
            action: 'subscription_created',
            resource_type: 'subscription',
            resource_id: session.subscription as string,
            details: { customer_id: session.customer },
          })
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        const { data: teams } = await supabase
          .from('teams')
          .select('id')
          .eq('stripe_customer_id', customerId)

        if (teams && teams[0]) {
          await supabase
            .from('teams')
            .update({
              subscription_status: subscription.status === 'active' ? 'active' : 'past_due',
            })
            .eq('id', teams[0].id)
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        const { data: teams } = await supabase
          .from('teams')
          .select('id')
          .eq('stripe_customer_id', customerId)

        if (teams && teams[0]) {
          await supabase
            .from('teams')
            .update({
              subscription_status: 'inactive',
              stripe_subscription_id: null,
            })
            .eq('id', teams[0].id)

          // Log audit
          await supabase.from('audit_logs').insert({
            team_id: teams[0].id,
            user_id: 'system',
            action: 'subscription_cancelled',
            resource_type: 'subscription',
            resource_id: subscription.id,
            details: {},
          })
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}