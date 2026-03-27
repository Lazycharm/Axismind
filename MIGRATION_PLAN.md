# Base44 to Supabase + Netlify Migration Plan

## Phase 1 Audit Summary

The following files are Base44-dependent and require migration:

- `src/api/base44Client.js`
- `src/lib/app-params.js`
- `src/lib/AuthContext.jsx`
- `src/lib/NavigationTracker.jsx`
- `src/Layout.jsx`
- `src/lib/PageNotFound.jsx`
- `src/pages/Home.jsx`
- `src/pages/About.jsx`
- `src/pages/Portfolio.jsx`
- `src/pages/Testimonials.jsx`
- `src/pages/Contact.jsx`
- `src/pages/Admin.jsx`
- `src/components/admin/ImageUpload.jsx`
- `README.md`
- `index.html`
- `package.json` (`@base44/sdk`, `@base44/vite-plugin`)
- `entities/*` schema files (Base44 model definitions)

## What Will Be Replaced

- Base44 SDK client and entity calls will be replaced by a Supabase-backed API layer.
- Base44 auth/session checks will be replaced with Supabase auth checks.
- Base44 upload integration will be replaced with Supabase Storage upload.
- Base44 `/contact` endpoint usage will be replaced with direct `contact` table insert.
- Base44 app log API will be replaced with optional `app_logs` table inserts.

## Safe Migration Strategy

1. Add Supabase client and service functions:
   - `src/lib/supabaseClient.js`
   - `src/services/contentService.js`
2. Add compatibility API wrapper:
   - `src/api/backendClient.js`
   - Keep Base44-shaped methods (`entities.*`, `auth.*`, `post`, `integrations.Core.UploadFile`) to avoid breaking existing components mid-migration.
3. Switch app imports from `src/api/base44Client.js` to `src/api/backendClient.js`.
4. Refactor page-level data loading to explicit service functions:
   - `getSiteSettings()`
   - `getPortfolioItems()`
   - `getTeamMembers()`
   - `getTestimonials()`
   - `createContactSubmission()`
5. Validate build and runtime behavior.
6. Remove Base44-only files/dependencies once replacements are verified.

## Files To Delete Only After Replacement Is Confirmed

- `src/api/base44Client.js`
- `src/lib/app-params.js`
- `entities/Contact`
- `entities/Portfolio`
- `entities/SiteSettings`
- `entities/Team`
- `entities/Testimonial`
- Any remaining Base44 README/docs references

## Risk Areas

- Admin access and user role checks currently assume `user.role === "admin"`.
- Existing UI expects `created_date`; Supabase commonly stores `created_at`.
- User invitation (`base44.users.inviteUser`) has no direct browser-equivalent in Supabase without an Edge Function/admin API.
- App-wide auth gating in `AuthContext` currently uses Base44 public app-state endpoint semantics.

## Compatibility Requirements

- Preserve the current frontend shape (`id`, `created_date`, and current field names).
- Add map/transform logic in service wrappers where Supabase column names differ.
- Avoid deleting old modules until all imports are switched and build passes.
