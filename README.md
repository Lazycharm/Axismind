# AxisMind Frontend

React + Vite website migrated to Supabase for backend/data and prepared for Netlify deployment.

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Update `.env` (or create `.env.local`) with your Supabase values:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can also copy from `.env.example`.

3. Run the app:

```bash
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- SPA fallback is configured in `netlify.toml`

## Supabase Notes

- Expected tables include `Portfolio`, `Testimonial`, `Team`, `Contact`, `SiteSettings`, and `User` (or compatible alternatives).
- Image uploads use Supabase Storage bucket: `uploads`.
- Optional function used by admin invite flow: `invite-user`.

## Apply Supabase Setup

1. Open Supabase SQL Editor and run `supabase/schema.sql`.
2. Deploy the invite function:

```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase functions deploy invite-user
supabase secrets set SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```
