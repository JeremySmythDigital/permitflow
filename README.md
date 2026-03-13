# PermitFlow MVP

AI Coding Permission Governance - Stop running `--dangerously-skip-permissions`

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Copy `.env.local.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
   - `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key
   - `STRIPE_SECRET_KEY` - Your Stripe secret key
   - `STRIPE_WEBHOOK_SECRET` - Your Stripe webhook secret
   - `STRIPE_PRICE_ID` - Your Stripe price ID for $9/month subscription

3. **Set up Supabase**
   Run the SQL in `supabase/schema.sql` in your Supabase SQL Editor

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
permitflow/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Home/landing page
│   │   ├── pricing/           # Pricing page
│   │   ├── signup/           # Sign up page
│   │   ├── login/            # Login page
│   │   └── dashboard/        # Main dashboard
│   ├── components/            # React components
│   │   ├── Header.tsx        # Navigation header
│   │   ├── PermissionRequestForm.tsx
│   │   ├── ApprovalDashboard.tsx
│   │   └── AuditLogDashboard.tsx
│   ├── lib/                   # Core libraries
│   │   ├── supabase.ts       # Database client
│   │   ├── stripe.ts         # Payment client
│   │   ├── types.ts          # TypeScript types
│   │   └── permissions.ts    # Permission logic
│   └── pages/api/            # API routes (pages dir for webhooks)
│       ├── permissions/      # Permission CRUD
│       ├── audit.ts          # Audit log endpoint
│       ├── stripe/           # Stripe checkout
│       └── webhooks/         # Stripe webhooks
├── supabase/
│   └── schema.sql            # Database schema
└── package.json
```

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe ($9/month subscription)
- **Deployment**: Vercel (free tier)

## Features

1. **Permission Request UI** - Simple form to request AI actions
2. **Approval Workflow** - Team leads can approve/deny requests
3. **Audit Trail** - Complete log of all permission decisions
4. **Integration Ready** - Works with Claude Code, Cursor, Continue

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variables
4. Deploy

### Supabase Setup

1. Create new Supabase project
2. Run schema.sql in SQL Editor
3. Get API keys from Settings > API
4. Enable Row Level Security (already in schema)

### Stripe Setup

1. Create product in Stripe Dashboard
2. Create $9/month price
3. Add webhook endpoint: `https://your-domain.com/api/webhooks/stripe`
4. Get webhook secret and price ID

## License

MIT