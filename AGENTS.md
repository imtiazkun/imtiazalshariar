# AGENTS.md

Guidelines for agentic coding assistants working in this repository.

## Project Overview

This is a Hugo static site (portfolio + blog) deployed to GitHub Pages. It uses Hugo Extended v0.121.0, Tailwind CSS v4 (CDN), and Dart Sass.

## Build / Lint / Test Commands

- **Dev server:** `hugo server -D` (includes drafts)
- **Production build:** `hugo --gc --minify`
- **Check for broken links:** `hugo --gc` and review warnings
- **No automated test suite** is configured.
- **No linter / formatter** is configured; maintain consistency manually.

## Hugo Configuration

- Config file: `hugo.toml`
- Base URL: `https://imtiazalshariar.com/`
- Build future posts enabled (`buildFuture = true`)
- Pagination size: 10

## Content Guidelines

### File Organization

- Content lives in `content/<section>/`.
- Articles: `content/articles/<slug>/index.md`
- Page bundles (images alongside content) are preferred.
- Static assets (favicons, global images): `static/assets/...`

### Frontmatter (YAML)

Use YAML frontmatter for all content files:

```yaml
---
title: "Post Title"
date: 2026-01-15
draft: false
categories: ["Projects"]
tags: ["Tag1", "Tag2"]
readTime: "2 min read"
featuredImage: "/assets/articles/<slug>/image.jpg"
description: "Short summary for SEO and listings."
---
```

- `title`: sentence case, concise
- `date`: ISO 8601 (`YYYY-MM-DD` or full datetime)
- `draft`: `false` when ready to publish
- `categories`: array of strings, first item appears as the primary category badge
- `tags`: array of strings
- `featuredImage`: path under `static/assets/...`
- `description`: used for meta tags and list summaries

## Template Guidelines (HTML/Go)

### Formatting

- Indent with 4 spaces.
- Keep tag attributes on the same line when possible; break to new lines only when readability suffers.
- Use double quotes for HTML attributes.

### Hugo Templating

- Use `{{ .Site.Params.paramName }}` for global params defined in `hugo.toml`.
- Use `{{ .Params.paramName }}` for page-level frontmatter.
- Prefer `{{ if .Param }}` guards over assuming presence.
- Use `range` with `$i, $item` for indexing when needed.
- Use `where` and `first` for filtering page lists.

Example:
```html
{{ range first 3 (where .Site.RegularPages "Section" "articles") }}
<article>
    <h3>{{ .Title }}</h3>
    <p>{{ .Params.description | default .Summary | truncate 150 }}</p>
</article>
{{ end }}
```

### SEO / Meta

- Every page should include: title, description, canonical, OG tags, Twitter card tags.
- JSON-LD structured data is included in `layouts/index.html`.
- Respect `.Site.Params.seo.*` and `.Site.Params.og.*` for site-wide defaults.

## Styling (CSS / Tailwind)

- Tailwind CSS v4 is loaded via CDN in `<head>`.
- Custom styles go inside `<style>` tags in templates (no separate CSS build step).
- Use Tailwind utility classes for layout, spacing, typography, and colors.
- Dark mode is implemented via `prefers-color-scheme: dark` media queries; respect existing selectors.
- Use `!important` sparingly; existing dark-mode overrides use it for specificity.

## JavaScript

- Vanilla JS only; no build step.
- Place scripts at the bottom of `<body>` or use `DOMContentLoaded`.
- Keep inline scripts inside templates.
- Use `const` / `let`; avoid `var`.
- Use strict equality (`===`, `!==`).

## Naming Conventions

- Layout files: lowercase with hyphens (e.g., `case-studies/list.html`).
- Content directories: lowercase with hyphens.
- Image filenames: lowercase with hyphens, descriptive.
- Params / keys: camelCase in `hugo.toml` and frontmatter.

## Error Handling / Safety

- Guard optional params: `{{ if .Params.featuredImage }}...{{ end }}`
- Check for nil/empty slices before ranging.
- Use `safeHTML` or `safeJS` only when content is trusted/controlled.
- Always add `rel="noopener noreferrer"` to external links with `target="_blank"`.

## Deployment

- GitHub Actions workflow: `.github/workflows/hugo.yml`
- Pushes to `main` trigger a build and deploy to GitHub Pages.
- Build flags: `--gc --minify`

## Commit Rules

- Do NOT commit secrets, API keys, or tokens.
- Do NOT commit the `public/` or `resources/` directories.
- Keep commits focused and atomic.

## No Existing Cursor / Copilot Rules

No `.cursorrules`, `.cursor/rules/`, or `.github/copilot-instructions.md` files were found in this repository.
