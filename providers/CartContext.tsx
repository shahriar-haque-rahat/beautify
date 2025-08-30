"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface CartItem {
  id: string
  title: string
  price: number
  image: string
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  updateQuantity: (id: string, quantity: number) => void
  removeFromCart: (id: string) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id)
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      }
      return [...prev, item]
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}