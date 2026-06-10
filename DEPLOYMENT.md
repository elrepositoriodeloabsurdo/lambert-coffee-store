# 🚀 Deployment Guide - Lambert Coffee Store

## Quick Deploy Options

### **Option 1: Vercel (Recommended - Fastest)**
Perfect for quick demos and production-ready deployments.

1. **Create GitHub Repository:**
   ```bash
   cd your-project-folder
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/lambert-coffee.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Select your repository
   - Environment variables will be auto-detected
   - Click "Deploy"
   - Share the live URL with your client!

**Vercel Pros:**
- ✅ Instant automatic deployments when you push to GitHub
- ✅ Free tier perfect for demos
- ✅ Custom domain support
- ✅ Serverless functions (if you need backend later)
- ✅ Environment variables in dashboard

---

### **Option 2: Netlify (Alternative)**
Similar to Vercel, also excellent for React apps.

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Select GitHub
4. Choose your repository
5. Build settings auto-filled (Vite detected)
6. Add environment variables
7. Deploy

---

### **Option 3: Build & Host Manually**

If you want to host on your own server or use another service:

```bash
# Build the project
npm run build

# The dist/ folder contains your production build
# Upload the contents of dist/ to any static hosting
```

---

## Environment Variables Setup

**In Vercel Dashboard:**
1. Go to Project Settings → Environment Variables
2. Add each variable:
   - `VITE_TUU_CHECKOUT_URL` = Your Tuu checkout link (optional)
   - `VITE_TRANSBANK_CHECKOUT_URL` = Your Transbank link (optional)

---

## Pre-Deployment Checklist

- [ ] Test locally: `npm run dev`
- [ ] Check build: `npm run build`
- [ ] Preview build: `npm run preview`
- [ ] Remove sensitive data from git
- [ ] Ensure `.gitignore` includes `.env.local`

---



## GitHub Pages Deploy

This repository includes `.github/workflows/deploy-github-pages.yml`. To publish it:

1. Push the repository to GitHub using the `main` branch.
2. In **Settings → Pages**, choose **GitHub Actions** as the Pages source.
3. Push to `main` or run the workflow manually.

The workflow sets `VITE_BASE_PATH` to `/${{ github.event.repository.name }}/` so Vite assets work under the GitHub Pages subpath.

## Vercel Deploy

`vercel.json` is configured for Vite with `dist/` as output and SPA rewrites to `index.html`.

Use the dashboard import flow or, if authenticated with the Vercel CLI, run:

```bash
npm run deploy:vercel
```

Optional environment variables:

- `VITE_WHATSAPP_NUMBER`
- `VITE_TUU_CHECKOUT_URL`
- `VITE_TRANSBANK_CHECKOUT_URL`

The app has demo fallbacks, so these variables are not required for a preview deploy.

## Local Fullstack Deploy

Use this option when you want to review the final design through a production Vite build served by a local Express backend.

```bash
npm install
npm run deploy:local
```

Open `http://localhost:3000`. The command builds `dist/` and starts `server.ts`, which serves the React app and exposes local test APIs:

- `GET /api/health`
- `GET /api/inventory`
- `POST /api/orders`

To change the port, run for example `PORT=4000 npm run deploy:local` and open `http://localhost:4000`.

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (accessible at http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## After Deployment

1. **Share URL with client:** https://your-vercel-app.vercel.app
2. **Custom domain:** (Paid Vercel plan)
3. **SSL/HTTPS:** Automatic with Vercel
4. **Analytics:** Available in Vercel dashboard

---

## Troubleshooting

**Build fails:**
- Check Node version compatibility (v16+)
- Verify all dependencies in package.json
- Check environment variables are set

**Site looks broken:**
- Clear browser cache
- Check Vite build output in `dist/`
- Verify public assets path in vite.config.ts

---

## Quick Start Commands

```bash
# One-time setup
npm install

# For development/testing
npm run dev

# Before deploying
npm run build && npm run preview

# Clean up
npm run clean
```

Enjoy! 🎉
