# Article Image Guide

This document outlines how to store and reference images for articles in this Hugo site.

## Image Storage Location

All article images should be stored in the `static/assets/articles/` directory, organized by article slug:

```
static/
  assets/
    articles/
      {article-slug}/
        banner.jpg          # Featured image
        image1.jpg          # Additional images
        image2.png
        ...
```

### Example Structure

```
static/
  assets/
    articles/
      reshh/
        banner.jpg
      deepfakes-anonymous-group-therapy/
        deepfake.jpg
        persona_working_image.jpg
      zipli-rescuing-surplus-food-at-scale/
        banner.jpg
```

## Featured Image (Frontmatter)

The featured image is set in the article's frontmatter using an **absolute path** starting with `/assets/`:

```yaml
---
title: "Article Title"
date: 2025-01-20
draft: false
categories: ["Projects"]
tags: ["Tag1", "Tag2"]
readTime: "4 min read"
featuredImage: "/assets/articles/{article-slug}/banner.jpg"
description: "Article description"
---
```

### Examples

- `featuredImage: "/assets/articles/reshh/banner.jpg"`
- `featuredImage: "/assets/articles/deepfakes-anonymous-group-therapy/deepfake.jpg"`
- `featuredImage: "/assets/articles/zipli-rescuing-surplus-food-at-scale/banner.jpg"`

**Important:** The featured image is automatically used for:
- Article display on the site
- Open Graph (Facebook/LinkedIn) social media previews
- Twitter Card social media previews
- JSON-LD structured data

## Inline Images (Markdown Content)

Inline images in the article body can use **absolute paths** (recommended) or **relative paths**:

### Absolute Path (Recommended)

```markdown
![Alt text](/assets/articles/{article-slug}/image1.jpg)
```

**Example:**
```markdown
![Persona working image](/assets/articles/deepfakes-anonymous-group-therapy/persona_working_image.jpg)
```

### Relative Path (Alternative)

If images are stored in the same directory as the markdown file (in `content/articles/{article-slug}/`), you can use relative paths:

```markdown
![Alt text](image1.jpg)
```

**Note:** This approach is less common in this codebase. Most articles use absolute paths from `/assets/articles/`.

## Step-by-Step: Adding Images to a New Article

1. **Create the article directory in static:**
   ```bash
   mkdir -p static/assets/articles/{article-slug}
   ```

2. **Copy your images to that directory:**
   ```bash
   cp your-banner.jpg static/assets/articles/{article-slug}/banner.jpg
   cp your-image.jpg static/assets/articles/{article-slug}/image1.jpg
   ```

3. **Set featured image in frontmatter:**
   ```yaml
   featuredImage: "/assets/articles/{article-slug}/banner.jpg"
   ```

4. **Reference inline images in markdown:**
   ```markdown
   ![Description](/assets/articles/{article-slug}/image1.jpg)
   ```

## Image Naming Conventions

- **Featured images:** Typically named `banner.jpg` or `{article-slug}.jpg`
- **Additional images:** Use descriptive names like `persona_working_image.jpg`, `screenshot_1.jpg`, etc.
- **File formats:** `.jpg`, `.png`, `.webp` are all supported

## Path Resolution

- **Static folder:** Files in `static/` are copied to the site root during build
- **Path in frontmatter/markdown:** Use `/assets/...` (absolute from site root)
- **Hugo automatically:** Copies `static/assets/` → `public/assets/` during build

## Examples from Existing Articles

### Deepfakes Article
- **Location:** `static/assets/articles/deepfakes-anonymous-group-therapy/`
- **Featured:** `featuredImage: "/assets/articles/deepfakes-anonymous-group-therapy/deepfake.jpg"`
- **Inline:** `![Persona working image](/assets/articles/deepfakes-anonymous-group-therapy/persona_working_image.jpg)`

### Zipli Article
- **Location:** `static/assets/articles/zipli-rescuing-surplus-food-at-scale/`
- **Featured:** `featuredImage: "/assets/articles/zipli-rescuing-surplus-food-at-scale/banner.jpg"`

### Reshh Article
- **Location:** `static/assets/articles/reshh/`
- **Featured:** `featuredImage: "/assets/articles/reshh/banner.jpg"`

## Quick Reference Checklist

When creating a new article with images:

- [ ] Create directory: `static/assets/articles/{article-slug}/`
- [ ] Copy featured image to: `static/assets/articles/{article-slug}/banner.jpg`
- [ ] Set frontmatter: `featuredImage: "/assets/articles/{article-slug}/banner.jpg"`
- [ ] Use absolute paths for inline images: `/assets/articles/{article-slug}/filename.jpg`
- [ ] Verify images appear correctly after Hugo build

