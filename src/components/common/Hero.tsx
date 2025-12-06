'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative h-[80vh] overflow-hidden bg-cream">
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-linear-to-r from-espresso/40 to-transparent" />
        <Image
          src="/images/hero/hero.jpg"
          alt="Modest Activewear - Zahara Collection"
          fill
          className="object-cover"
          priority
        />
      </motion.div>
      
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-2xl"
          >
            <h1 className="font-heading text-5xl md:text-7xl font-semibold text-cream mb-6">
              Modest Activewear,
              <br />
              Designed for You
            </h1>
            <p className="text-xl md:text-2xl text-cream/90 mb-8 font-body">
              Luxury comfort meets full coverage. Move freely, feel confident.
            </p>
            <Link href="/collections/all">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-espresso text-cream px-8 py-4 rounded-lg text-lg font-medium hover:bg-charcoal transition-colors shadow-lg"
              >
                Shop Collection
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}