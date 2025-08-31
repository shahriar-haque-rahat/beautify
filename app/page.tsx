import React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Play,
  Leaf,
  Sprout,
  Award,
  ShieldCheck,
  Heart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/shared/ProductCard"
import { products } from "@/data/product.data"
import Newsletter from "@/components/shared/Newsletter"

export default function HomePage() {
  const trendingProducts = products
    .filter((p) => p.tags?.includes("bestseller"))
    .slice(0, 4)
  const newArrivals = products.slice(10, 14)

  return (
    <div className="space-y-28">
      {/* HERO */}
      <section className="bg-gradient-to-b from-[#fd8d8c]/60 to-[#f4f7ff] py-14">
        <section className="container mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
          <div className="max-w-xl text-center lg:text-left">
            <p className="text-pink-600 italic mb-2">Professional</p>
            <h1 className="text-5xl sm:text-6xl font-bold leading-[1.05] mb-5">
              Beauty & Care
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Nourish your skin with fresh-tone cosmetic products. With the
              offers you can’t resist.
            </p>
            <Button size="lg" className="px-8 py-6 rounded-full" asChild>
              <Link href="/products" className="inline-flex items-center gap-2">
                Shop Now <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="relative">
            <Image
              src="/homepagebanner.avif"
              alt="Beauty Hero"
              width={900}
              height={900}
              priority
              className="rounded-tl-full rounded-br-full object-cover w-full h-auto shadow-xl shadow-[#f86c8e]/60"
            />
          </div>
        </section>
      </section>

      {/* TRENDING PRODUCTS */}
      <section className="container mx-auto px-6">
        <div className="text-center mb-10">
          <p className="italic text-slate-500 mb-1">Cosmetic</p>
          <h2 className="text-4xl font-semibold">Trending Products</h2>
          <p className="text-muted-foreground mt-2">
            Popular skincare & cosmetics everyone loves
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-5 gap-6 items-center text-center opacity-80">
          <BadgeItem icon={Leaf} label="Clean Beauty" />
          <BadgeItem icon={Sprout} label="100% Organic" />
          <BadgeItem icon={Heart} label="Cruelty Free" />
          <BadgeItem icon={ShieldCheck} label="Derm Tested" />
          <BadgeItem icon={Award} label="Award Winning" />
        </div>
      </section>

      {/* BIG DISCOUNT BANNER */}
      <section className="bg-gradient-to-br to-pink-200 from-pink-50">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center py-16">
          <div className="relative order-1 lg:order-none">
            <Image
              src="/offersection.avif"
              alt="Discount Visual"
              width={900}
              height={900}
              className="rounded-[28px] object-cover w-full h-auto"
            />
          </div>
          <div className="text-center lg:text-left">
            <p className="text-pink-600 italic mb-2">Discount</p>
            <h3 className="text-5xl font-semibold mb-4">Get Your 50% Off</h3>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto lg:mx-0">
              Nourish your skin with fresh-tone cosmetic products. With the
              offers you can’t resist.
            </p>
            <Button size="lg" className="rounded-full px-8 py-6" asChild>
              <Link href="/products">Shop Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container mx-auto px-6">
        <div className="grid sm:grid-cols-3 gap-10 text-center">
          <Feature icon={Leaf} title="Natural" desc="Made with natural extracts & ingredients" />
          <Feature icon={ShieldCheck} title="Quality" desc="Premium quality you can rely on" />
          <Feature icon={Sprout} title="Organic" desc="Certified organic beauty solutions" />
        </div>
      </section>

      {/* TOP CATEGORIES */}
      <section className="container mx-auto px-6">
        <div className="text-center mb-8">
          <p className="italic text-slate-500 mb-1">Popular Collection</p>
          <h2 className="text-3xl sm:text-4xl font-semibold">Top Categories</h2>
          <p className="text-muted-foreground mt-2">
            Meet your needs with best cosmetic essentials. We’re the
            favorite place for self-care.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Accessories", href: "/products?category=Accessories", image: "/accessories.avif" },
            { title: "Skincare", href: "/products?category=Skincare", image: "/skincare.avif" },
            { title: "Makeup", href: "/products?category=Makeup", image: "/makeup.avif" },
          ].map((c, i) => (
            <Link
              key={c.title}
              href={c.href}
              className="group relative block overflow-hidden rounded-3xl"
            >
              <Image
                src={c.image}
                alt={c.title}
                width={900}
                height={700}
                className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl font-semibold drop-shadow-sm">{c.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW COLLECTION FOR DELICATE SKIN */}
      <section className=" bg-gradient-to-br to-primary/30 from-primary/10">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center py-16">
          <div className="gap-4">
            <div className="relative">
              <Image
                src="/newcollectionsection.avif"
                alt="Coconut"
                width={600}
                height={300}
                className="rounded-2xl object-cover"
              />
              <div className="absolute right-20 -bottom-10 bg-white rounded-full p-2 shadow-lg">
                <Image
                  src="/newcollectionsection.avif"
                  alt="Round detail"
                  width={120}
                  height={120}
                  className="rounded-full object-cover"
                />
              </div>
            </div>
          </div>

          <div>
            <p className="italic text-slate-500 mb-1">Check This Out</p>
            <h3 className="text-4xl font-semibold mb-4">
              New Collection For Delicate Skin
            </h3>
            <p className="text-muted-foreground text-lg mb-8">
              Specially formulated for sensitive skin types, our new
              collection combines gentle ingredients with powerful results.
            </p>
            <Button size="lg" className="rounded-full px-8 py-6" asChild>
              <Link href="/products">Buy Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="container mx-auto px-6">
        <div className="text-center mb-10">
          <p className="italic text-slate-500 mb-1">Cosmetic</p>
          <h2 className="text-4xl font-semibold">New Arrivals</h2>
          <p className="text-muted-foreground mt-2">
            Be the first to try our latest products
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <Newsletter />
    </div >
  )
}

function Feature({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) {
  return (
    <div>
      <div className="mx-auto mb-4 h-14 w-14 rounded-full border flex items-center justify-center">
        <Icon className="h-6 w-6" />
      </div>
      <h4 className="font-semibold text-lg mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground max-w-[28ch] mx-auto">{desc}</p>
    </div>
  )
}

function BadgeItem({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <Icon className="h-5 w-5" />
      <span className="text-sm">{label}</span>
    </div>
  )
}
