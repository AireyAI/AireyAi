# AireyAI Cloudflare Deploy

This site should deploy through Cloudflare Pages from a clean static bundle, not from the repository root.

## Why It Drifted

- The repo has a `CNAME` for `aireyai.co.uk`, which points to a GitHub Pages-style deployment setup.
- There was no `wrangler` or Cloudflare Pages build config in the repo.
- There is a `.vercelignore`, which suggests at least one Vercel deployment path was prepared.
- The repo root contains local-only files (`node_modules`, docs, screenshots, audit artifacts), so deploying `.` directly would publish too much.

## Build

```bash
npm run build
```

This writes a Cloudflare-ready static bundle to `dist/`.

## Deploy Preview

```bash
npm run deploy:cloudflare:preview
```

## Deploy Production

Only run this after checking Cloudflare authentication and approving the production change.

```bash
npm run deploy:cloudflare
```

## Cloudflare Pages Settings

- Project name: `aireyai`
- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Custom domains:
  - `aireyai.co.uk`
  - `www.aireyai.co.uk`

## DNS Target

If Cloudflare is authoritative for the zone, attach the custom domains in Pages and let Cloudflare create/validate the records.

If the domain remains at another registrar/DNS host, point DNS at the Cloudflare Pages target shown in the Pages dashboard. Do not delete unknown DNS records.

## Rollback

Cloudflare Pages keeps deployment history. Roll back by promoting the previous known-good deployment in the Pages dashboard, or by redeploying the previous Git commit.
