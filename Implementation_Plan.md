Frontend
Framework: Next.js 14+ (App Router) with TypeScript

UI/Styling:

Tailwind CSS - Rapid development, consistent design system
Framer Motion - Smooth, luxurious animations
Radix UI or shadcn/ui - Accessible, unstyled components you can customize
React Hook Form + Zod - Form handling with validation

State Management:

Zustand - Lightweight, simple (better than Redux for this scale)
React Query (TanStack Query) - Server state management, caching

Backend
Runtime: Node.js with Express or Next.js API Routes

Database
Primary: PostgreSQL (hosted on Supabase)

Caching Layer: Redis (Upstash)

Session management
Cart persistence
Rate limiting
Fast product lookups

Payment Processing
Stripe Testing

Industry standard, excellent docs
Supports subscriptions (if you add membership later)
Strong fraud protection
Easy webhook integration

File Storage
Cloudinary or Supabase Storage

Product images, video
Automatic optimization
CDN delivery
Transformation API

Authentication
NextAuth.js or Supabase Auth

Social logins (Google, Apple)
Email/password
Magic links
Session management

Email
Resend or SendGrid

Order confirmations
Shipping updates
Marketing emails
Transactional emails

Deployment
Vercel (for Next.js)

Zero-config deployment
Automatic HTTPS
Edge functions
Preview deployments

Database Schema Design
typescript// PostgreSQL Schema (using Prisma ORM)

// User/Customer
model User {
  id            String    @id @default(uuid())
  email         String    @unique
  name          String?
  passwordHash  String?
  phone         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  addresses     Address[]
  orders        Order[]
  cart          Cart?
  wishlist      Wishlist?
  reviews       Review[]
}

// Address
model Address {
  id            String    @id @default(uuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  
  fullName      String
  line1         String
  line2         String?
  city          String
  state         String?
  country       String
  postalCode    String
  phone         String
  
  isDefault     Boolean   @default(false)
  type          AddressType // SHIPPING, BILLING, BOTH
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

// Product
model Product {
  id            String    @id @default(uuid())
  name          String
  slug          String    @unique
  description   String    @db.Text
  
  // Modest activewear specific
  coverageLevel String    // FULL, MODERATE, LIGHT
  fabricType    String    // BREATHABLE, MOISTURE_WICKING, etc.
  activityType  String[]  // YOGA, RUNNING, GYM, CASUAL
  
  basePrice     Decimal   @db.Decimal(10, 2)
  comparePrice  Decimal?  @db.Decimal(10, 2)
  
  categoryId    String
  category      Category  @relation(fields: [categoryId], references: [id])
  
  images        ProductImage[]
  variants      ProductVariant[]
  reviews       Review[]
  
  tags          String[]
  metaTitle     String?
  metaDesc      String?
  
  featured      Boolean   @default(false)
  status        ProductStatus // DRAFT, ACTIVE, ARCHIVED
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

// Product Variant (Size, Color combinations)
model ProductVariant {
  id            String    @id @default(uuid())
  productId     String
  product       Product   @relation(fields: [productId], references: [id])
  
  sku           String    @unique
  size          String    // XS, S, M, L, XL, 2XL, 3XL
  color         String    // Black, Espresso, Charcoal, Navy, etc.
  colorHex      String    // #3E2723
  
  price         Decimal?  @db.Decimal(10, 2) // Override base price if needed
  stock         Int       @default(0)
  
  weight        Decimal?  @db.Decimal(8, 2) // For shipping calculations
  
  images        String[]  // Specific variant images
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  cartItems     CartItem[]
  orderItems    OrderItem[]
}

// Product Images
model ProductImage {
  id            String    @id @default(uuid())
  productId     String
  product       Product   @relation(fields: [productId], references: [id])
  
  url           String
  altText       String?
  position      Int       @default(0)
  
  createdAt     DateTime  @default(now())
}

// Category/Collection
model Category {
  id            String    @id @default(uuid())
  name          String
  slug          String    @unique
  description   String?   @db.Text
  
  image         String?
  parentId      String?
  parent        Category? @relation("CategoryHierarchy", fields: [parentId], references: [id])
  children      Category[] @relation("CategoryHierarchy")
  
  products      Product[]
  
  displayOrder  Int       @default(0)
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

// Cart
model Cart {
  id            String    @id @default(uuid())
  userId        String?   @unique
  user          User?     @relation(fields: [userId], references: [id])
  
  sessionId     String?   @unique // For guest carts
  
  items         CartItem[]
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  expiresAt     DateTime  // Auto-cleanup old carts
}

// Cart Item
model CartItem {
  id            String    @id @default(uuid())
  cartId        String
  cart          Cart      @relation(fields: [cartId], references: [id])
  
  variantId     String
  variant       ProductVariant @relation(fields: [variantId], references: [id])
  
  quantity      Int       @default(1)
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  @@unique([cartId, variantId])
}

// Order
model Order {
  id            String    @id @default(uuid())
  orderNumber   String    @unique // User-facing order number
  
  userId        String?
  user          User?     @relation(fields: [userId], references: [id])
  
  email         String
  
  // Pricing
  subtotal      Decimal   @db.Decimal(10, 2)
  shippingCost  Decimal   @db.Decimal(10, 2)
  tax           Decimal   @db.Decimal(10, 2)
  discount      Decimal   @db.Decimal(10, 2) @default(0)
  total         Decimal   @db.Decimal(10, 2)
  
  currency      String    @default("USD")
  
  // Addresses (denormalized for historical record)
  shippingAddress Json
  billingAddress  Json
  
  // Payment
  paymentStatus   PaymentStatus
  paymentMethod   String
  stripePaymentId String?
  
  // Fulfillment
  fulfillmentStatus FulfillmentStatus
  trackingNumber    String?
  carrier           String?
  shippedAt         DateTime?
  deliveredAt       DateTime?
  
  items         OrderItem[]
  
  notes         String?   @db.Text
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

// Order Item
model OrderItem {
  id            String    @id @default(uuid())
  orderId       String
  order         Order     @relation(fields: [orderId], references: [id])
  
  variantId     String
  variant       ProductVariant @relation(fields: [variantId], references: [id])
  
  // Snapshot of product at time of purchase
  productName   String
  variantName   String
  
  quantity      Int
  price         Decimal   @db.Decimal(10, 2) // Price at time of purchase
  
  createdAt     DateTime  @default(now())
}

// Review
model Review {
  id            String    @id @default(uuid())
  productId     String
  product       Product   @relation(fields: [productId], references: [id])
  
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  
  rating        Int       // 1-5
  title         String?
  comment       String    @db.Text
  
  verified      Boolean   @default(false) // Verified purchase
  
  helpful       Int       @default(0)
  
  status        ReviewStatus // PENDING, APPROVED, REJECTED
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

// Enums
enum AddressType {
  SHIPPING
  BILLING
  BOTH
}

enum ProductStatus {
  DRAFT
  ACTIVE
  ARCHIVED
}

enum PaymentStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
}

enum FulfillmentStatus {
  UNFULFILLED
  PROCESSING
  SHIPPED
  DELIVERED
  RETURNED
}

enum ReviewStatus {
  PENDING
  APPROVED
  REJECTED
}
```

---

## Project Structure
```
zahara-ecommerce/
├── .github/
│   └── workflows/          # CI/CD pipelines
├── prisma/
│   ├── schema.prisma       # Database schema
│   ├── migrations/         # Database migrations
│   └── seed.ts            # Seed data
├── public/
│   ├── images/
│   └── fonts/
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (shop)/
│   │   │   ├── products/
│   │   │   │   ├── [slug]/
│   │   │   │   └── page.tsx
│   │   │   ├── collections/
│   │   │   ├── cart/
│   │   │   └── checkout/
│   │   ├── account/
│   │   │   ├── orders/
│   │   │   ├── addresses/
│   │   │   └── wishlist/
│   │   ├── api/           # API routes
│   │   │   ├── products/
│   │   │   ├── cart/
│   │   │   ├── orders/
│   │   │   ├── stripe/
│   │   │   └── webhooks/
│   │   ├── layout.tsx
│   │   ├── page.tsx       # Homepage
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/            # Base UI components (shadcn/ui)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── product/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ProductDetails.tsx
│   │   │   ├── VariantSelector.tsx
│   │   │   └── ProductGallery.tsx
│   │   ├── cart/
│   │   │   ├── CartDrawer.tsx
│   │   │   ├── CartItem.tsx
│   │   │   └── CartSummary.tsx
│   │   ├── checkout/
│   │   │   ├── CheckoutForm.tsx
│   │   │   ├── ShippingForm.tsx
│   │   │   └── PaymentForm.tsx
│   │   └── common/
│   │       ├── Hero.tsx
│   │       ├── FeaturedProducts.tsx
│   │       └── Newsletter.tsx
│   ├── lib/
│   │   ├── prisma.ts      # Prisma client
│   │   ├── stripe.ts      # Stripe client
│   │   ├── auth.ts        # Auth utilities
│   │   └── utils.ts       # Helper functions
│   ├── hooks/
│   │   ├── useCart.ts
│   │   ├── useProducts.ts
│   │   └── useAuth.ts
│   ├── store/             # Zustand stores
│   │   ├── cartStore.ts
│   │   ├── authStore.ts
│   │   └── uiStore.ts
│   ├── types/
│   │   ├── product.ts
│   │   ├── cart.ts
│   │   ├── order.ts
│   │   └── user.ts
│   ├── styles/
│   │   └── zahara-theme.ts # Design system config
│   └── config/
│       ├── site.ts        # Site metadata
│       └── navigation.ts  # Navigation config
├── .env.local
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md

Design System - Zahara Color Palette Implementation
typescript// src/styles/zahara-theme.ts

export const zaharaColors = {
  // Core Palette
  core: {
    black: '#0A0A0A',
    espresso: '#3E2723',
    charcoal: '#36454F',
    navy: '#001F3F',
  },
  
  // Accent/Seasonal
  accent: {
    sage: '#87956E',
    burgundy: '#722F37',
    sand: '#D4C5A9',
    clay: '#A0614A',
    terracotta: '#C65D3B',
  },
  
  // Neutrals (for backgrounds, borders)
  neutral: {
    cream: '#F4F2EA',
    lightBeige: '#E8DCC7',
    warmTaupe: '#C4B29A',
    sage: '#7D8D86',
    forest: '#3E3F29',
  },
  
  // Functional
  functional: {
    success: '#4A7C59',
    error: '#C62828',
    warning: '#F57C00',
    info: '#1976D2',
  },
  
  // Text
  text: {
    primary: '#2F3B28',
    secondary: '#5A6B55',
    muted: '#7D8D86',
    inverse: '#F4F2EA',
  },
  
  // Backgrounds
  background: {
    primary: '#FEFDFB',
    secondary: '#F4F2EA',
    tertiary: '#E8DCC7',
  },
}

export const zaharaTypography = {
  fonts: {
    heading: "'Crimson Text', serif",
    body: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  
  sizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
  },
  
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
}

export const zaharaSpacing = {
  xs: '0.5rem',   // 8px
  sm: '1rem',     // 16px
  md: '1.5rem',   // 24px
  lg: '2rem',     // 32px
  xl: '3rem',     // 48px
  '2xl': '4rem',  // 64px
  '3xl': '6rem',  // 96px
}

export const zaharaBorderRadius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
}

export const zaharaShadows = {
  sm: '0 1px 2px 0 rgba(47, 59, 40, 0.05)',
  md: '0 4px 6px -1px rgba(47, 59, 40, 0.1)',
  lg: '0 10px 15px -3px rgba(47, 59, 40, 0.1)',
  xl: '0 20px 25px -5px rgba(47, 59, 40, 0.1)',
}

export const zaharaAnimations = {
  transition: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
}
typescript// tailwind.config.ts

import type { Config } from 'tailwindcss'
import { zaharaColors, zaharaTypography, zaharaSpacing, zaharaBorderRadius, zaharaShadows } from './src/styles/zahara-theme'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ...zaharaColors.core,
        ...zaharaColors.accent,
        ...zaharaColors.neutral,
        ...zaharaColors.functional,
        text: zaharaColors.text,
        background: zaharaColors.background,
      },
      fontFamily: {
        heading: [zaharaTypography.fonts.heading],
        body: [zaharaTypography.fonts.body],
        mono: [zaharaTypography.fonts.mono],
      },
      fontSize: zaharaTypography.sizes,
      fontWeight: zaharaTypography.weights,
      spacing: zaharaSpacing,
      borderRadius: zaharaBorderRadius,
      boxShadow: zaharaShadows,
      transitionDuration: {
        fast: '150ms',
        base: '300ms',
        slow: '500ms',
      },
    },
  },
  plugins: [],
}

export default config

Implementation Phases
Phase 1: Foundation (Week 1-2)
Goal: Get basic infrastructure running

Project Setup

bash   npx create-next-app@latest zahara-ecommerce --typescript --tailwind --app
   cd zahara-ecommerce
   npm install @prisma/client prisma zustand @tanstack/react-query framer-motion
   npm install -D @types/node

Database Setup

Create Supabase project
Initialize Prisma



bash   npx prisma init

Add schema (from above)
Run migrations

bash   npx prisma migrate dev --name init

Design System

Install shadcn/ui



bash   npx shadcn-ui@latest init

Configure Tailwind with Zahara colors
Create base UI components


Authentication

Set up NextAuth.js or Supabase Auth
Create login/register pages
Implement session management



Deliverables:

Working dev environment
Database connected
Auth system functional
Basic component library


Phase 2: Product Catalog (Week 3-4)
Goal: Display products beautifully

Product Components

ProductCard with hover animations
ProductGrid with filtering
ProductDetails page with gallery
VariantSelector (size, color)
Modest feature badges


Product Pages

Dynamic product pages /products/[slug]
Collection pages /collections/[slug]
Search functionality
Filtering by size, color, category


API Routes

typescript   // app/api/products/route.ts
   export async function GET(request: Request) {
     const { searchParams } = new URL(request.url)
     const products = await prisma.product.findMany({
       where: {
         status: 'ACTIVE',
         // Add filters based on searchParams
       },
       include: {
         variants: true,
         images: true,
       },
     })
     return Response.json(products)
   }

Seed Database

Create seed script with your product data
Add product images to Cloudinary



Deliverables:

Beautiful product display
Working product pages
Search and filter
Responsive design


Phase 3: Shopping Cart (Week 5)
Goal: Allow users to add items to cart

Cart Store (Zustand)

typescript   // store/cartStore.ts
   import { create } from 'zustand'
   import { persist } from 'zustand/middleware'
   
   interface CartItem {
     variantId: string
     quantity: number
   }
   
   interface CartStore {
     items: CartItem[]
     addItem: (variantId: string, quantity: number) => void
     removeItem: (variantId: string) => void
     updateQuantity: (variantId: string, quantity: number) => void
     clearCart: () => void
   }
   
   export const useCartStore = create<CartStore>()(
     persist(
       (set) => ({
         items: [],
         addItem: (variantId, quantity) =>
           set((state) => {
             const existing = state.items.find(i => i.variantId === variantId)
             if (existing) {
               return {
                 items: state.items.map(i =>
                   i.variantId === variantId
                     ? { ...i, quantity: i.quantity + quantity }
                     : i
                 ),
               }
             }
             return { items: [...state.items, { variantId, quantity }] }
           }),
         removeItem: (variantId) =>
           set((state) => ({
             items: state.items.filter(i => i.variantId !== variantId),
           })),
         updateQuantity: (variantId, quantity) =>
           set((state) => ({
             items: state.items.map(i =>
               i.variantId === variantId ? { ...i, quantity } : i
             ),
           })),
         clearCart: () => set({ items: [] }),
       }),
       {
         name: 'zahara-cart',
       }
     )
   )

Cart Components

CartDrawer (slide-out sidebar)
CartItem component
CartSummary with totals
Add to cart button with animation


Cart API

Sync cart to database for logged-in users
Merge guest cart on login



Deliverables:

Functional shopping cart
Persistent cart (localStorage + DB)
Beautiful cart UI


Phase 4: Checkout & Payments (Week 6-7)
Goal: Complete purchase flow

Checkout Flow

Multi-step checkout (Shipping → Payment → Review)
Address form with validation
Shipping method selection
Order summary


Stripe Integration

bash   npm install stripe @stripe/stripe-js @stripe/react-stripe-js
typescript   // app/api/checkout/route.ts
   import Stripe from 'stripe'
   
   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
   
   export async function POST(request: Request) {
     const { items } = await request.json()
     
     const session = await stripe.checkout.sessions.create({
       payment_method_types: ['card'],
       line_items: items,
       mode: 'payment',
       success_url: `${process.env.NEXT_PUBLIC_URL}/order/success`,
       cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
     })
     
     return Response.json({ sessionId: session.id })
   }

Order Processing

Create order in database
Send confirmation email
Reduce inventory
Webhook for Stripe events


Order Confirmation

Success page with order details
Email template
Order tracking page



Deliverables:

Working checkout flow
Stripe payment processing
Order confirmation system


Phase 5: User Account (Week 8)
Goal: Customer dashboard

Account Pages

Order history
Order details/tracking
Address book
Profile settings
Wishlist


Admin Dashboard (Basic)

Product management
Order management
Inventory tracking
Analytics overview



Deliverables:

User account pages
Basic admin panel


Phase 6: Polish & Optimization (Week 9-10)
Goal: Production-ready

Performance

Image optimization (next/image)
Lazy loading
Code splitting
Database query optimization


SEO

Meta tags
Structured data (JSON-LD)
Sitemap
robots.txt


Analytics

Google Analytics
Conversion tracking
Heatmaps (Hotjar)


Testing

Unit tests (Jest)
E2E tests (Playwright)
Payment testing
Mobile testing


Deployment

Vercel deployment
Environment variables
SSL certificates
Domain setup



Deliverables:

Production-ready app
Deployed and live


Key Features for Luxury UX
1. Homepage Hero
tsx// components/common/Hero.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function Hero() {
  return (
    <section className="relative h-[80vh] overflow-hidden bg-cream">
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <Image
          src="/hero-modest-activewear.jpg"
          alt="Zahara Modest Activewear"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
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
            <p className="text-xl md:text-2xl text-cream/90 mb-8">
              Luxury comfort meets full coverage. Move freely, feel confident.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-espresso text-cream px-8 py-4 rounded-lg text-lg font-medium hover:bg-charcoal transition-colors"
            >
              Shop Collection
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
2. Product Card with Luxury Feel
tsx// components/product/ProductCard.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    basePrice: number
    images: { url: string; altText: string }[]
    variants: { color: string; colorHex: string }[]
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
            src={product.images[0]?.url}
            alt={product.images[0]?.altText || product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Modest Badge */}
          <div className="absolute top-4 right-4 bg-cream/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-xs font-medium text-forest uppercase tracking-wide">
              Full Coverage
            </span>
          </div>
          
          {/* Quick Add Button (appears on hover) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <button className="w-full bg-espresso text-cream py-3 rounded-lg font-medium hover:bg-charcoal transition-colors">
              Quick Add
            </button>
          </motion.div>
        </div>
        
        <div>
          <h3 className="font-heading text-lg font-medium text-forest mb-2">
            {product.name}
          </h3>
          
          {/* Color Swatches */}
          <div className="flex gap-2 mb-3">
            {product.variants.slice(0, 5).map((variant) => (
              <motion.div
                key={variant.color}
                whileHover={{ scale: 1.2 }}
                className="w-6 h-6 rounded-full border-2 border-lightBeige cursor-pointer"
                style={{ backgroundColor: variant.colorHex }}
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
```

### 3. Smooth Page Transitions
```tsx
// components/layout/PageTransition.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

### 4. Luxury Navigation
```tsx
// components/layout/Header.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ShoppingBag, User, Search } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

export function Header() {
  const items = useCartStore((state) => state.items)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  
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
          
          {/* Navigation Links */}
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
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-burgundy text-cream text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium"
                >
                  {itemCount}
                </motion.span>
              )}
            </motion.button>
          </div>
        </div>
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
```

---

## Environment Variables

```bash
# .env.local

# Database
DATABASE_URL="postgresql://user:password@host:5432/zahara"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email
RESEND_API_KEY="re_..."
EMAIL_FROM="orders@zahara.com"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud"
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# Analytics
NEXT_PUBLIC_GA_ID="G-..."
```


## Deployment Checklist

- [ ] Set up Vercel project
- [ ] Configure environment variables
- [ ] Set up production database (Supabase/Railway)
- [ ] Configure Stripe webhooks
- [ ] Set up custom domain
- [ ] Configure SSL
- [ ] Set up email service (Resend)
- [ ] Configure CDN (Cloudinary)
- [ ] Enable analytics (Google Analytics)
- [ ] Set up error tracking (Sentry)
- [ ] Configure backup strategy
- [ ] Test payment flow
- [ ] Test order emails
- [ ] Load testing
- [ ] Security audit
- [ ] Mobile testing
- [ ] Browser compatibility testing


