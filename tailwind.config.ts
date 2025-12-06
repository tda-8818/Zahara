import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import { zaharaColors, zaharaTypography, zaharaSpacing, zaharaBorderRadius, zaharaShadows } from './src/styles/zahara-theme'

const config: Config = {
    darkMode: "class",
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
        extend: {
                colors: {
                        // Keep existing shadcn colors for compatibility
                        background: 'hsl(var(--background))',
                        foreground: 'hsl(var(--foreground))',
                        card: {
                                DEFAULT: 'hsl(var(--card))',
                                foreground: 'hsl(var(--card-foreground))'
                        },
                        popover: {
                                DEFAULT: 'hsl(var(--popover))',
                                foreground: 'hsl(var(--popover-foreground))'
                        },
                        primary: {
                                DEFAULT: 'hsl(var(--primary))',
                                foreground: 'hsl(var(--primary-foreground))'
                        },
                        secondary: {
                                DEFAULT: 'hsl(var(--secondary))',
                                foreground: 'hsl(var(--secondary-foreground))'
                        },
                        muted: {
                                DEFAULT: 'hsl(var(--muted))',
                                foreground: 'hsl(var(--muted-foreground))'
                        },
                        accent: {
                                DEFAULT: 'hsl(var(--accent))',
                                foreground: 'hsl(var(--accent-foreground))'
                        },
                        destructive: {
                                DEFAULT: 'hsl(var(--destructive))',
                                foreground: 'hsl(var(--destructive-foreground))'
                        },
                        border: 'hsl(var(--border))',
                        input: 'hsl(var(--input))',
                        ring: 'hsl(var(--ring))',
                        chart: {
                                '1': 'hsl(var(--chart-1))',
                                '2': 'hsl(var(--chart-2))',
                                '3': 'hsl(var(--chart-3))',
                                '4': 'hsl(var(--chart-4))',
                                '5': 'hsl(var(--chart-5))'
                        },
                        // Add Zahara colors
                        ...zaharaColors.core,
                        ...zaharaColors.accent,
                        ...zaharaColors.neutral,
                        ...zaharaColors.functional,
                        text: zaharaColors.text,
                        background: zaharaColors.background,
                },
                fontFamily: {
                        heading: [zaharaTypography.fonts.heading],
                        sans: [zaharaTypography.fonts.body],
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
                borderRadius: {
                        lg: 'var(--radius)',
                        md: 'calc(var(--radius) - 2px)',
                        sm: 'calc(var(--radius) - 4px)',
                        ...zaharaBorderRadius,
                }
        }
  },
  plugins: [tailwindcssAnimate],
};
export default config;
