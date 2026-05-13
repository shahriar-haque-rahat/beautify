"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useWishlist } from "@/providers/WishlistContext"
import { useCart } from "@/providers/CartContext"
import type { Product } from "@/data/product.data"

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0] || "/placeholder.svg?height=300&width=300&query=beauty product",
      quantity: 1,
    })
    toast.success(`${product.title} added to cart`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="hero-gradient py-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="container mx-auto px-4 text-center"
        >
          <h1 className="text-5xl font-bold mb-4 text-primary">My Wishlist</h1>
          <p className="text-xl text-muted-foreground">
            {wishlistItems.length} item{wishlistItems.length !== 1 ? "s" : ""} saved for later
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {wishlistItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center py-16"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-4 text-primary">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Start adding products you love to your wishlist and they'll appear here.
            </p>
            <Button asChild size="lg">
              <Link href="/products">Start Shopping</Link>
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
            {wishlistItems.map((product) => {
              const discountPercentage = product.originalPrice
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0

              return (
                <motion.div
                  key={product.id}
                  layout
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.25 } }}
                  whileHover={{ y: -4 }}
                  className="group bg-white/90 backdrop-blur-sm rounded-xl border border-border/50 overflow-hidden hover:shadow-xl transition-shadow duration-300 product-card-hover"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Link href={`/products/${product.slug}`} className="absolute inset-0">
                      <Image
                        src={product.images[0] || "/placeholder.svg?height=300&width=300&query=beauty product"}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </Link>
                    {discountPercentage > 0 && (
                      <Badge className="absolute top-3 left-3 z-10 sale-badge text-white font-semibold px-3 py-1">
                        SALE
                      </Badge>
                    )}
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute top-3 right-3 z-10 h-10 w-10 p-0 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
                      onClick={() => removeFromWishlist(product.id)}
                    >
                      <X className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>

                  <div className="p-5">
                    <div className="mb-3">
                      <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                        {product.category}
                      </Badge>
                    </div>

                    <Link href={`/products/${product.slug}`}>
                      <h3 className="font-semibold text-card-foreground hover:text-primary transition-colors line-clamp-2 mb-3 text-lg">
                        {product.title}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-primary text-xl">${product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      {discountPercentage > 0 && (
                        <span className="text-sm font-medium text-primary">-{discountPercentage}%</span>
                      )}
                    </div>

                    <Button className="w-full" size="sm" onClick={() => handleAddToCart(product)}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </motion.div>
              )
            })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  )
}