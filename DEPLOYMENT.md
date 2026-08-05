# Diabitrage Asset Recovery Platform - Deployment Guide

Complete step-by-step guide to deploy the Diabitrage Asset Recovery platform to Vercel.

## Prerequisites

Before starting, ensure you have:

1. **GitHub Account** - https://github.com (for code hosting)
2. **Vercel Account** - https://vercel.com (free tier available)
3. **Supabase Account** - https://supabase.com (free tier available)
4. **Node.js 18+** - For local development

## Part 1: Prepare Your Local Environment

### Step 1.1: Clone or Download the Project

```bash
# If you have git
git clone <repository-url>
cd diabitrage-recovery

# Or download and extract the ZIP file
unzip diabitrage-recovery.zip
cd diabitrage-recovery
```

### Step 1.2: Install Dependencies

```bash
npm install
```

### Step 1.3: Create Environment File

Copy the example environment file:

```bash
cp .env.example .env.local
```

Your `.env.local` file should now exist with placeholder values.

## Part 2: Set Up Supabase Database

### Step 2.1: Create Supabase Project

1. Go to https://supabase.com
2. Click "Start your project" or sign in if you have an account
3. Click "New Project"
4. Fill in the project details:
   - **Name**: `diabitrage-recovery` (or your choice)
   - **Database Password**: Create a strong password (save it securely)
   - **Region**: Select closest to your location (e.g., `us-east-1`)
5. Click "Create new project"
6. Wait for project to initialize (2-5 minutes)

### Step 2.2: Initialize Database Schema

1. In Supabase dashboard, click "SQL Editor" (left sidebar)
2. Click "New Query"
3. Copy the entire contents of `supabase/schema.sql` from your project
4. Paste into the SQL editor
5. Click "Run" button
6. You should see success messages for all tables created

### Step 2.3: Get Your API Credentials

1. In Supabase dashboard, go to **Settings** (gear icon) → **API**
2. Copy these values:

   - **Project URL** (next to "supabase_url")
   - **Anon Key** (under "Project API keys")
   - **Service Role Key** (click eye icon to reveal)

### Step 2.4: Update Local Environment

Edit `.env.local` and update:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
NEXT_PUBLIC_ADMIN_EMAIL=admin@yourdomain.com
```

### Step 2.5: Test Locally

```bash
npm run dev
```

Visit http://localhost:3000 in your browser. You should see the landing page.

## Part 3: Push Code to GitHub

### Step 3.1: Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit: Diabitrage Asset Recovery Platform"
```

### Step 3.2: Create GitHub Repository

1. Go to https://github.com/new
2. Fill in repository name: `diabitrage-recovery`
3. Add description: "Professional asset recovery platform"
4. Choose **Private** (recommended for sensitive business applications)
5. Click "Create repository"

### Step 3.3: Push to GitHub

GitHub will show you commands. Follow them:

```bash
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/diabitrage-recovery.git
git push -u origin main
```

**Note**: Replace `YOUR-USERNAME` with your actual GitHub username.

## Part 4: Deploy to Vercel

### Step 4.1: Connect to Vercel

1. Go to https://vercel.com/new
2. Click "Continue with GitHub"
3. Authorize Vercel to access your GitHub account
4. Select the `diabitrage-recovery` repository
5. Click "Import"

### Step 4.2: Configure Build Settings

Vercel will auto-detect Next.js settings. Verify:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

All should be pre-filled correctly.

### Step 4.3: Add Environment Variables

1. Scroll down to "Environment Variables"
2. Add these variables (get values from Supabase):

   ```
   NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key
   SUPABASE_SERVICE_ROLE_KEY = your-service-role-key (mark as secret)
   NEXT_PUBLIC_ADMIN_EMAIL = admin@yourdomain.com
   ```

3. Click "Deploy"

### Step 4.4: Wait for Deployment

- Vercel will build and deploy your application
- This typically takes 2-5 minutes
- You'll see a progress indicator
- Once complete, you'll get a deployment URL like: `https://diabitrage-recovery-xxxx.vercel.app`

## Part 5: Post-Deployment Setup

### Step 5.1: Test Your Deployment

1. Click the deployment URL
2. You should see the landing page
3. Try registering a test account
4. Check your email for verification link

### Step 5.2: Set Up Admin Access

1. Go to Supabase dashboard
2. Click **SQL Editor** → New Query
3. Run this query to create an admin user:

```sql
-- First create auth user
-- Then insert into users table with role = 'admin'

INSERT INTO users (id, email, fullName, phone, role, createdAt, updatedAt)
VALUES (
  'admin-user-uuid', -- Get this from Supabase Auth after creating user
  'admin@yourdomain.com',
  'Admin User',
  '+1 (555) 000-0000',
  'admin',
  NOW(),
  NOW()
);
```

### Step 5.3: Configure Email Notifications

1. In admin dashboard, go to Settings
2. Add SMTP configuration or SendGrid API key
3. Configure the admin email to receive alerts
4. Test email delivery

### Step 5.4: Set Custom Domain (Optional)

1. In Vercel project settings, go to **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions from Vercel
4. Update `NEXT_PUBLIC_SITE_URL` in environment variables

## Part 6: Production Considerations

### Security Checklist

- [ ] Enable 2FA on all admin accounts
- [ ] Set up rate limiting for login attempts
- [ ] Enable database backups in Supabase
- [ ] Configure SSL/TLS (automatic with Vercel)
- [ ] Review RLS (Row Level Security) policies
- [ ] Enable audit logging
- [ ] Set up monitoring and alerts
- [ ] Regular security audits

### Performance Optimization

- [ ] Enable caching headers
- [ ] Configure CDN (Vercel includes this)
- [ ] Optimize database queries
- [ ] Monitor performance metrics in Vercel dashboard

### Backup Strategy

1. **Database**: Supabase offers automated daily backups
2. **Code**: GitHub serves as your code backup
3. **Documents**: Store in Supabase Storage with backups enabled

## Troubleshooting

### Deployment Fails

**Issue**: Build fails during Vercel deployment

**Solution**:
1. Check Vercel logs for specific error
2. Verify all environment variables are set correctly
3. Run `npm run build` locally to replicate error
4. Fix issue and push to GitHub (Vercel will auto-redeploy)

### Database Connection Error

**Issue**: `Error: Failed to connect to database`

**Solution**:
1. Verify Supabase URL and API keys in environment variables
2. Check that schema.sql was run successfully
3. Verify your IP isn't blocked (Supabase settings)
4. Test connection locally first

### Email Not Sending

**Issue**: Notifications not received

**Solution**:
1. Verify `NEXT_PUBLIC_ADMIN_EMAIL` is correct
2. Check SMTP configuration in admin settings
3. Review Supabase logs for errors
4. Test with SendGrid or alternative email service

### Users Can't Login

**Issue**: Login page gives error

**Solution**:
1. Verify email verification is enabled in Supabase
2. Check user exists in `users` table
3. Verify password is correct
4. Clear browser cookies and try again

## Monitoring & Maintenance

### Weekly Tasks

- Check deployment logs in Vercel
- Review admin dashboard for system health
- Test critical workflows

### Monthly Tasks

- Review audit logs for suspicious activity
- Check backup status in Supabase
- Test disaster recovery procedures
- Update dependencies: `npm update`

### Quarterly Tasks

- Security audit of RLS policies
- Performance review and optimization
- Compliance check against regulations
- Database optimization

## Scaling Considerations

As your platform grows:

1. **Database**: Monitor Supabase resource usage
2. **API**: Monitor rate limits and response times
3. **Storage**: Set up document archive system
4. **Infrastructure**: Vercel auto-scales, but monitor costs

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS Docs**: https://tailwindcss.com/docs

## Success!

Your Diabitrage Asset Recovery Platform is now live! 🎉

- **Production URL**: Your Vercel deployment URL
- **Admin Dashboard**: `/admin`
- **Client Portal**: `/dashboard`
- **Landing Page**: `/`

Start inviting clients and managing recovery cases.

---

**Last Updated**: July 2024
**Version**: 1.0.0
