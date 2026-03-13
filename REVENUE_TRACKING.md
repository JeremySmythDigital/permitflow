# PermitFlow Revenue Tracking

## Setup Complete - 2026-03-13

### Stripe Product
- **Product ID**: `prod_U8g4xxYDkkO53x`
- **Name**: PermitFlow Pro Plan
- **Description**: PermitFlow Pro - Advanced permit search and tracking
- **Status**: Active
- **Livemode**: true

### Stripe Price
- **Price ID**: `price_1TAOie9suOxAfgqh3rtNjRDk`
- **Amount**: $9.00/month (900 cents)
- **Currency**: USD
- **Interval**: Monthly
- **Status**: Active
- **Default for product**: Yes

### Stripe Webhook
- **Webhook ID**: `we_1TAOil9suOxAfgqhw0hCU6Za`
- **Webhook Secret**: `whsec_b6TJZkxkysv6AUoclesWGfAjjNOPVHgJ`
- **URL**: `https://permitflow-seven.vercel.app/api/webhooks/stripe`
- **Events**:
  - `checkout.session.completed`
  - `invoice.paid`
  - `invoice.payment_failed`
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
- **Status**: Enabled
- **Livemode**: true

## Action Required

### Vercel Environment Variables
Add to Vercel project settings:

```
STRIPE_PRICE_ID=price_1TAOie9suOxAfgqh3rtNjRDk
STRIPE_WEBHOOK_SECRET=whsec_b6TJZkxkysv6AUoclesWGfAjjNOPVHgJ
```

### Current Status
- MRR: $0
- Active Subscriptions: 0
- Launch Date: 2026-03-13

## Tracking Endpoints
- Checkout: `POST /api/stripe/checkout`
- Webhook: `POST /api/webhooks/stripe`

## Revenue Dashboard
Access revenue data via Stripe Dashboard:
https://dashboard.stripe.com/products/prod_U8g4xxYDkkO53x