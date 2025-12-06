import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database with local images...')

  // Create categories
  const topsCategory = await prisma.category.upsert({
    where: { slug: 'tops' },
    update: {},
    create: {
      name: 'Tops',
      slug: 'tops',
      description: 'Modest activewear tops for full coverage',
      displayOrder: 1
    }
  })

  const bottomsCategory = await prisma.category.upsert({
    where: { slug: 'bottoms' },
    update: {},
    create: {
      name: 'Bottoms',
      slug: 'bottoms',
      description: 'Modest activewear bottoms for full coverage',
      displayOrder: 2
    }
  })

  const setsCategory = await prisma.category.upsert({
    where: { slug: 'sets' },
    update: {},
    create: {
      name: 'Sets',
      slug: 'sets',
      description: 'Complete modest activewear sets',
      displayOrder: 3
    }
  })

  // Product image configurations
  const productImages = {
    'modest-performance-top': {
      colors: ['black', 'navy', 'burgundy', 'sage'],
      views: ['front', 'side', 'detail']
    },
    'full-coverage-leggings': {
      colors: ['black', 'charcoal'],
      views: ['front', 'side', 'back']
    },
    'modest-activewear-set': {
      colors: ['black', 'navy'],
      views: ['front', 'side', 'full']
    },
    'longline-performance-top': {
      colors: ['burgundy', 'sage', 'sand'],
      views: ['front', 'side', 'detail']
    },
    'high-waist-modest-leggings': {
      colors: ['black', 'clay'],
      views: ['front', 'side', 'back']
    },
    'modest-training-set': {
      colors: ['black', 'burgundy'],
      views: ['front', 'side', 'action']
    },
    'modest-yoga-top': {
      colors: ['sage', 'sand'],
      views: ['front', 'side', 'pose']
    },
    'performance-modest-skirt': {
      colors: ['black', 'navy'],
      views: ['front', 'side', 'action']
    }
  }

  // Create products with local images
  const products = [
    {
      name: 'Modest Performance Top',
      slug: 'modest-performance-top',
      description: 'A high-performance modest top designed for full coverage during intense workouts. Made with moisture-wicking fabric and featuring a modest length that provides confidence and comfort.',
      coverageLevel: 'FULL',
      fabricType: 'MOISTURE_WICKING',
      activityType: 'YOGA,RUNNING,GYM',
      basePrice: 89.99,
      comparePrice: 119.99,
      categoryId: topsCategory.id,
      tags: JSON.stringify(['performance', 'full-coverage', 'moisture-wicking']),
      featured: true
    },
    {
      name: 'Full Coverage Leggings',
      slug: 'full-coverage-leggings',
      description: 'Premium leggings designed for modest coverage without compromising on style. Features a high waist and full-length design for complete confidence.',
      coverageLevel: 'FULL',
      fabricType: 'BREATHABLE',
      activityType: 'YOGA,GYM,CASUAL',
      basePrice: 79.99,
      comparePrice: 99.99,
      categoryId: bottomsCategory.id,
      tags: JSON.stringify(['leggings', 'high-waist', 'full-coverage']),
      featured: true
    },
    {
      name: 'Modest Activewear Set',
      slug: 'modest-activewear-set',
      description: 'Complete your modest activewear collection with this coordinating set. Includes both top and bottom for a perfect modest workout outfit.',
      coverageLevel: 'FULL',
      fabricType: 'MOISTURE_WICKING',
      activityType: 'YOGA,GYM,RUNNING',
      basePrice: 149.99,
      comparePrice: 189.99,
      categoryId: setsCategory.id,
      tags: JSON.stringify(['set', 'coordinating', 'complete-outfit']),
      featured: true
    },
    {
      name: 'Longline Performance Top',
      slug: 'longline-performance-top',
      description: 'Extended length performance top providing extra coverage for modest activewear enthusiasts. Perfect for yoga, pilates, and gym workouts.',
      coverageLevel: 'EXTENDED',
      fabricType: 'QUICK_DRY',
      activityType: 'YOGA,PILATES,GYM',
      basePrice: 94.99,
      comparePrice: 124.99,
      categoryId: topsCategory.id,
      tags: JSON.stringify(['longline', 'extended-coverage', 'quick-dry']),
      featured: false
    },
    {
      name: 'High-Waist Modest Leggings',
      slug: 'high-waist-modest-leggings',
      description: 'High-waist leggings designed for maximum coverage and comfort. Features a modest cut and premium fabric for all-day wear.',
      coverageLevel: 'FULL',
      fabricType: 'STRETCH',
      activityType: 'YOGA,GYM,CASUAL',
      basePrice: 84.99,
      comparePrice: 109.99,
      categoryId: bottomsCategory.id,
      tags: JSON.stringify(['high-waist', 'stretch', 'versatile']),
      featured: false
    },
    {
      name: 'Modest Training Set',
      slug: 'modest-training-set',
      description: 'Professional training set designed for modest athletes. Includes moisture-wicking top and coordinating bottoms for complete coverage.',
      coverageLevel: 'FULL',
      fabricType: 'PERFORMANCE',
      activityType: 'TRAINING,GYM,RUNNING',
      basePrice: 159.99,
      comparePrice: 199.99,
      categoryId: setsCategory.id,
      tags: JSON.stringify(['training', 'professional', 'performance']),
      featured: true
    },
    {
      name: 'Modest Yoga Top',
      slug: 'modest-yoga-top',
      description: 'Specially designed yoga top providing modest coverage during all poses. Made with breathable fabric for comfortable practice.',
      coverageLevel: 'FULL',
      fabricType: 'BREATHABLE',
      activityType: 'YOGA,PILATES,MEDITATION',
      basePrice: 87.99,
      comparePrice: 112.99,
      categoryId: topsCategory.id,
      tags: JSON.stringify(['yoga', 'breathable', 'meditation']),
      featured: false
    },
    {
      name: 'Performance Modest Skirt',
      slug: 'performance-modest-skirt',
      description: 'Athletic skirt designed for modest coverage during sports and activities. Built-in shorts provide security and comfort.',
      coverageLevel: 'FULL',
      fabricType: 'ATHLETIC',
      activityType: 'TENNIS,GOLF,CASUAL',
      basePrice: 92.99,
      comparePrice: 119.99,
      categoryId: bottomsCategory.id,
      tags: JSON.stringify(['skirt', 'athletic', 'built-in-shorts']),
      featured: false
    }
  ]

  for (const productData of products) {
    const product = await prisma.product.create({
      data: productData
    })

    // Create variants for each product
    const variants = [
      { size: 'XS', color: 'Black', colorHex: '#0A0A0A', stock: 50 },
      { size: 'S', color: 'Black', colorHex: '#0A0A0A', stock: 75 },
      { size: 'M', color: 'Black', colorHex: '#0A0A0A', stock: 100 },
      { size: 'L', color: 'Black', colorHex: '#0A0A0A', stock: 75 },
      { size: 'XL', color: 'Black', colorHex: '#0A0A0A', stock: 50 },
      { size: 'S', color: 'Navy', colorHex: '#001F3F', stock: 50 },
      { size: 'M', color: 'Navy', colorHex: '#001F3F', stock: 50 },
      { size: 'L', color: 'Navy', colorHex: '#001F3F', stock: 50 },
      { size: 'M', color: 'Burgundy', colorHex: '#722F37', stock: 30 },
      { size: 'L', color: 'Burgundy', colorHex: '#722F37', stock: 30 }
    ]

    for (const variantData of variants) {
      await prisma.productVariant.create({
        data: {
          productId: product.id,
          sku: `${product.slug}-${variantData.size}-${variantData.color.toLowerCase()}`,
          ...variantData
        }
      })
    }

    // Create local images for each product
    const imageConfig = productImages[product.slug]
    const images = []

    // Add main product images (use black color as default)
    if (imageConfig && imageConfig.colors.includes('black')) {
      imageConfig.views.forEach((view, index) => {
        images.push({
          url: `/images/products/${product.slug}/black-${view}.jpg`,
          altText: `${product.name} in Black - ${view} view`,
          position: index
        })
      })
    } else {
      // Fallback: use first available color
      const firstColor = imageConfig?.colors[0] || 'black'
      imageConfig?.views.forEach((view, index) => {
        images.push({
          url: `/images/products/${product.slug}/${firstColor}-${view}.jpg`,
          altText: `${product.name} in ${firstColor.charAt(0).toUpperCase() + firstColor.slice(1)} - ${view} view`,
          position: index
        })
      })
    }

    // Add additional color variant images
    if (imageConfig) {
      imageConfig.colors.forEach(color => {
        if (color !== 'black') {
          images.push({
            url: `/images/products/${product.slug}/${color}-front.jpg`,
            altText: `${product.name} in ${color.charAt(0).toUpperCase() + color.slice(1)} - Front view`,
            position: images.length
          })
        }
      })
    }

    for (const imageData of images) {
      await prisma.productImage.create({
        data: {
          productId: product.id,
          ...imageData
        }
      })
    }
  }

  console.log('✅ Database seeded successfully with local image paths!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })