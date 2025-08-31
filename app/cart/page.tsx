"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "../../providers/CartContext"
import { useState } from "react"

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [discount, setDiscount] = useState(0)

  const applyCoupon = () => {
    if (couponCode === "SAVE10") {
      setDiscount(0.1)
    } else if (couponCode === "SAVE20") {
      setDiscount(0.2)
    } else {
      alert("Invalid coupon code")
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountAmount = subtotal * discount
  const total = subtotal - discountAmount

  const handleCheckout = () => {
    const order = {
      id: `order-${Date.now()}`,
      userId: "demo@demo.com",
      items: cartItems,
      total,
      status: "pending",
      orderDate: new Date().toISOString().split("T")[0],
      shippingAddress: {
        name: "Demo User",
        address: "123 Demo Street",
        city: "Demo City",
        zipCode: "12345",
      },
    }

    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    existingOrders.push(order)
    localStorage.setItem("orders", JSON.stringify(existingOrders))

    removeFromCart("")
    alert("Order placed successfully!")
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="text-center">
          <ShoppingBag className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-xl sm:text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-sm sm:text-base">{item.title}</h3>
                      <p className="text-primary font-bold text-sm sm:text-base">${item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-start sm:space-x-2">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                        <span className="w-8 text-center text-sm sm:text-base">{item.quantity}</span>
                        <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>

                      <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.id)} className="text-destructive">
                        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm sm:text-base">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600 text-sm sm:text-base">
                  <span>Discount ({(discount * 100).toFixed(0)}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between font-bold text-base sm:text-lg border-t pt-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="space-y-2">
                <Input placeholder="Coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} className="text-sm" />
                <Button variant="outline" onClick={applyCoupon} className="w-full bg-transparent text-sm sm:text-base">
                  Apply Coupon
                </Button>
                <p className="text-xs text-muted-foreground">Try: SAVE10 or SAVE20</p>
              </div>

              <Button onClick={handleCheckout} className="w-full text-sm sm:text-base">
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}