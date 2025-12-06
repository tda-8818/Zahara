'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ShoppingBag, User, Search, Menu } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  return (
    <header className="sticky top-0 z-50 bg-cream/80 backdrop-blur-lg border-b border-lightBeige">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <motion.h1
              whileHover={{ scale: 1.05 }}
              className="font-heading text-3xl font-semibold text-forest tracking-wide"
            >
              ZAHARA
            </motion.h1>
          </Link>
          
          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="/collections/new-arrivals">New Arrivals</NavLink>
            <NavLink href="/collections/tops">Tops</NavLink>
            <NavLink href="/collections/bottoms">Bottoms</NavLink>
            <NavLink href="/collections/sets">Sets</NavLink>
            <NavLink href="/about">About</NavLink>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-forest hover:text-sage transition-colors"
            >
              <Search size={22} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-forest hover:text-sage transition-colors"
            >
              <User size={22} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative text-forest hover:text-sage transition-colors"
            >
              <ShoppingBag size={22} />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-burgundy text-cream text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium"
              >
                0
              </motion.span>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden text-forest hover:text-sage transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu size={22} />
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 pt-4 border-t border-lightBeige"
          >
            <div className="flex flex-col gap-4">
              <MobileNavLink href="/collections/new-arrivals">New Arrivals</MobileNavLink>
              <MobileNavLink href="/collections/tops">Tops</MobileNavLink>
              <MobileNavLink href="/collections/bottoms">Bottoms</MobileNavLink>
              <MobileNavLink href="/collections/sets">Sets</MobileNavLink>
              <MobileNavLink href="/about">About</MobileNavLink>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href}>
      <motion.span
        whileHover={{ y: -2 }}
        className="text-forest hover:text-sage transition-colors font-medium"
      >
        {children}
      </motion.span>
    </Link>
  )
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href}>
      <motion.span
        whileHover={{ x: 4 }}
        className="text-forest hover:text-sage transition-colors font-medium block py-2"
      >
        {children}
      </motion.span>
    </Link>
  )
}