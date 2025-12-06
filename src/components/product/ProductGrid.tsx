import { useEffect, useState } from 'react'
import { ProductGrid } from '@/components/product/ProductGrid'

interface Product {
  id: string
  name: string
  slug: string
  basePrice: number
  images: { url: string; altText: string }[]
  variants: { color: string; colorHex: string }[]
  coverageLevel?: string
}

interface ProductGridProps {
  products: Product[]
  title?: string
  loading?: boolean
}

export function ProductGrid({ products, title, loading }: ProductGridProps) {
  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {title && (
            <div className="text-center mb-12">
              <h2 className="font-heading text-4xl font-semibold text-forest mb-4">
                {title}
              </h2>
              <div className="w-24 h-1 bg-sage mx-auto rounded-full" />
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-[3/4] bg-lightBeige rounded-xl mb-4" />
                <div className="h-6 bg-lightBeige rounded mb-2" />
                <div className="h-4 bg-lightBeige rounded w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {title && (
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl font-semibold text-forest mb-4">
              {title}
            </h2>
            <div className="w-24 h-1 bg-sage mx-auto rounded-full" />
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Import ProductCard at the bottom to avoid circular imports
import { ProductCard } from './ProductCard'