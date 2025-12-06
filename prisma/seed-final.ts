import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database with final products...')

  // Clear existing data to start fresh
  await prisma.productImage.deleteMany({})
  await prisma.productVariant.deleteMany({})
  await prisma.product.deleteMany({})
  await prisma.category.deleteMany({})

  // Create categories
  const topsCategory = await prisma.category.create({
    data: {
      name: 'Tops',
      slug: 'tops',
      description: 'Modest activewear tops for full coverage',
      displayOrder: 1
    }
  })

  const bottomsCategory = await prisma.category.create({
    data: {
      name: 'Bottoms',
      slug: 'bottoms',
      description: 'Modest activewear bottoms for full coverage',
      displayOrder: 2
    }
  })

  const setsCategory = await prisma.category.create({
    data: {
      name: 'Sets',
      slug: 'sets',
      description: 'Complete modest activewear sets',
      displayOrder: 3
    }
  })

  const outerwearCategory = await prisma.category.create({
    data: {
      name: 'Outerwear',
      slug: 'outerwear',
      description: 'Modest outerwear for additional coverage and style',
      displayOrder: 4
    }
  })

  // Create Zeta Compression Jacket
  const zetaProduct = await prisma.product.create({
    data: {
      name: 'Zeta Compression Jacket',
      slug: 'zeta-compression-jacket',
      description: 'Premium compression jacket designed for modest coverage and athletic performance. Features moisture-wicking fabric and a modest cut that provides confidence during any activity.',
      coverageLevel: 'FULL',
      fabricType: 'COMPRESSION',
      activityType: 'RUNNING,TRAINING,GYM,OUTDOOR',
      basePrice: 129.99,
      comparePrice: 169.99,
      categoryId: outerwearCategory.id,
      tags: JSON.stringify(['jacket', 'compression', 'performance', 'outerwear']),
      featured: true
    }
  })

  // Create variants for Zeta jacket (XS to 2XL)
  const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL']
  const zetaJacketColors = [
    { name: 'Black', colorHex: '#0A0A0A', stock: 40 },
    { name: 'Green', colorHex: '#228B22', stock: 35 },
    { name: 'Red', colorHex: '#B22222', stock: 30 },
    { name: 'Beige', colorHex: '#F5DEB3', stock: 35 },
    { name: 'Brown', colorHex: '#8B4513', stock: 30 },
    { name: 'Olive', colorHex: '#808000', stock: 25 }
  ]

  for (const size of sizes) {
    for (const color of zetaJacketColors) {
      await prisma.productVariant.create({
        data: {
          productId: zetaProduct.id,
          sku: `zeta-jacket-${size.toLowerCase()}-${color.name.toLowerCase()}`,
          size,
          color: color.name,
          colorHex: color.colorHex,
          stock: color.stock
        }
      })
    }
  }

  // Create images for Zeta jacket
  const zetaImageUrls = [
    '/images/products/zeta-compression-jacket/noir-front.png',
    '/images/products/zeta-compression-jacket/vert-front.png',
    '/images/products/zeta-compression-jacket/rouge-front.png',
    '/images/products/zeta-compression-jacket/beige-front.png',
    '/images/products/zeta-compression-jacket/brun-front.png',
    '/images/products/zeta-compression-jacket/olive-front.png'
  ]

  const zetaImageAlts = [
    'Zeta Compression Jacket in Black',
    'Zeta Compression Jacket in Green', 
    'Zeta Compression Jacket in Red',
    'Zeta Compression Jacket in Beige',
    'Zeta Compression Jacket in Brown',
    'Zeta Compression Jacket in Olive'
  ]

  for (let i = 0; i < zetaImageUrls.length; i++) {
    await prisma.productImage.create({
      data: {
        productId: zetaProduct.id,
        url: zetaImageUrls[i],
        altText: zetaImageAlts[i],
        position: i
      }
    })
  }

  // Create sample other products
  const otherProducts = [
    {
      name: 'Modest Performance Top',
      slug: 'modest-performance-top',
      description: 'A high-performance modest top designed for full coverage during intense workouts.',
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
      description: 'Premium leggings designed for modest coverage without compromising on style.',
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
      description: 'Complete your modest activewear collection with this coordinating set.',
      coverageLevel: 'FULL',
      fabricType: 'MOISTURE_WICKING',
      activityType: 'YOGA,GYM,RUNNING',
      basePrice: 149.99,
      comparePrice: 189.99,
      categoryId: setsCategory.id,
      tags: JSON.stringify(['set', 'coordinating', 'complete-outfit']),
      featured: false
    }
  ]

  for (const productData of otherProducts) {
    const product = await prisma.product.create({
      data: productData
    })

    // Create standard variants
    const standardColors = [
      { name: 'Black', colorHex: '#0A0A0A', stock: 50 },
      { name: 'Navy', colorHex: '#001F3F', stock: 40 },
      { name: 'Burgundy', colorHex: '#722F37', stock: 30 }
    ]

    for (const size of sizes) {
      for (const color of standardColors) {
        await prisma.productVariant.create({
          data: {
            productId: product.id,
            sku: `${product.slug}-${size.toLowerCase()}-${color.name.toLowerCase()}`,
            size,
            color: color.name,
            colorHex: color.colorHex,
            stock: color.stock
          }
        })
      }
    }

    // Create placeholder images
    for (let i = 0; i < 3; i++) {
      await prisma.productImage.create({
        data: {
          productId: product.id,
          url: '/images/products/zeta-compression-jacket/noir-front.png',
          altText: `${product.name} - View ${i + 1}`,
          position: i
        }
      })
    }
  }

  console.log('✅ Database seeded successfully!')
  console.log('📊 Products created:', otherProducts.length + 1)
  console.log('📏 Size range: XS to 2XL')
  console.log('🎨 Zeta Jacket colors:', zetaJacketColors.length)
  console.log('📸 Images updated for Zeta Compression Jacket')
  console.log('🔄 Total variants created:', (zetaJacketColors.length * sizes.length) + (otherProducts.length * standardColors.length * sizes.length))
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })