# Hugo Site for imtiazalshariar.com

This Hugo site is configured for deployment to GitHub Pages with a custom domain.

## Setup Instructions

### 1. GitHub Repository Setup
1. Create a new repository on GitHub (e.g., `imtiazalshariar.github.io`)
2. Push this code to the `main` branch
3. Go to repository Settings → Pages
4. Under "Source", select "GitHub Actions"

### 2. Cloudflare DNS Configuration
In your Cloudflare dashboard for `imtiazalshariar.com`:

1. **Add CNAME record:**
   - Type: CNAME
   - Name: `www`
   - Target: `imtiazalshariar.github.io`
   - Proxy status: Proxied (orange cloud)

2. **Add A records for root domain:**
   - Type: A
   - Name: `@`
   - Target: `185.199.108.153`
   - Proxy status: Proxied (orange cloud)
   - Add another A record with target: `185.199.109.153`

### 3. GitHub Pages Settings
1. In your GitHub repository, go to Settings → Pages
2. Under "Custom domain", enter: `imtiazalshariar.com`
3. Check "Enforce HTTPS"

### 4. Local Development
```bash
# Install Hugo
brew install hugo

# Run development server
hugo server -D

# Build for production
hugo
```

## Files Created
- `static/CNAME` - Custom domain configuration
- `.github/workflows/hugo.yml` - GitHub Actions deployment workflow
- `hugo.toml` - Updated with correct baseURL

## Deployment
The site will automatically deploy when you push to the `main` branch. The GitHub Actions workflow will:
1. Install Hugo
2. Build the site
3. Deploy to GitHub Pages

Your site will be available at `https://imtiazalshariar.com` once DNS propagation is complete (usually 5-15 minutes).
