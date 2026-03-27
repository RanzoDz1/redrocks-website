/**
 * build.js — Vercel build-time environment variable injector
 *
 * Runs automatically on Vercel before the site is served.
 * Set these variables in: Vercel Dashboard → Project → Settings → Environment Variables
 */

const fs = require('fs');

const FILES_TO_PROCESS = ['index.html', 'admin.html'];

const replacements = {
  // ── Contact ───────────────────────────────────────────────────────────────
  '{{PHONE_TEL}}':          process.env.PHONE_TEL          || '+15550000003',
  '{{PHONE_DISPLAY}}':      process.env.PHONE_DISPLAY      || '+1 (555) 000-0003',
  '{{PHONE_DISPLAY_SHORT}}':process.env.PHONE_DISPLAY_SHORT|| '(555) 000-0003',
  '{{EMAIL}}':              process.env.EMAIL              || 'contact@example.com',
};

FILES_TO_PROCESS.forEach((file) => {
  if (!fs.existsSync(file)) return;

  let content = fs.readFileSync(file, 'utf8');

  Object.entries(replacements).forEach(([placeholder, value]) => {
    content = content.split(placeholder).join(value);
  });

  fs.writeFileSync(file, content, 'utf8');
  console.log(`✅ Processed: ${file}`);
});

console.log('Build complete — environment variables injected.');
