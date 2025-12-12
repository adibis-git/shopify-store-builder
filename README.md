# Shopify Store Builder - Landing Page

A modern, conversion-optimized landing page for a Shopify store-building service built with Next.js, React, Tailwind CSS, and shadcn/ui components.

## Features

✅ **8 Complete Sections:**
1. **Hero Section** - Bold headline with dual CTAs and trust badges
2. **Problem-Agitate-Solution** - Three-column layout addressing store owner pain points
3. **Example Store Previews** - Showcase of 3 example stores with conversion metrics
4. **Key Features & Benefits** - 6 feature cards highlighting core capabilities
5. **Pricing Section** - Two service tiers (Shopify Setup vs. Custom Next.js Store)
6. **Social Proof** - 4 client testimonials with star ratings
7. **FAQ Accordion** - 6 common questions with expandable answers
8. **Final CTA Section** - Gradient background with final call-to-action

✅ **Lead Capture:**
- Modal dialog form with fields: Name, Email, Store URL, Message
- Form submission handling (currently logs to console, ready for Supabase integration)
- Mobile sticky CTA button for easy access on mobile devices

✅ **Responsive Design:**
- Mobile-first approach
- Sticky header with navigation
- Responsive grid layouts (md: 2 cols, lg: 3 cols)
- Mobile sticky CTA at bottom
- Optimized touch targets

✅ **Modern UI:**
- Shadcn/ui components (Button, Card, Badge, Input, Textarea, Label, Accordion, Dialog)
- Lucide React icons
- Tailwind CSS styling
- Smooth animations and transitions
- Professional color scheme (blue accent, slate neutrals)

## Tech Stack

- **Framework:** Next.js 14.2
- **React:** 18.3
- **Styling:** Tailwind CSS 3.4
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Form Handling:** React Hook Form (ready for integration)
- **Validation:** Zod (ready for integration)

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
/Users/aditya/SAAS/Ecommerce/
├── app/
│   ├── page.tsx           # Main landing page component
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   └── ui/                # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       ├── input.tsx
│       ├── textarea.tsx
│       ├── label.tsx
│       ├── accordion.tsx
│       └── dialog.tsx
├── lib/
│   └── utils.ts           # Utility functions (cn)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
└── components.json        # shadcn/ui config
```

## Lead Capture Form

The form is currently set up to:
1. Collect: Name, Email, Store URL (optional), Message
2. Log submission to console
3. Show success message for 2 seconds
4. Clear form and close modal

### Future Integration (Supabase)

To integrate with Supabase:

1. Create a `leads` table in Supabase with columns:
   - `id` (uuid, primary key)
   - `name` (text)
   - `email` (text)
   - `store_url` (text, nullable)
   - `message` (text, nullable)
   - `created_at` (timestamp)

2. Add environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   ```

3. Create an API route (`app/api/leads/route.ts`) to handle form submissions

4. Update the form submission handler in `app/page.tsx`

## Customization

### Colors
Edit `app/globals.css` to change the color scheme. Currently using:
- Primary: Blue (#221.2 83.2% 53.3%)
- Accent: Light slate
- Neutral: Slate grays

### Content
All text, pricing, testimonials, and FAQ items are hardcoded in `app/page.tsx`. Update them directly or move to a CMS.

### Sections
Each section is clearly marked with comments. You can:
- Reorder sections
- Hide/show sections
- Modify section content
- Add new sections

## Responsive Breakpoints

- **Mobile:** < 768px (md)
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px (lg)

Mobile sticky CTA is hidden on md and above screens.

## Performance

- Optimized images (emoji placeholders for example stores)
- Minimal dependencies
- Server-side rendering with Next.js
- CSS-in-JS with Tailwind (no runtime overhead)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Next Steps

1. **Customize content** - Update headlines, copy, pricing, testimonials
2. **Add real images** - Replace emoji placeholders with actual store screenshots
3. **Integrate Supabase** - Wire up lead capture to database
4. **Add analytics** - Implement tracking for CTAs and form submissions
5. **Deploy** - Push to Vercel or your hosting platform
6. **A/B testing** - Test different headlines, CTAs, and layouts

## License

MIT
