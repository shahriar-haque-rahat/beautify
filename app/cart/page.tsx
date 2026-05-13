"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Minus, Plus, Trash2, ShoppingBag, CheckCircle2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useCart } from "../../providers/CartContext"
import { useState } from "react"

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart()
  const router = useRouter()

  const [couponCode, setCouponCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)

  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [isPlacing, setIsPlacing] = useState(false)
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null)
  const [shipping, setShipping] = useState({
    name: "Demo User",
    address: "123 Demo Street",
    city: "Demo City",
    zipCode: "12345",
    card: "4242 4242 4242 4242",
  })

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase()
    if (code === "SAVE10") {
      setDiscount(0.1)
      setAppliedCoupon("SAVE10")
      toast.success("SAVE10 applied — 10% off")
    } else if (code === "SAVE20") {
      setDiscount(0.2)
      setAppliedCoupon("SAVE20")
      toast.success("SAVE20 applied — 20% off")
    } else {
      toast.error("Invalid coupon code")
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountAmount = subtotal * discount
  const total = subtotal - discountAmount

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setIsPlacing(true)

    const orderId = `order-${Date.now()}`
    const order = {
      id: orderId,
      userId: "demo@demo.com",
      items: cartItems,
      total,
      status: "processing",
      orderDate: new Date().toISOString().split("T")[0],
      shippingAddress: {
        name: shipping.name,
        address: shipping.address,
        city: shipping.city,
        zipCode: shipping.zipCode,
      },
    }

    setTimeout(() => {
      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]")
      existingOrders.unshift(order)
      localStorage.setItem("orders", JSON.stringify(existingOrders))
      setPlacedOrderId(orderId)
      setIsPlacing(false)
    }, 900)
  }

  const handleCloseSuccess = () => {
    setCheckoutOpen(false)
    setPlacedOrderId(null)
    clearCart()
    toast.success("Order placed — thanks for shopping!")
    router.push("/profile?tab=orders")
  }

  if (cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="container mx-auto px-4 py-8 sm:py-12"
      >
        <div className="text-center">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <ShoppingBag className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mx-auto mb-4" />
          </motion.div>
          <h1 className="text-xl sm:text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            <AnimatePresence initial={false}>
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
              <Card>
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
              </motion.div>
            ))}
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
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
                  <span>
                    Discount{appliedCoupon ? ` (${appliedCoupon})` : ""} ({(discount * 100).toFixed(0)}%)
                  </span>
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

              <Button onClick={() => setCheckoutOpen(true)} className="w-full text-sm sm:text-base">
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Dialog
        open={checkoutOpen}
        onOpenChange={(open) => {
          if (placedOrderId && !open) {
            handleCloseSuccess()
            return
          }
          setCheckoutOpen(open)
        }}
      >
        <DialogContent className="sm:max-w-md">
          {placedOrderId ? (
            <>
              <DialogHeader>
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle2 className="h-7 w-7 text-green-600" />
                </div>
                <DialogTitle className="text-center">Order placed!</DialogTitle>
                <DialogDescription className="text-center">
                  Your order <span className="font-mono">{placedOrderId}</span> is confirmed. We've emailed a receipt to demo@demo.com.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button className="w-full" onClick={handleCloseSuccess}>View my orders</Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Checkout</DialogTitle>
                <DialogDescription>
                  Confirm your shipping and payment details. This is a demo — no real charge will be made.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <div>
                  <Label htmlFor="ship-name">Full name</Label>
                  <Input
                    id="ship-name"
                    value={shipping.name}
                    onChange={(e) => setShipping({ ...shipping, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="ship-address">Address</Label>
                  <Input
                    id="ship-address"
                    value={shipping.address}
                    onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="ship-city">City</Label>
                    <Input
                      id="ship-city"
                      value={shipping.city}
                      onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="ship-zip">Zip</Label>
                    <Input
                      id="ship-zip"
                      value={shipping.zipCode}
                      onChange={(e) => setShipping({ ...shipping, zipCode: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="ship-card">Card number</Label>
                  <Input
                    id="ship-card"
                    inputMode="numeric"
                    value={shipping.card}
                    onChange={(e) => setShipping({ ...shipping, card: e.target.value })}
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">Demo card — use any value.</p>
                </div>
                <div className="rounded-md bg-muted/50 p-3 text-sm flex justify-between">
                  <span>Total</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <DialogFooter>
                  <Button type="submit" className="w-full" disabled={isPlacing}>
                    {isPlacing ? "Placing order…" : `Pay $${total.toFixed(2)}`}
                  </Button>
                </DialogFooter>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
