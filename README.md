# Paevos

Pre-launch site and waitlist for Paevos, a money assistant for iPhone. Live at https://paevos.com.

## Layout

- `src/` page parts, stitched into `public/index.html` by `build.sh`
- `src/meta.html` link preview tags (X, iMessage, etc.)
- `api/join.js` Vercel function: adds the email to Resend contacts and sends the welcome email
- `assets/` email logo and link preview image

## Build and deploy

Vercel settings: build command `sh build.sh`, output directory `public`, no framework.

Environment variables: `RESEND_API_KEY` (full access), `RESEND_FROM` (`Paevos <hello@paevos.com>`), optional `RESEND_SEGMENT_ID`.

Local preview: `sh build.sh && npx vercel dev`
