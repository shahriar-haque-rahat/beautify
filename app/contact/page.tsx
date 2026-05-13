"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      toast.success("Message sent — we'll be in touch within 24 hours")
      setForm({ firstName: "", lastName: "", email: "", subject: "", message: "" })
      setIsSubmitting(false)
    }, 700)
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
          <h1 className="text-5xl font-bold mb-4 text-primary">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-sm"
          >
            <h2 className="text-3xl font-bold mb-6 text-primary">Get In Touch</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                    First Name
                  </label>
                  <Input
                    id="firstName"
                    placeholder="Your first name"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <Input
                    id="lastName"
                    placeholder="Your last name"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <Input
                  id="subject"
                  placeholder="How can we help you?"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us more about your inquiry..."
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending…" : "Send Message"}
              </Button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
            className="space-y-6"
          >
            <motion.div variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}>
            <Card className="bg-white/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <Mail className="h-5 w-5 mr-2" />
                  Email Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">For general inquiries:</p>
                <p className="font-medium">hello@Beautify.com</p>
                <p className="text-muted-foreground mb-2 mt-4">For support:</p>
                <p className="font-medium">support@Beautify.com</p>
              </CardContent>
            </Card>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}>
            <Card className="bg-white/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <Phone className="h-5 w-5 mr-2" />
                  Call Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Customer Service:</p>
                <p className="font-medium">+1 (555) 123-4567</p>
                <p className="text-muted-foreground mb-2 mt-4">Business Hours:</p>
                <p className="font-medium">Mon-Fri: 9AM - 6PM EST</p>
              </CardContent>
            </Card>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}>
            <Card className="bg-white/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <MapPin className="h-5 w-5 mr-2" />
                  Visit Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Headquarters:</p>
                <p className="font-medium">
                  123 Beauty Street
                  <br />
                  New York, NY 10001
                  <br />
                  United States
                </p>
              </CardContent>
            </Card>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}>
            <Card className="bg-white/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <Clock className="h-5 w-5 mr-2" />
                  Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We typically respond to all inquiries within 24 hours during business days. For urgent matters, please
                  call our customer service line.
                </p>
              </CardContent>
            </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
