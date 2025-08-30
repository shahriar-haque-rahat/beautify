"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation" // Added import for usePathname
import { Search, ShoppingCart, Heart, User, Menu, X, Contact, Podcast, MenuSquare, ShoppingBag, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/providers/CartContext"
import { useWishlist } from "@/providers/WishlistContext"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { cartItems } = useCart()
  const { wishlistItems } = useWishlist()
  const pathname = usePathname() // Get current pathname

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const wishlistItemCount = wishlistItems.length

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/50 border-b border-primary/10 shadow-sm">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-3xl font-bold text-primary hover:text-primary/80 transition-colors">
            Beautify
          </Link>

          {/* Navigation */}
          <nav className={` ${isMenuOpen ? "block" : "hidden"} md:block`}>
            <div className="flex flex-col md:flex-row justify-center md:items-center space-y-2 md:space-y-0 md:space-x-8">
              <Link
                href="/"
                className={`text-foreground hover:text-primary transition-colors font-medium py-2 md:py-0 ${pathname === "/" ? "text-primary font-bold" : ""
                  }`}
              >
                <span className=" flex justify-center items-center gap-2">
                  <Home size={16} /> Home
                </span>
              </Link>
              <Link
                href="/products"
                className={`text-foreground hover:text-primary transition-colors font-medium py-2 md:py-0 ${pathname === "/products" ? "text-primary font-bold" : ""
                  }`}
              >
                <span className=" flex justify-center items-center gap-2">
                  <ShoppingBag size={16} /> SHOP
                </span>
              </Link>
              <Link
                href="/blogs"
                className={`text-foreground hover:text-primary transition-colors font-medium py-2 md:py-0 ${pathname === "/blogs" ? "text-primary font-bold" : ""
                  }`}
              >
                <span className=" flex justify-center items-center gap-2">
                  <MenuSquare size={16} /> BLOG
                </span>
              </Link>
              <Link
                href="/contact"
                className={`text-foreground hover:text-primary transition-colors font-medium py-2 md:py-0 ${pathname === "/contact" ? "text-primary font-bold" : ""
                  }`}
              >
                <span className=" flex justify-center items-center gap-2">
                  <Contact size={16} /> CONTACT
                </span>
              </Link>
            </div>

            {/* Mobile search */}
            <div className="md:hidden mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted/50 border-primary/20 focus:border-primary/40 rounded-full"
                />
              </div>
            </div>
          </nav>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted/50 border-primary/20 focus:border-primary/40 rounded-full"
              />
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-2">
            <Link href="/wishlist" className="p-3 hover:bg-primary/10 rounded-full transition-colors group relative">
              <Heart className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              {wishlistItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {wishlistItemCount}
                </span>
              )}
            </Link>
            <Link href="/cart" className="p-3 hover:bg-primary/10 rounded-full relative transition-colors group">
              <ShoppingCart className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <Link href="/auth/login" className="p-3 hover:bg-primary/10 rounded-full transition-colors group">
              <User className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
            <Button variant="ghost" size="sm" className="md:hidden p-3" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}