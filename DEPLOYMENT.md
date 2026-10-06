# Deployment Guide - Sprintdown

## Prerequisites

- Vercel account (free tier works)
- Git repository (GitHub, GitLab, or Bitbucket)
- Node.js 16+ (for local testing)

## Deployment Methods

### Method 1: Vercel CLI (Fastest)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Navigate to project**
   ```bash
   cd sprintdown
   ```

3. **Login to Vercel**
   ```bash
   vercel login
   ```

4. **Deploy**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? **sprintdown** (or your choice)
   - Directory? **./** (press Enter)
   - Override build settings? **N**

5. **Deploy to production**
   ```bash
   vercel --prod
   ```

### Method 2: Vercel Dashboard (Recommended for Teams)

1. **Push to Git**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"
   - Select your Git provider (GitHub/GitLab/Bitbucket)
   - Import the sprintdown repository

3. **Configure Project**
   Vercel auto-detects Vite settings:
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```
   
   These are already configured in `vercel.json`, so just click **Deploy**.

4. **Wait for Deployment**
   - Build takes ~30-60 seconds
   - You'll get a URL like: `sprintdown-xyz.vercel.app`

5. **Optional: Custom Domain**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

## Post-Deployment

### Verify Deployment

1. **Open the deployed URL**
   ```
   https://your-project.vercel.app
   ```

2. **Test Core Features**
   - [ ] Page loads correctly
   - [ ] Can add a payment
   - [ ] Payment allocates to first debt
   - [ ] Payment history shows up
   - [ ] Can open settings
   - [ ] Data persists on reload

3. **Test PWA Installation**
   - [ ] Open on iPhone Safari
   - [ ] Tap Share → Add to Home Screen
   - [ ] Open app from home screen
   - [ ] App opens in standalone mode (no browser UI)

### Environment Configuration

No environment variables needed! Sprintdown uses localStorage only.

### Custom Domain Setup (Optional)

1. In Vercel Dashboard → Project → Settings → Domains
2. Add your domain (e.g., `sprintdown.app`)
3. Add DNS records as instructed:
   ```
   Type: CNAME
   Name: @ (or www)
   Value: cname.vercel-dns.com
   ```
4. Wait for DNS propagation (5-10 minutes)

## Monitoring & Updates

### Check Deployment Status
```bash
vercel ls
```

### View Deployment Logs
```bash
vercel logs [deployment-url]
```

### Deploy New Version
Just push to Git (if connected) or run:
```bash
vercel --prod
```

### Rollback
In Vercel Dashboard:
1. Go to Deployments
2. Find previous working deployment
3. Click "⋯" menu → Promote to Production

## Troubleshooting

### Build Fails

**Check build locally first:**
```bash
npm run build
```

If local build succeeds but Vercel fails:
1. Check Node version in Vercel settings
2. Clear build cache in Vercel
3. Re-run deployment

### PWA Not Installing

1. **Check HTTPS**: PWA requires HTTPS (Vercel provides this)
2. **Check manifest**: Visit `/manifest.webmanifest`
3. **Check service worker**: Open DevTools → Application → Service Workers

### localStorage Not Working

- localStorage works automatically in modern browsers
- Check if user is in private/incognito mode
- Check browser console for errors

### Icons Not Showing

- Icons are SVG format in `public/`
- For better compatibility, convert to PNG:
  ```bash
  # Using ImageMagick or online tool
  convert icon-192.svg icon-192.png
  convert icon-512.svg icon-512.png
  ```
- Update `vite.config.ts` to reference PNG files

## Performance Optimization

Current build is already optimized:
- Gzipped assets
- Code splitting
- Tree shaking
- PWA precaching

### Further Optimizations (Optional)

1. **Enable Vercel Analytics**
   ```bash
   npm install @vercel/analytics
   ```
   Add to `main.tsx`:
   ```tsx
   import { Analytics } from '@vercel/analytics/react'
   ```

2. **Add Vercel Speed Insights**
   ```bash
   npm install @vercel/speed-insights
   ```

## Production Checklist

- [x] Build succeeds locally
- [x] All tests pass
- [x] No console errors
- [x] Mobile responsive
- [x] PWA manifest present
- [x] Service worker registered
- [x] Git repository created
- [x] README documentation
- [x] vercel.json configured
- [ ] Deployed to Vercel
- [ ] Tested on deployed URL
- [ ] PWA installation verified

## Maintenance

### Regular Updates
```bash
# Update dependencies
npm update

# Check for security issues
npm audit

# Fix security issues
npm audit fix
```

### Backup Data

Since data is stored in localStorage:
- Users should export important data
- Consider adding export feature in future
- Data is device-local, no server backups

## Cost

**Vercel Free Tier includes:**
- Unlimited deployments
- HTTPS/SSL included
- Automatic caching
- Global CDN
- 100GB bandwidth/month
- Perfect for personal projects

## Support

If deployment issues occur:
1. Check Vercel status page
2. Review Vercel documentation
3. Check build logs in Vercel Dashboard
4. Test local build first

## Quick Reference

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View deployments
vercel ls

# View logs
vercel logs

# Remove deployment
vercel rm [deployment-url]

# Link local project to Vercel project
vercel link
```

---

**Ready to Deploy!** Choose your method above and get Sprintdown live in minutes.
