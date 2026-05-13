"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

const Newsletter = () => {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      toast.success("Subscribed — welcome to the list!")
      setEmail("")
      setIsSubmitting(false)
    }, 500)
  }

  return (
    <section className="mt-20">
      <div className="hero-gradient p-10 md:p-16 text-center shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-primary">Stay Updated</h2>
        <p className="mb-8 max-w-lg mx-auto text-muted-foreground text-lg">
          Subscribe to our newsletter for the latest beauty tips and exclusive content
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/90 backdrop-blur-sm border-white/30 focus:ring-2 focus:ring-primary"
            required
          />
          <Button type="submit" size="lg" className="sm:w-auto w-full" disabled={isSubmitting}>
            {isSubmitting ? "Subscribing…" : "Subscribe"}
          </Button>
        </form>
      </div>
    </section>
  )
}

export default Newsletter
