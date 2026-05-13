"use client"

import { use } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, User, ArrowLeft, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { blogs } from "@/data/blog.data"
import FadeIn from "@/components/shared/FadeIn"

interface BlogDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = use(params)
  const blog = blogs.find((b) => b.slug === slug)

  if (!blog) {
    notFound()
  }

  const currentIndex = blogs.findIndex((b) => b.slug === slug)
  const previousBlog = currentIndex > 0 ? blogs[currentIndex - 1] : null
  const nextBlog = currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null
  const relatedBlogs = blogs.filter((b) => b.slug !== slug).slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="hero-gradient py-12">
        <div className="container mx-auto px-4">
          <Button variant="outline" asChild className="mb-6 bg-white/80 backdrop-blur-sm">
            <Link href="/blogs">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(blog.publishDate).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {blog.author}
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary text-balance">{blog.title}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">{blog.excerpt}</p>
          </motion.div>
        </div>
      </div>

      <article className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-video mb-12 rounded-2xl overflow-hidden"
          >
            <Image
              src={blog.coverImage || "/placeholder.svg?height=600&width=1200&query=beauty blog detailed image"}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Blog Content */}
          <FadeIn className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border/50 shadow-sm mb-12">
            <div className="prose prose-lg max-w-none">
              {blog.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-6 text-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </FadeIn>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-12">
            {previousBlog ? (
              <Button variant="outline" asChild className="bg-white/80 backdrop-blur-sm">
                <Link href={`/blogs/${previousBlog.slug}`}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous: {previousBlog.title}
                </Link>
              </Button>
            ) : (
              <div />
            )}

            {nextBlog && (
              <Button variant="outline" asChild className="bg-white/80 backdrop-blur-sm">
                <Link href={`/blogs/${nextBlog.slug}`}>
                  Next: {nextBlog.title}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            )}
          </div>

          {/* Related Articles */}
          <section>
            <FadeIn>
              <h2 className="text-3xl font-bold mb-8 text-primary">Related Articles</h2>
            </FadeIn>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
              className="grid md:grid-cols-3 gap-8"
            >
              {relatedBlogs.map((relatedBlog) => (
                <motion.article
                  key={relatedBlog.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  whileHover={{ y: -4 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border border-border/50 shadow-sm hover:shadow-lg transition-shadow duration-300 product-card-hover"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={
                        relatedBlog.coverImage ||
                        "/placeholder.svg?height=200&width=300&query=beauty blog related image"
                      }
                      alt={relatedBlog.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-muted-foreground mb-2">
                      {new Date(relatedBlog.publishDate).toLocaleDateString()}
                    </div>
                    <h3 className="font-bold mb-3 line-clamp-2 hover:text-primary transition-colors">
                      <Link href={`/blogs/${relatedBlog.slug}`}>{relatedBlog.title}</Link>
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{relatedBlog.excerpt}</p>
                    <Button variant="outline" size="sm" asChild className="w-full bg-transparent">
                      <Link href={`/blogs/${relatedBlog.slug}`}>Read More</Link>
                    </Button>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </section>
        </div>
      </article>
    </div>
  )
}
