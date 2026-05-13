"use client"

import Link from "next/link"
import { Truck, RotateCcw, ShieldCheck, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import FadeIn from "@/components/shared/FadeIn"

const faqs = [
  {
    q: "How long does shipping take?",
    a: "Standard shipping is 3–5 business days within the US. Express options ship in 1–2 business days and are available at checkout.",
  },
  {
    q: "Is shipping really free?",
    a: "Standard shipping is free on all orders over $50. Orders below $50 are a flat $4.99.",
  },
  {
    q: "Can I return a product I've opened?",
    a: "Yes — within 30 days of delivery. Skincare and makeup can be lightly tried; we just ask that you keep the original packaging.",
  },
  {
    q: "How do refunds work?",
    a: "Refunds are issued to your original payment method within 5–7 business days of receiving the returned item.",
  },
  {
    q: "Do you ship internationally?",
    a: "We currently ship across the US and Canada. International expansion is on our roadmap for 2026.",
  },
  {
    q: "Are your products cruelty-free?",
    a: "Always. None of our formulations are tested on animals, and we only partner with suppliers who hold to the same standard.",
  },
  {
    q: "How do I track my order?",
    a: "You'll receive a tracking link in your shipping confirmation email. You can also view live status from your profile under Orders.",
  },
  {
    q: "Do you offer gift wrapping?",
    a: "Yes — choose 'Gift wrap' at checkout and add an optional handwritten note. There's no extra charge.",
  },
]

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="hero-gradient py-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="container mx-auto px-4 text-center"
        >
          <h1 className="text-5xl font-bold mb-4 text-primary">Help Centre</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Answers to the questions we get most. Still stuck? We're a message away.
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-12">
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
            whileHover={{ y: -3 }}
          >
          <Card className="bg-white/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center text-primary text-base">
                <Truck className="h-5 w-5 mr-2" />
                Shipping
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Free over $50 · 3–5 business days standard.
            </CardContent>
          </Card>
          </motion.div>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
            whileHover={{ y: -3 }}
          >
          <Card className="bg-white/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center text-primary text-base">
                <RotateCcw className="h-5 w-5 mr-2" />
                Returns
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              30-day no-fuss returns on every order.
            </CardContent>
          </Card>
          </motion.div>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
            whileHover={{ y: -3 }}
          >
          <Card className="bg-white/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center text-primary text-base">
                <ShieldCheck className="h-5 w-5 mr-2" />
                Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              All major cards, Apple Pay & Google Pay accepted.
            </CardContent>
          </Card>
          </motion.div>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
            whileHover={{ y: -3 }}
          >
          <Card className="bg-white/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center text-primary text-base">
                <MessageCircle className="h-5 w-5 mr-2" />
                Support
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Mon–Fri, 9am – 6pm EST. We reply within 24 hours.
            </CardContent>
          </Card>
          </motion.div>
        </motion.section>

        <section className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-6 text-primary">Frequently asked questions</h2>
          </FadeIn>
          <FadeIn delay={0.1} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-border/50 p-2">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="px-4">
                  <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </section>

        <FadeIn className="text-center">
          <h3 className="text-2xl font-semibold mb-3 text-primary">Still need a hand?</h3>
          <p className="text-muted-foreground mb-6">Our team is happy to help with anything we missed.</p>
          <Button asChild size="lg">
            <Link href="/contact">Contact us</Link>
          </Button>
        </FadeIn>
      </div>
    </div>
  )
}
