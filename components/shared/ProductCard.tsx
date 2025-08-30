"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Product } from "@/data/product.data"
import { useWishlist } from "../../providers/WishlistContext"
import { useCart } from "../../providers/CartContext"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { addToCart } = useCart()
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0] || "/placeholder.svg?height=300&width=300&query=beauty product",
      quantity: 1,
    })
  }

  return (
    <div
      className="group bg-white/90 backdrop-blur-sm rounded-xl border border-border/50 overflow-hidden hover:shadow-xl transition-all duration-300 product-card-hover"
    >
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/products/${product.slug}`}>
          <Image
            src={product.images[0] || "/placeholder.svg?height=300&width=300&query=beauty product"}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </Link>
        {discountPercentage > 0 && (
          <Badge className="absolute top-3 left-3 sale-badge text-white font-semibold px-3 py-1">
            SALE
          </Badge>
        )}
        <Button
          size="sm"
          variant="secondary"
          className="absolute top-3 right-3 h-10 w-10 p-0 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
          onClick={handleWishlistToggle}
        >
          {isInWishlist(product.id) ? (
            <X className="h-4 w-4 text-destructive" />
          ) : (
            <Heart className="h-4 w-4 text-primary" />
          )}
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

        <Button className="w-full" size="sm" onClick={handleAddToCart}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  )
}