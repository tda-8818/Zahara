'use client'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/common/Hero'
import { ProductGrid } from '@/components/product/ProductGrid'
import { useState, useEffect } from 'react'

interface Product {
  id: string
  name: string
  slug: string
  basePrice: number
  images: { url: string; altText: string }[]
  variants: { color: string; colorHex: string }[]
  coverageLevel?: string
}

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [newProducts, setNewProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        // Fetch featured products
        const featuredResponse = await fetch('/api/products?featured=true&limit=4')
        const featuredData = await featuredResponse.json()
        setFeaturedProducts(featuredData.products || [])

        // Fetch new products
        const newResponse = await fetch('/api/products?limit=4')
        const newData = await newResponse.json()
        setNewProducts(newData.products || [])
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ProductGrid 
          products={featuredProducts} 
          title="Featured Collection"
          loading={loading}
        />
        <ProductGrid 
          products={newProducts} 
          title="New Arrivals"
          loading={loading}
        />
      </main>
      <Footer />
    </div>
  )
}