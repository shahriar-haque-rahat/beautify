import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Header from "@/components/shared/Header"
import Footer from "@/components/shared/Footer"
import "../styles/globals.css"
import localFont from 'next/font/local'
import { WishlistProvider } from "@/providers/WishlistContext"
import { CartProvider } from "@/providers/CartContext"


const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

const myCustomFont = localFont({
  // src: './fonts/Zodiak-Black.ttf', 
  src: [
    {
      path: './fonts/Zodiak-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Zodiak-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-my-custom-font', // Optional CSS variable for Tailwind CSS
});

export const metadata: Metadata = {
  title: "Beautify - Your Beauty & Lifestyle Destination",
  description: "Discover premium beauty, lifestyle, and wellness products at Beautify.",
  icons: {
    icon: "/brand-hero.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${myCustomFont.className} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen flex flex-col">
        <WishlistProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  )
}
