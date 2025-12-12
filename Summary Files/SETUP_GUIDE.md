# Dropshipping LMS Platform - Setup Guide

## Quick Start

This guide walks you through setting up the Dropshipping LMS platform from scratch.

---

## Step 1: Supabase Database Setup

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project
4. Choose a region close to your users
5. Create a strong password
6. Wait for the project to initialize

### 1.2 Run Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire contents of `supabase/schema.sql`
4. Paste into the SQL editor
5. Click **Run**
6. Wait for all queries to complete successfully

**What this creates:**
- ✅ `user_profiles` - User account information
- ✅ `leads` - Lead capture from landing page
- ✅ `courses` - Course information
- ✅ `course_modules` - Course sections
- ✅ `course_lessons` - Individual lessons
- ✅ `enrollments` - User course enrollments
- ✅ `lesson_progress` - User lesson completion tracking
- ✅ Row-level security (RLS) policies
- ✅ Indexes for performance
- ✅ Triggers for automatic timestamps

### 1.3 Verify Database Setup

Run these queries in SQL Editor to verify:

```sql
-- Check all tables exist
SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;

-- Check RLS is enabled
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;

-- Count indexes
SELECT COUNT(*) as index_count FROM pg_indexes WHERE schemaname = 'public';
```

Expected results:
- 7 tables created
- All tables have RLS enabled
- 15+ indexes created

---

## Step 2: Supabase Authentication Setup

### 2.1 Enable Email Authentication

1. Go to **Authentication** → **Providers**
2. Click **Email**
3. Toggle **Enable Email Provider** to ON
4. Configure email settings:
   - **Confirm email**: Enable (users must verify email)
   - **Double confirm changes**: Enable (for security)
5. Click **Save**

### 2.2 Configure Email Templates

1. Go to **Authentication** → **Email Templates**
2. Customize templates if desired:
   - Confirmation email
   - Password reset email
   - Magic link email
3. Default templates are fine for development

### 2.3 Set Redirect URLs

1. Go to **Authentication** → **URL Configuration**
2. Add redirect URLs:
   - **Redirect URLs**: 
     - `http://localhost:3000/auth/callback`
     - `https://yourdomain.com/auth/callback` (production)
   - **Site URL**: `http://localhost:3000` (or your domain)
3. Click **Save**

---

## Step 3: Environment Variables

### 3.1 Get Supabase Credentials

1. Go to **Project Settings** → **API**
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon Key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Service Role Key** → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

### 3.2 Update .env.local

Edit `/Users/aditya/SAAS/Ecommerce/.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**⚠️ Important:** Never commit `.env.local` to git. It's already in `.gitignore`.

---

## Step 4: Local Development Setup

### 4.1 Install Dependencies

```bash
cd /Users/aditya/SAAS/Ecommerce
npm install
```

### 4.2 Start Development Server

```bash
npm run dev
```

Server runs on: `http://localhost:3000`

### 4.3 Test Lead Capture

1. Open `http://localhost:3000`
2. Click "Get Free Audit"
3. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Contact Number: +1 (555) 000-0000
   - Bio: Test bio
4. Click "Get Free Audit"
5. You should see "Submitted! ✓"

### 4.4 Verify Lead in Supabase

1. Go to Supabase dashboard
2. Go to **Table Editor**
3. Click **leads** table
4. You should see your test lead

---

## Step 5: Current Features

### What's Working ✅

**Landing Page:**
- Hero section with CTAs
- Problem-Agitate-Solution layout
- Example stores showcase
- 6 key features
- Pricing tiers
- Social proof testimonials
- FAQ accordion
- Mobile sticky CTA

**Lead Capture:**
- Modal form with validation
- Fields: Name, Email, Contact Number, Bio
- Saves to Supabase `leads` table
- Error handling
- Loading states
- Success confirmation

**Styling:**
- Tailwind CSS
- Dark mode CSS variables (toggle coming soon)
- Responsive design
- shadcn/ui components

---

## Step 6: Next Steps (Phase 2)

### Authentication System
- [ ] Create login page
- [ ] Create signup page
- [ ] Email verification flow
- [ ] Password reset
- [ ] Session management

### Dark Mode
- [ ] Create theme provider
- [ ] Add theme toggle button
- [ ] Save preference to Supabase

### User Dashboard
- [ ] Create dashboard page
- [ ] Show enrolled courses
- [ ] Track progress
- [ ] Profile management

### LMS Features
- [ ] Course listing page
- [ ] Course detail page
- [ ] Lesson player
- [ ] Progress tracking

---

## Step 7: Deployment

### Option 1: Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import project from GitHub
4. Add environment variables
5. Deploy

### Option 2: Other Platforms

- Netlify
- Railway
- Render
- Self-hosted

---

## Step 8: Troubleshooting

### Issue: "Missing Supabase environment variables"

**Solution:**
- Check `.env.local` has correct values
- Restart dev server: `npm run dev`
- Verify credentials in Supabase dashboard

### Issue: "Failed to save lead"

**Solution:**
- Check `leads` table exists in Supabase
- Verify RLS policies allow inserts
- Check browser console for error details
- Check Supabase logs

### Issue: Dark mode not working

**Solution:**
- Dark mode toggle not yet implemented
- CSS variables are ready in `app/globals.css`
- Will be added in Phase 3

### Issue: Form validation errors

**Solution:**
- All fields are required: Name, Email, Contact Number
- Bio is optional
- Contact Number must be valid format
- Email must be valid email format

---

## Step 9: Database Schema Reference

### leads Table

```
id (UUID) - Primary key
name (TEXT) - User's full name [REQUIRED]
email (TEXT) - User's email address [REQUIRED]
contact_number (TEXT) - Phone number [REQUIRED]
bio (TEXT) - Short bio about applicant [OPTIONAL]
converted_to_user (BOOLEAN) - Has lead signed up? [DEFAULT: false]
created_at (TIMESTAMP) - When lead was captured
```

### user_profiles Table

```
id (UUID) - References auth.users
email (TEXT) - User email
full_name (TEXT) - User's full name
avatar_url (TEXT) - Profile picture URL
theme (TEXT) - 'light' or 'dark'
created_at (TIMESTAMP) - Account creation date
updated_at (TIMESTAMP) - Last update date
```

### courses Table

```
id (UUID) - Primary key
title (TEXT) - Course name
description (TEXT) - Course description
slug (TEXT) - URL-friendly name
category (TEXT) - Course category
level (TEXT) - 'beginner', 'intermediate', 'advanced'
thumbnail_url (TEXT) - Course image
instructor_id (UUID) - References user_profiles
is_published (BOOLEAN) - Is course live?
created_at (TIMESTAMP) - Creation date
updated_at (TIMESTAMP) - Last update date
```

### enrollments Table

```
id (UUID) - Primary key
user_id (UUID) - References user_profiles
course_id (UUID) - References courses
enrolled_at (TIMESTAMP) - When user enrolled
completed_at (TIMESTAMP) - When user completed course
```

### lesson_progress Table

```
id (UUID) - Primary key
user_id (UUID) - References user_profiles
lesson_id (UUID) - References course_lessons
completed (BOOLEAN) - Is lesson complete?
completed_at (TIMESTAMP) - When completed
watch_time_seconds (INTEGER) - Video watch time
```

---

## Step 10: Security Checklist

- [ ] Environment variables set in `.env.local`
- [ ] Service role key kept secret (never in code)
- [ ] RLS policies enabled on all tables
- [ ] Email verification enabled
- [ ] HTTPS enabled in production
- [ ] Redirect URLs configured
- [ ] Database backups enabled
- [ ] Rate limiting configured (future)

---

## Step 11: Performance Optimization

### Current
- Landing page loads in < 2 seconds
- Form submission in < 1 second
- Database queries optimized with indexes

### Future Improvements
- [ ] Image optimization
- [ ] Code splitting
- [ ] Caching strategy
- [ ] CDN for static assets
- [ ] Database query optimization

---

## Step 12: Monitoring & Logging

### Supabase Logs

1. Go to **Logs** in Supabase dashboard
2. View:
   - Database queries
   - API requests
   - Authentication events
   - Errors

### Application Logs

Check browser console for:
- Form submission errors
- API response errors
- TypeScript errors

---

## Step 13: Useful Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Push to GitHub
git add .
git commit -m "Your message"
git push origin main
```

---

## Step 14: File Structure

```
/Users/aditya/SAAS/Ecommerce/
├── app/
│   ├── api/leads/route.ts          # Lead capture API
│   ├── globals.css                 # Global styles + dark mode vars
│   ├── layout.tsx                  # Root layout
│   └── page.tsx                    # Landing page
├── components/ui/                  # shadcn/ui components
├── lib/
│   ├── supabase.ts                 # Supabase client
│   └── utils.ts                    # Utilities
├── supabase/
│   └── schema.sql                  # Database schema
├── .env.local                      # Environment variables
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript config
├── tailwind.config.ts              # Tailwind config
├── next.config.js                  # Next.js config
└── README.md                       # Documentation
```

---

## Step 15: Getting Help

### Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

### Common Issues
- Check `.env.local` is set correctly
- Verify Supabase project is initialized
- Check database schema is created
- Review browser console for errors
- Check Supabase logs for API errors

---

## Summary

You now have:
✅ Supabase project with database schema
✅ Lead capture form working
✅ Landing page deployed locally
✅ Environment variables configured
✅ Ready for Phase 2 (Authentication)

**Next:** Follow the EXPANSION_PLAN.md for Phase 2 implementation (Authentication system).

---

**Document Version:** 1.0
**Last Updated:** December 12, 2025
**Status:** Setup Complete - Ready to Test
