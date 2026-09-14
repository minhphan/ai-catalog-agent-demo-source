# Deploying Atelier / Ops

This package contains a static React/Vite website. For ordinary static hosting, upload the contents of `dist/public/` to the public web root of your hosting account. The application is client-side rendered and does not require a database or backend for the current demo flow.

## Build locally

Use Node.js 20 or newer and pnpm:

```bash
pnpm install
pnpm build
```

The production website is generated in `dist/public/`. The source archive also includes the complete React source under `client/`, the Vite configuration, and the lockfile.

## Static hosting

Upload all files inside `dist/public/`, including the generated `assets/` directory, to the hosting document root. If the hosting provider supports SPA rewrites, route all unknown paths to `/index.html`. The current demo primarily uses `/`, but the rewrite keeps client-side navigation safe.

Examples:

- **cPanel / shared hosting:** upload `dist/public/` contents into `public_html/`.
- **Nginx:** set the site root to `dist/public` and use `try_files $uri $uri/ /index.html;`.
- **Apache:** enable rewrite support and route unknown requests to `index.html`.
- **Vercel / Netlify / Cloudflare Pages:** set the build command to `pnpm build`, the publish directory to `dist/public`, and use the included `pnpm-lock.yaml`.

## Important asset note

The demo references the generated product images through the existing `/manus-storage/...` asset URLs. These URLs work in the packaged frontend as long as the original asset storage remains available. If you want the site to be completely independent of that storage, replace the image URLs in `client/src/pages/Home.tsx` with files hosted on your own CDN or public asset directory, then run `pnpm build` again.

## Runtime behavior

The comparison flow is frontend-only for this demo. It supports selecting Version A and Version B tones, generating both outputs from the same product record, checking fact consistency, selecting one version, and approving it for a test-store state. It does not publish to production or connect to a real Shopify store.
