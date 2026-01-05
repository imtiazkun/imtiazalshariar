# imtiazalshariar.com

Personal portfolio and blog site for Imtiaz Al Shariar - Design-forward Product Engineer. Built with Hugo static site generator and deployed to GitHub Pages.

## About

This site showcases:
- **Portfolio**: Design-forward product engineering work and case studies
- **Articles**: Technical insights, design thinking, and thought leadership
- **Case Studies**: Real-world projects including climate change programs and scalable system architecture

## Project Structure

```
.
├── content/              # Site content (Markdown files)
│   ├── _index.md        # Homepage content
│   └── articles/        # Blog articles and case studies
├── layouts/             # Hugo templates
│   ├── articles/        # Article list and single page templates
│   └── index.html       # Homepage template
├── static/              # Static assets (images, favicons, etc.)
│   └── assets/          # Images, icons, and other media
├── assets/              # Source assets (processed by Hugo)
├── public/              # Generated site (gitignored, built on deploy)
└── hugo.toml           # Hugo configuration
```

## Content

### Articles

The site includes articles on:
- **Technical Topics**: AI integration challenges, scalable systems architecture
- **Design Thinking**: Product development processes and methodologies
- **Case Studies**: Climate change programs, NGO work, and community initiatives

Articles are written in Markdown with front matter for metadata (title, date, categories, tags, etc.).

## Local Development

### Prerequisites

- [Hugo](https://gohugo.io/) (Extended version recommended)
- Git

### Setup

```bash
# Install Hugo (macOS)
brew install hugo

# Clone the repository
git clone <repository-url>
cd imtiazalshariar

# Run development server
hugo server -D

# The site will be available at http://localhost:1313
```

### Commands

```bash
# Start development server with drafts
hugo server -D

# Build site for production
hugo

# Build with verbose output
hugo -v
```

## Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the `main` branch.

### Deployment Configuration

- **Platform**: GitHub Pages
- **Custom Domain**: `imtiazalshariar.com`
- **Build**: Automated via `.github/workflows/hugo.yml`
- **DNS**: Configured via Cloudflare

### Manual Deployment

If you need to deploy manually:

```bash
# Build the site
hugo

# The generated site will be in the `public/` directory
# Push to GitHub to trigger automatic deployment
```

## Adding New Content

### Create a New Article

```bash
# Create new article (Hugo will create the directory structure)
hugo new articles/my-new-article/index.md
```

Edit the front matter in the generated file:

```yaml
---
title: "Your Article Title"
date: 2024-01-15
draft: false
categories: ["Technical"]
tags: ["tag1", "tag2"]
readTime: "5 min read"
description: "Article description for SEO and previews"
---
```

### Article Assets

Place article-specific images in the article's directory:
```
content/articles/my-article/
├── index.md
├── banner.jpg
└── cover.jpg
```

## Configuration

Main configuration is in `hugo.toml`:
- Site title and description
- Social media links (GitHub, LinkedIn)
- SEO settings (Google Analytics, site verification)
- Open Graph and Twitter Card metadata

## Technologies

- **Hugo**: Static site generator
- **GitHub Pages**: Hosting
- **GitHub Actions**: CI/CD
- **Cloudflare**: DNS and CDN

## License

This project is personal and proprietary.
