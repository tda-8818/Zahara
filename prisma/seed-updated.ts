import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database with updated products and sizes...')

  // Clear existing data to start fresh
  await prisma.productImage.deleteMany({})
  await prisma.productVariant.deleteMany({})
  await prisma.product.deleteMany({})
  await prisma.category.deleteMany({})

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

  const outerwearCategory = await prisma.category.upsert({
    where: { slug: 'outerwear' },
    update: {},
    create: {
      name: 'Outerwear',
      slug: 'outerwear',
      description: 'Modest outerwear for additional coverage and style',
      displayOrder: 4
    }
  })

  // Create products with your actual images and updated sizes
  const products = [
    // YOUR ZETA COMPRESSION JACKET
    {
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
    },
    // Other products (using local image paths)
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
    }
  ]

  // Updated sizes: XS to 2XL
  const standardSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL']
  
  // Zeta Jacket specific colors and stock
  const zetaJacketColors = [
    { name: 'Black', colorHex: '#0A0A0A', stock: 40 },
    { name: 'Green', colorHex: '#228B22', stock: 35 },
    { name: 'Red', colorHex: '#B22222', stock: 30 },
    { name: 'Beige', colorHex: '#F5DEB3', stock: 35 },
    { name: 'Brown', colorHex: '#8B4513', stock: 30 },
    { name: 'Olive', colorHex: '#808000', stock: 25 }
  ]

  for (const productData of products) {
    const product = await prisma.product.create({
      data: productData
    })

    // Create variants for each product
    if (product.slug === 'zeta-compression-jacket') {
      // Zeta Jacket variants with actual colors and stock
      for (const size of standardSizes) {
        for (const color of zetaJacketColors) {
          await prisma.productVariant.create({
            data: {
              productId: product.id,
              sku: `zeta-jacket-${size.toLowerCase()}-${color.name.toLowerCase()}`,
              size,
              color: color.name,
              colorHex: color.colorHex,
              stock: color.stock
            }
          })
        }
      }

      // Create images for Zeta jacket (using your actual images)
      const zetaImages = [
        { url: '/images/products/zeta-compression-jacket/noir-front.png', altText: 'Zeta Compression Jacket in Black', position: 0 },
        { url: '/images/products/zeta-compression-jacket/vert-front.png', altText: 'Zeta Compression Jacket in Green', position: 1 },
        { url: '/images/products/zeta-compression-jacket/rouge-front.png', altText: 'Zeta Compression Jacket in Red', position: 2 },
        { url: '/images/products/zeta-compression-jacket/beige-front.png', altText: 'Zeta Compression Jacket in Beige', position: 3 },
        { url: '/images/products/zeta-compression-jacket/brun-front.png', altText: 'Zeta Compression Jacket in Brown', position: 4 },
        { url: '/images/products/zeta-compression-jacket/olive-front.png', altText: 'Zeta Compression Jacket in Olive', position: 5 }
      ]

      for (const imageData of zetaImages) {
        await prisma.productImage.create({
          data: imageData
        })
      }

    } else {
      // Other products with standard colors
      const standardColors = [
        { name: 'Black', colorHex: '#0A0A0A', stock: 50 },
        { name: 'Navy', colorHex: '#001F3F', stock: 40 },
        { name: 'Burgundy', colorHex: '#722F37', stock: 30 }
      ]

      for (const size of standardSizes) {
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

      // Placeholder images for other products (you can replace these later)
      const placeholderImages: Array<{
        url: string
        altText: string
        position: number
      }> = [
        { url: '/images/products/zeta-compression-jacket/noir-front.png', altText: `${product.name} - Front view`, position: 0 },
        { url: '/images/products/zeta-compression-jacket/noir-front.png', altText: `${product.name} - Side view`, position: 1 },
        { url: '/images/products/zeta-compression-jacket/noir-front.png', altText: `${product.name} - Detail view`, position: 2 }
      ]

      for (const imageData of placeholderImages) {
        await prisma.productImage.create({
          data: imageData
        })
      }
    }
  }

  console.log('✅ Database seeded successfully!')
  console.log('📊 Products created:', products.length)
  console.log('📏 Size range: XS to 2XL')
  console.log('🎨 Zeta Jacket colors:', zetaJacketColors.length)
  console.log('📸 Images updated for Zeta Compression Jacket')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })