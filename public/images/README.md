# Image Storage Structure

This directory contains all static images for the Zahara e-commerce app.

## Directory Structure

```
public/images/
├── products/          # Product images
│   ├── modest-performance-top/
│   │   ├── black-front.jpg
│   │   ├── black-side.jpg
│   │   ├── navy-front.jpg
│   │   └── navy-side.jpg
│   ├── full-coverage-leggings/
│   └── ...
├── hero/              # Hero section images
│   ├── hero-banner.jpg
│   ├── hero-mobile.jpg
│   └── hero-overlay.png
├── categories/        # Category banner images
│   ├── tops-banner.jpg
│   ├── bottoms-banner.jpg
│   └── sets-banner.jpg
└── ui/               # UI elements and icons
    ├── logo-white.svg
    └── brand-pattern.png
```

## Naming Conventions

### Products
```
products/{product-slug}/{color}-{view}.{ext}

Examples:
- modest-performance-top/black-front.jpg
- modest-performance-top/black-side.jpg
- modest-performance-top/navy-front.jpg
- full-coverage-leggings/charcoal-front.jpg
```

### Categories
```
categories/{category-slug}-banner.{ext}

Examples:
- tops-banner.jpg
- bottoms-banner.jpg
- sets-banner.jpg
```

### Hero
```
hero/{purpose}.{ext}

Examples:
- hero-banner.jpg
- hero-mobile.jpg
- hero-overlay.png
```

## Image Specifications

### Product Images
- **Main images**: 800x1200px (3:4 ratio)
- **Thumbnails**: 400x600px (3:4 ratio)
- **Format**: WebP (preferred) or JPG
- **Quality**: 85-90% (compressed for web)
- **File size**: Under 200KB per image

### Hero Images
- **Desktop**: 1920x1080px (16:9 ratio)
- **Mobile**: 750x1334px (9:16 ratio)
- **Format**: WebP or JPG
- **Quality**: 80-85%
- **File size**: Under 300KB

### Category Banners
- **Size**: 1200x400px (3:1 ratio)
- **Format**: WebP or JPG
- **Quality**: 85%
- **File size**: Under 150KB

## Best Practices

1. **Use descriptive alt text** for accessibility
2. **Compress images** before uploading
3. **Use WebP format** for better compression
4. **Create multiple sizes** for responsive design
5. **Use consistent naming** across all products
6. **Include color names** in file names
7. **Maintain aspect ratios** for each image type

## Next Steps

1. Add your product images to the appropriate folders
2. Update the seed.ts file with your new image paths
3. Test that all images load correctly
4. Optimize images for web performance