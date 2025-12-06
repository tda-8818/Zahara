import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Zahara - Modest Activewear",
  description: "Luxury modest activewear designed for the modern woman who values both style and coverage. Move freely, feel confident.",
  keywords: ["modest activewear", "luxury sportswear", "full coverage", "hijab friendly", "modest fashion"],
  authors: [{ name: "Zahara" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Zahara - Modest Activewear",
    description: "Luxury modest activewear designed for the modern woman",
    url: "https://zahara.com",
    siteName: "Zahara",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zahara - Modest Activewear",
    description: "Luxury modest activewear designed for the modern woman",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
