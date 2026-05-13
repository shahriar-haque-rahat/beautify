"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { Search, Filter, Grid, List, ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import ProductCard from "@/components/shared/ProductCard"
import { products } from "@/data/product.data"
import FadeIn from "@/components/shared/FadeIn"

const PRODUCTS_PER_PAGE = 6

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Initialize state from query parameters
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("category")?.split(",") || []
  )
  const [priceRange, setPriceRange] = useState([
    Number(searchParams.get("minPrice")) || 0,
    Number(searchParams.get("maxPrice")) || 200,
  ])
  const [selectedColors, setSelectedColors] = useState<string[]>(
    searchParams.get("color")?.split(",") || []
  )
  const [selectedSizes, setSelectedSizes] = useState<string[]>(
    searchParams.get("size")?.split(",") || []
  )
  const [minRating, setMinRating] = useState(Number(searchParams.get("minRating")) || 0)
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "popularity")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1)

  const categories = [...new Set(products.map((p) => p.category))]
  const colors = [...new Set(products.flatMap((p) => p.colors || []))]
  const sizes = [...new Set(products.flatMap((p) => p.sizes || []))]

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    
    if (searchQuery) params.set("search", searchQuery)
    if (selectedCategories.length > 0) params.set("category", selectedCategories.join(","))
    if (priceRange[0] !== 0) params.set("minPrice", priceRange[0].toString())
    if (priceRange[1] !== 200) params.set("maxPrice", priceRange[1].toString())
    if (selectedColors.length > 0) params.set("color", selectedColors.join(","))
    if (selectedSizes.length > 0) params.set("size", selectedSizes.join(","))
    if (minRating !== 0) params.set("minRating", minRating.toString())
    if (sortBy !== "popularity") params.set("sort", sortBy)
    if (currentPage !== 1) params.set("page", currentPage.toString())

    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }, [
    searchQuery,
    selectedCategories,
    priceRange,
    selectedColors,
    selectedSizes,
    minRating,
    sortBy,
    currentPage,
    router,
    pathname,
  ])

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      const matchesColor =
        selectedColors.length === 0 ||
        (product.colors && product.colors.some((color) => selectedColors.includes(color)))
      const matchesSize =
        selectedSizes.length === 0 || (product.sizes && product.sizes.some((size) => selectedSizes.includes(size)))
      const matchesRating = !product.rating || product.rating >= minRating

      return matchesSearch && matchesCategory && matchesPrice && matchesColor && matchesSize && matchesRating
    })

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case "newest":
        filtered.sort((a, b) => b.id.localeCompare(a.id))
        break
      default:
        break
    }

    return filtered
  }, [searchQuery, selectedCategories, priceRange, selectedColors, selectedSizes, minRating, sortBy])

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const endIndex = startIndex + PRODUCTS_PER_PAGE
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  // Reset to first page when filters change
  useMemo(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategories, priceRange, selectedColors, selectedSizes, minRating, sortBy])

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  const handleColorChange = (color: string, checked: boolean) => {
    if (checked) {
      setSelectedColors([...selectedColors, color])
    } else {
      setSelectedColors(selectedColors.filter((c) => c !== color))
    }
  }

  const handleSizeChange = (size: string, checked: boolean) => {
    if (checked) {
      setSelectedSizes([...selectedSizes, size])
    } else {
      setSelectedSizes(selectedSizes.filter((s) => s !== size))
    }
  }

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push("...")
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push("...")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="hero-gradient py-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="container mx-auto px-4 text-center"
        >
          <h1 className="text-5xl font-bold mb-4 text-primary">Shop</h1>
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <span>Home</span>
            <span>/</span>
            <span>Shop</span>
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 bg-white/80 backdrop-blur-sm">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden bg-white/80 backdrop-blur-sm"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>

            <div className="flex border border-border rounded-md bg-white/80 backdrop-blur-sm">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          <motion.aside
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={`w-64 space-y-6 ${showFilters ? "block" : "hidden"} lg:block`}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-border/50">
              <h3 className="font-semibold mb-4 text-primary text-lg">Categories</h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                    />
                    <label htmlFor={category} className="text-sm">
                      {category} ({products.filter((p) => p.category === category).length})
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-border/50">
              <h3 className="font-semibold mb-4 text-primary text-lg">Price</h3>
              <div className="px-2">
                <Slider value={priceRange} onValueChange={setPriceRange} max={200} step={5} className="mb-4" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            {colors.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-border/50">
                <h3 className="font-semibold mb-4 text-primary text-lg">Colors</h3>
                <div className="space-y-3">
                  {colors.map((color) => (
                    <div key={color} className="flex items-center space-x-2">
                      <Checkbox
                        id={color}
                        checked={selectedColors.includes(color)}
                        onCheckedChange={(checked) => handleColorChange(color, checked as boolean)}
                      />
                      <label htmlFor={color} className="text-sm capitalize">
                        {color}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {sizes.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-border/50">
                <h3 className="font-semibold mb-4 text-primary text-lg">Sizes</h3>
                <div className="space-y-3">
                  {sizes.map((size) => (
                    <div key={size} className="flex items-center space-x-2">
                      <Checkbox
                        id={size}
                        checked={selectedSizes.includes(size)}
                        onCheckedChange={(checked) => handleSizeChange(size, checked as boolean)}
                      />
                      <label htmlFor={size} className="text-sm">
                        {size}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <div className="text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length}{" "}
                products
              </div>
              <div className="text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
            </div>

            <motion.div
              key={`page-${currentPage}-${viewMode}-${sortBy}-${selectedCategories.join(",")}-${searchQuery}`}
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06 } },
              }}
              className={
                viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8" : "space-y-6 mb-8"
              }
            >
              {currentProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <Button
                  size="sm"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="backdrop-blur-sm"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <div className="flex space-x-1">
                  {getPageNumbers().map((page, index) => (
                    <div key={index}>
                      {page === "..." ? (
                        <span className="px-3 py-2 text-muted-foreground">...</span>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => goToPage(page as number)}
                          className={
                            currentPage === page
                              ? "border"
                              : "border text-foreground bg-transparent hover:bg-primary/50 backdrop-blur-sm"
                          }
                        >
                          {page}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <Button
                  size="sm"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="backdrop-blur-sm"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}