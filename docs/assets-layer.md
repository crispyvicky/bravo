# Assets Layer Documentation

## Overview

The Assets Layer manages all static files, images, icons, and other media resources used by the application.

## Directory Structure

```
public/
├── founder/           # Founder images
│   ├── founder.png
│   └── founder1.png
├── clients/          # Client logos and images
│   ├── fintech.png
│   ├── mobile.png
│   ├── startup.png
│   └── ...
├── landing-mi.png   # Special landing page image
└── favicon.ico      # Site favicon

src/
└── assets/          # Dynamic assets (if any)
```

## Asset Categories

### Images
- **Founder Photos**: Profile images for team section
- **Client Logos**: Company logos for Wall of Fame
- **Icons**: UI icons and graphics
- **Backgrounds**: Section backgrounds and textures

### Fonts
- **Inter**: Primary font family
- **System Fonts**: Fallback fonts
- **Web Fonts**: CDN-loaded fonts

### Icons
- **Emoji Icons**: Used in client grid
- **SVG Icons**: Scalable vector graphics
- **Icon Fonts**: Font-based icons

## Asset Management

### Image Optimization
- **Formats**: JPEG, PNG, WebP, SVG
- **Compression**: Optimized for web delivery
- **Responsive Images**: Multiple sizes for different devices
- **Lazy Loading**: Implemented via Intersection Observer

### Naming Conventions
- **Descriptive Names**: `founder-profile.png`
- **Consistent Format**: Lowercase with hyphens
- **Organized Structure**: Grouped by purpose

### File Sizes
- **Thumbnails**: < 50KB
- **Regular Images**: < 200KB
- **Large Images**: < 500KB
- **Icons**: < 10KB

## Public Directory

### Purpose
- Static files served directly by the web server
- No processing by Vite bundler
- Accessible via root-relative paths

### Usage in Components
```jsx
// Correct - public asset
<img src="/founder/founder.png" alt="Founder" />

// Incorrect - processed asset
<img src="/src/assets/image.png" alt="Image" />
```

## Asset Guidelines

### Performance
- Optimize images before adding to project
- Use appropriate formats (WebP for photos, SVG for icons)
- Implement lazy loading for below-the-fold images
- Consider CDN for static assets

### Accessibility
- Provide alt text for all images
- Ensure sufficient color contrast
- Use decorative images appropriately
- Support screen readers

### SEO
- Use descriptive file names
- Optimize image metadata
- Implement structured data for images
- Use Open Graph images for social sharing

### Version Control
- Track asset changes in git
- Use git-lfs for large files if needed
- Document asset sources and licenses
- Maintain asset inventory

## Asset Pipeline

### Development
- Assets served directly from public directory
- No processing or optimization
- Fast reload for changes

### Production
- Assets copied to dist directory
- Potential optimization via Vite plugins
- CDN delivery for better performance

### Deployment
- Static hosting serves assets directly
- Cache headers for optimal performance
- Compression enabled at server level

## Maintenance

### Regular Tasks
- Audit unused assets
- Update outdated images
- Optimize new additions
- Monitor file sizes

### Best Practices
- Keep assets organized
- Use consistent naming
- Document asset sources
- Maintain quality standards
