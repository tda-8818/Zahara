'use client'

import Link from 'next/link'
import { Facebook, Instagram, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-forest text-cream py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-heading text-2xl font-semibold mb-4">ZAHARA</h3>
            <p className="text-cream/80 mb-6 max-w-md">
              Luxury modest activewear designed for the modern woman who values both style and coverage.
            </p>
            <div className="flex gap-4">
              <SocialLink href="#" icon={<Facebook size={20} />} />
              <SocialLink href="#" icon={<Instagram size={20} />} />
              <SocialLink href="#" icon={<Twitter size={20} />} />
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><FooterLink href="/collections/new-arrivals">New Arrivals</FooterLink></li>
              <li><FooterLink href="/collections/tops">Tops</FooterLink></li>
              <li><FooterLink href="/collections/bottoms">Bottoms</FooterLink></li>
              <li><FooterLink href="/collections/sets">Sets</FooterLink></li>
            </ul>
          </div>
          
          {/* Customer Care */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Customer Care</h4>
            <ul className="space-y-2">
              <li><FooterLink href="/contact">Contact Us</FooterLink></li>
              <li><FooterLink href="/shipping">Shipping & Returns</FooterLink></li>
              <li><FooterLink href="/size-guide">Size Guide</FooterLink></li>
              <li><FooterLink href="/faq">FAQ</FooterLink></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-cream/20 mt-8 pt-8 text-center">
          <p className="text-cream/60">
            © 2024 Zahara. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="w-10 h-10 bg-cream/10 rounded-full flex items-center justify-center hover:bg-cream/20 transition-colors"
    >
      {icon}
    </a>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-cream/80 hover:text-cream transition-colors">
      {children}
    </Link>
  )
}