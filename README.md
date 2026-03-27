# Red Rocks Carpet Cleaning — Website

A professional carpet & upholstery cleaning service website built with HTML, CSS, and Vanilla JavaScript.

## 🚀 Deployment (Vercel)

Set the following in your **Vercel Dashboard → Project → Settings → Environment Variables**:

| Variable | Description | Example |
|---|---|---|
| `PHONE_TEL` | Phone for `tel:` links (no formatting) | `+15551234567` |
| `PHONE_DISPLAY` | Phone as displayed (full format) | `+1 (555) 123-4567` |
| `PHONE_DISPLAY_SHORT` | Phone short format (area code + number) | `(555) 123-4567` |
| `EMAIL` | Contact email address | `info@yourcompany.com` |

> **Note:** The HTML uses `{{PLACEHOLDER}}` tokens. Vercel runs `build.js` at deploy time to inject your real values.

## 📁 Project Structure

```
├── index.html    # Main website
├── admin.html    # Admin panel (quote leads)
├── app.js        # Main JavaScript
├── style.css     # All styles
├── build.js      # Vercel build-time env var injector
└── vercel.json   # Vercel deployment config
```
