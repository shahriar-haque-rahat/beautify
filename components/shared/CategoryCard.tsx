import Image from "next/image"
import Link from "next/link"

interface CategoryCardProps {
  name: string
  image: string
  productCount: number
  href: string
}

export default function CategoryCard({ name, image, productCount, href }: CategoryCardProps) {
  return (
    <Link href={href} className="group">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden hover:shadow-xl transition-all duration-300 product-card-hover">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={image || "/placeholder.svg?height=300&width=300&query=beauty category"}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent group-hover:from-primary/70 transition-all duration-300" />
          <div className="absolute inset-0 flex flex-col justify-end items-center text-white p-6">
            <h3 className="text-2xl font-bold mb-2 text-center">{name}</h3>
            <p className="text-sm opacity-90 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              {productCount} products
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
