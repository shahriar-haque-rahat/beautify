"use client"

import { use } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Heart, ShoppingCart, Star, Truck, Shield, RotateCcw, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import ProductCard from "@/components/shared/ProductCard"
import { products } from "@/data/product.data"
import { useWishlist } from "@/providers/WishlistContext"
import { useCart } from "@/providers/CartContext"

interface ProductDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = use(params)
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4)

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { addToCart } = useCart()

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
      image: product.images[0] || "/placeholder.svg?height=600&width=600&query=beauty product detail",
      quantity: 1,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <Button
          asChild
          size="sm"
          className="mb-6 !bg-transparent text-primary hover:text-primary/90"
        >
          <Link href="/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </Button>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm border border-border/50">
              <Image
                src={product.images[0] || "/placeholder.svg?height=600&width=600&query=beauty product detail"}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
              {discountPercentage > 0 && (
                <Badge className="absolute top-4 left-4 sale-badge text-white font-semibold px-4 py-2">
                  SALE -{discountPercentage}%
                </Badge>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(1, 5).map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden bg-white/80 backdrop-blur-sm border border-border/50"
                  >
                    <Image
                      src={image || "/placeholder.svg?height=150&width=150&query=beauty product thumbnail"}
                      alt={`${product.title} ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3 bg-primary/10 text-primary border-primary/20">
                {product.category}
              </Badge>
              <h1 className="text-4xl font-bold mb-4 text-primary">{product.title}</h1>

              {product.rating && (
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(product.rating!) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground ml-2">
                    ({product.rating}) • {product.stock} in stock
                  </span>
                </div>
              )}

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-2xl text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-3">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Available Colors</h3>
                <div className="flex space-x-2">
                  {product.colors.map((color) => (
                    <div key={color} className="px-3 py-1 bg-muted rounded-full text-sm capitalize">
                      {color}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Available Sizes</h3>
                <div className="flex space-x-2">
                  {product.sizes.map((size) => (
                    <div key={size} className="px-3 py-1 bg-muted rounded-full text-sm">
                      {size}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex space-x-4">
              <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                className="border text-primary bg-white/80 backdrop-blur-sm hover:text-white"
                onClick={handleWishlistToggle}
              >
                {isInWishlist(product.id) ? (
                  <X className="h-4 w-4 text-destructive" />
                ) : (
                  <Heart className="h-4 w-4 text-primary" />
                )}
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center">
                <Truck className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-muted-foreground">On orders over $50</p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Secure Payment</p>
                <p className="text-xs text-muted-foreground">100% protected</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Easy Returns</p>
                <p className="text-xs text-muted-foreground">30-day policy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-8 text-primary">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}