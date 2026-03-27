# Supabase Edge Functions

This project includes one function:

- `invite-user`: sends auth invites and creates/updates the `User` profile role.

## Deploy

1. Install Supabase CLI and login:

```bash
supabase login
```

2. Link your project:

```bash
supabase link --project-ref YOUR_PROJECT_REF
```

3. Deploy function:

```bash
supabase functions deploy invite-user
```

4. Set required function secrets:

```bash
supabase secrets set SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are provided by Supabase runtime.
