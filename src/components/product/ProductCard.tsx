'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Heart } from 'lucide-react'

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    basePrice: number
    images: { url: string; altText: string }[]
    variants: { color: string; colorHex: string }[]
    coverageLevel?: string
  }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`}>
      <motion.article
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="group cursor-pointer"
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-lightBeige mb-4">
          <Image
            src={product.images[0]?.url || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop'}
            alt={product.images[0]?.altText || product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Modest Badge */}
          <div className="absolute top-4 right-4 bg-cream/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-xs font-medium text-forest uppercase tracking-wide">
              {product.coverageLevel || 'Full Coverage'}
            </span>
          </div>
          
          {/* Quick Actions (appear on hover) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault()
                // Handle add to cart
              }}
              className="flex-1 bg-espresso text-cream py-3 rounded-lg font-medium hover:bg-charcoal transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} />
              Quick Add
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault()
                // Handle wishlist
              }}
              className="bg-cream text-espresso p-3 rounded-lg font-medium hover:bg-lightBeige transition-colors"
            >
              <Heart size={18} />
            </motion.button>
          </motion.div>
        </div>
        
        <div>
          <h3 className="font-heading text-lg font-medium text-forest mb-2">
            {product.name}
          </h3>
          
          {/* Color Swatches */}
          <div className="flex gap-2 mb-3">
            {product.variants.slice(0, 5).map((variant, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.2 }}
                className="w-6 h-6 rounded-full border-2 border-lightBeige cursor-pointer shadow-sm"
                style={{ backgroundColor: variant.colorHex || '#3E2723' }}
                title={variant.color}
              />
            ))}
            {product.variants.length > 5 && (
              <span className="text-sm text-muted self-center">
                +{product.variants.length - 5}
              </span>
            )}
          </div>
          
          <p className="text-lg font-semibold text-espresso">
            ${product.basePrice.toFixed(2)}
          </p>
        </div>
      </motion.article>
    </Link>
  )
}