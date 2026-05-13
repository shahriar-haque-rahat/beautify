"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { blogs } from "@/data/blog.data"
import Newsletter from "@/components/shared/Newsletter"
import FadeIn from "@/components/shared/FadeIn"

export default function BlogsPage() {
  const featuredBlog = blogs[0]
  const otherBlogs = blogs.slice(1)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero */}
      <div className="hero-gradient py-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="container mx-auto px-4 text-center"
        >
          <h1 className="text-5xl font-extrabold mb-4 text-primary tracking-tight">Blog</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover beauty tips, lifestyle advice, and wellness insights
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Featured Blog */}
        {featuredBlog && (
          <section className="mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden border border-border/40 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="grid lg:grid-cols-2">
                {/* Image */}
                <div className="relative aspect-video lg:aspect-square">
                  <Image
                    src={
                      featuredBlog.coverImage ||
                      "/placeholder.svg?height=400&width=600&query=beauty blog featured image"
                    }
                    alt={featuredBlog.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-medium shadow-sm">
                      Featured
                    </span>
                  </div>
                </div>
                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(featuredBlog.publishDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {featuredBlog.author}
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-foreground leading-snug">
                    {featuredBlog.title}
                  </h2>
                  <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                    {featuredBlog.excerpt}
                  </p>
                  <Button asChild size="lg" className="self-start">
                    <Link href={`/blogs/${featuredBlog.slug}`}>
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </section>
        )}

        {/* Blog Grid */}
        <section>
          <FadeIn>
            <h2 className="text-3xl font-bold mb-10 text-primary">Latest Articles</h2>
          </FadeIn>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {otherBlogs.map((blog) => (
              <motion.article
                key={blog.id}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                }}
                whileHover={{ y: -5 }}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/30 shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={
                      blog.coverImage ||
                      "/placeholder.svg?height=300&width=400&query=beauty blog article image"
                    }
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Content */}
                <section className="p-6 flex flex-col">
                  <div className=" h-44 xl:h-40">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(blog.publishDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {blog.author}
                      </div>
                    </div>
                    <h3 className="font-bold mb-3 text-lg text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-6">
                      {blog.excerpt}
                    </p>
                  </div>

                  <div className="mt-auto pt-4">
                    <Button
                      asChild
                      size="sm"
                      className="w-full"
                    >
                      <Link href={`/blogs/${blog.slug}`}>Read More</Link>
                    </Button>
                  </div>
                </section>
              </motion.article>
            ))}
          </motion.div>
        </section>

        <Newsletter />
      </div>
    </div>
  )
}