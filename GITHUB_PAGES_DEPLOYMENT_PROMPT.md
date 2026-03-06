# GitHub Pages Deployment Setup for Hugo

Set up GitHub Pages deployment for this Hugo site using GitHub Actions. Here's the complete configuration:

## 1. Create GitHub Actions Workflow

Create `.github/workflows/hugo.yml` with the following content:

```yaml
name: Deploy Hugo site to Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

defaults:
  run:
    shell: bash

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Install Hugo CLI
        run: |
          wget -O /tmp/hugo.deb https://github.com/gohugoio/hugo/releases/download/v0.121.0/hugo_extended_0.121.0_linux-amd64.deb
          sudo dpkg -i /tmp/hugo.deb || sudo apt-get install -f
      - name: Install Dart Sass
        run: sudo snap install dart-sass
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive
          fetch-depth: 0
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v4
      - name: Install Node.js dependencies
        run: "[[ -f package-lock.json || -f npm-shrinkwrap.json ]] && npm ci || true"
      - name: Build with Hugo
        env:
          HUGO_ENVIRONMENT: production
          HUGO_ENV: production
        run: |
          hugo \
            --gc \
            --minify \
            --baseURL "${{ steps.pages.outputs.base_url }}/"
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 2. Configure GitHub Pages Settings

1. Go to your repository Settings → Pages
2. Under "Source", select "GitHub Actions" (not "Deploy from a branch")
3. This enables the GitHub Actions workflow to deploy your site

## 3. Custom Domain (Optional)

If you want to use a custom domain:

1. Create `static/CNAME` file with your domain name (e.g., `example.com`)
2. Update `baseURL` in `hugo.toml` to match your custom domain (e.g., `baseURL = 'https://example.com/'`)
3. Configure DNS records for your domain to point to GitHub Pages (see GitHub's documentation)

## 4. Hugo Configuration

Ensure your `hugo.toml` (or `config.toml`) has the correct `baseURL`:
- For GitHub Pages subdomain: `baseURL = 'https://username.github.io/repository-name/'`
- For custom domain: `baseURL = 'https://yourdomain.com/'`

## 5. How It Works

1. **Trigger**: Workflow runs on push to `main` branch or manual dispatch
2. **Build Job**:
   - Installs Hugo Extended v0.121.0 (includes Sass/SCSS support)
   - Installs Dart Sass for SCSS compilation
   - Checks out code with submodules
   - Configures GitHub Pages
   - Installs Node.js dependencies if present
   - Builds Hugo site with production settings (garbage collection and minification enabled)
   - Uses dynamic baseURL from GitHub Pages configuration
   - Uploads `public` directory as artifact
3. **Deploy Job**:
   - Deploys the artifact to GitHub Pages
   - Provides deployment URL

## 6. Notes

- The workflow uses Hugo Extended version for full feature support (including SCSS)
- `--gc` flag enables garbage collection to remove unused files
- `--minify` flag minifies HTML, CSS, and JS output
- The baseURL is dynamically set from GitHub Pages configuration
- Concurrency group prevents multiple deployments from running simultaneously
- Permissions are set to minimum required: read contents, write pages, and id-token for OIDC

## 7. Testing

After pushing this workflow:
1. Check the Actions tab in your repository
2. The workflow should run automatically on push to `main`
3. Once complete, your site will be available at your GitHub Pages URL
4. For custom domains, DNS propagation may take a few minutes to hours
