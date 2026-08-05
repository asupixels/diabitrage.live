# Diabitrage Asset Recovery Platform

A professional, minimalist asset recovery and compliance management platform built with Next.js, TypeScript, and Supabase.

## Features

- 🔐 **Enterprise-Grade Security**: Role-based access control, audit logging, and compliance tracking
- 📊 **Real-Time Case Management**: Track recovery progress with live status updates and financial summaries
- 💼 **Client Portal**: Secure dashboard for clients to view cases, documents, and financial balances
- 👨‍💼 **Admin Dashboard**: Comprehensive management interface for case control, ledger updates, and notifications
- 📄 **Document Management**: Secure upload and tracking of audit reports and compliance documents
- 🔔 **Automated Notifications**: Email alerts for client registrations, case updates, and ledger changes
- 📈 **Financial Ledger**: Transparent tracking of claimed amounts, recoveries, fees, and credits
- 🌐 **Responsive Design**: Optimized for desktop, tablet, and mobile devices

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Icons**: Lucide React
- **Deployment**: Vercel

## Project Structure

```
diabitrage-recovery/
├── src/
│   ├── app/
│   │   ├── api/                    # API routes
│   │   │   ├── auth/register/
│   │   │   ├── cases/
│   │   │   └── ledger/
│   │   ├── dashboard/              # Client dashboard
│   │   │   ├── page.tsx
│   │   │   ├── cases/
│   │   │   ├── documents/
│   │   │   └── settings/
│   │   ├── admin/                  # Admin dashboard
│   │   │   ├── page.tsx
│   │   │   ├── clients/
│   │   │   ├── notifications/
│   │   │   └── settings/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx                # Landing page
│   │   └── providers.tsx
│   ├── components/                 # Reusable components
│   ├── lib/
│   │   ├── auth.ts                 # Authentication utilities
│   │   ├── supabase.ts             # Supabase client setup
│   │   └── utils.ts                # Utility functions
│   └── types/
│       └── index.ts                # TypeScript type definitions
├── supabase/
│   └── schema.sql                  # Database schema
├── .env.example                    # Environment variables template
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── package.json
```

## Quick Start

### 1. Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier available at https://supabase.com)
- Vercel account (free tier available at https://vercel.com)

### 2. Clone & Install

```bash
git clone <repository-url>
cd diabitrage-recovery
npm install
```

### 3. Supabase Setup

1. Create a new Supabase project at https://supabase.com
2. Go to SQL Editor and run the SQL schema from `supabase/schema.sql`
3. Get your API credentials:
   - Settings → API → Project URL (NEXT_PUBLIC_SUPABASE_URL)
   - Settings → API → Project API Keys → anon key (NEXT_PUBLIC_SUPABASE_ANON_KEY)
   - Settings → API → Project API Keys → service_role key (SUPABASE_SERVICE_ROLE_KEY)

### 4. Environment Setup

```bash
cp .env.example .env.local
```

Update `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_ADMIN_EMAIL=admin@diabitrage.com
```

### 5. Run Locally

```bash
npm run dev
```

Visit http://localhost:3000 in your browser.

## Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo>
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to https://vercel.com/new
2. Select "Next.js" as your framework
3. Import your GitHub repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_ADMIN_EMAIL`
5. Click "Deploy"

Your application will be live in minutes!

## Authentication & Access

### Admin Dashboard
- Path: `/admin`
- Default admin email: `admin@diabitrage.com`
- Create admin users via Supabase console

### Client Portal
- Path: `/dashboard`
- Clients register via landing page
- Access granted after email verification

## Database Schema

### Users Table
- Stores client and admin accounts
- Linked to Supabase Auth
- Role-based access control

### Cases Table
- Tracks individual recovery cases
- Status: intake → investigation → audit_complete → provisioning → recovery_scheduled → completed/closed
- Links clients to their cases

### Case Ledgers Table
- Financial tracking per case
- Claimed amounts, recoveries, fees, and credits
- Real-time balance calculations

### Case Documents Table
- Audit reports, claim forms, verification documents
- Linked to cases and uploaders
- Secure document storage

### Audit Logs Table
- Complete audit trail of all administrative actions
- User ID, timestamp, entity changes
- Non-editable compliance record

### Notification Events Table
- Event tracking for compliance alerts
- Client registrations, case updates, document uploads
- Email dispatch records

## API Routes

### Authentication
- `POST /api/auth/register` - Register new client

### Cases
- `GET /api/cases?clientId=...` - Get client cases
- `GET /api/cases?caseId=...` - Get specific case
- `POST /api/cases` - Create new case
- `PATCH /api/cases` - Update case status/recovery amount

### Ledger
- `GET /api/ledger?caseId=...` - Get case ledger
- `PATCH /api/ledger` - Update ledger balances

## Security Best Practices

1. **Row-Level Security (RLS)**: Enabled on all tables
   - Clients can only view their own data
   - Admins have full access with audit logging

2. **Authentication**: Supabase Auth with email verification
   - Passwords hashed with bcrypt
   - Session tokens with expiration

3. **Encryption**: HTTPS only, SSL/TLS certificates
   - Database connections encrypted
   - Sensitive data in environment variables

4. **Audit Trail**: Complete logging of all actions
   - Who, what, when, where, why
   - Non-editable compliance records

5. **Rate Limiting**: Implemented on API routes
   - Prevents brute force attacks
   - Configurable per endpoint

## Email Notifications

The system sends emails to the admin address for:
- New client registrations
- Case status changes
- Document uploads
- Ledger updates
- Critical system alerts

Configure email sender in admin settings or via environment variables.

## Customization

### Branding
- Edit colors in `tailwind.config.ts`
- Update logo in navigation components
- Modify company name in environment variables

### Email Templates
- Create `.tsx` components in `src/components/emails/`
- Update API routes to use custom templates

### Database
- Add columns to tables via Supabase console
- Update TypeScript types in `src/types/index.ts`
- Run migrations via SQL Editor

## Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Database Connection Issues
1. Check Supabase URL and API key in `.env.local`
2. Verify your IP is not blocked
3. Check Supabase dashboard for service status

### Authentication Errors
1. Verify email confirmation is enabled
2. Check user role in `users` table
3. Clear browser cookies and try again

## Support & Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Production Checklist

- [ ] All environment variables set in Vercel
- [ ] Database backups enabled in Supabase
- [ ] Email service configured
- [ ] 2FA enabled for admin accounts
- [ ] SSL certificate auto-renewal active
- [ ] Rate limiting configured
- [ ] CORS policies properly set
- [ ] Audit logging enabled
- [ ] Regular security audits scheduled
- [ ] Incident response plan documented

## License

Copyright 2024 Diabitrage Asset Recovery. All rights reserved.

---

Built with ❤️ for professional asset recovery and compliance management.
