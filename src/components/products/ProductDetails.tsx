import { useParams, useNavigate } from "react-router"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import { useGetProductQuery } from "@/services/api/get-product"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { ProductDetailLoader } from "../loaders/ProductDetailLoader"

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: product, isLoading, error } = useGetProductQuery(id!)

  if (isLoading) {
    return <ProductDetailLoader />
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center space-y-3">
          <div className="text-destructive text-lg font-semibold">
            Failed to load product
          </div>
          <p className="text-sm text-muted-foreground">
            {error?.message || "Product not found"}
          </p>
          <Button variant="outline" onClick={() => navigate("/")}>
            <ArrowLeft className="size-4" />
            Back to Products
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Button
        variant="ghost"
        size="sm"
        className="mb-6 gap-2 text-muted-foreground hover:text-foreground"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="size-4" />
        Back to Products
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="relative">
          <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-muted/30 to-muted/50">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-contain p-8"
            />
          </div>

          
        </div>

        <div className="flex flex-col space-y-6">
          <Badge variant="outline" className="w-fit uppercase tracking-wider text-xs">
            {product.category}
          </Badge>

          <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight text-foreground">
            {product.title}
          </h1>

          <div className="flex items-baseline gap-1">
            <span className="text-lg text-muted-foreground">$</span>
            <span className="text-4xl font-bold tracking-tight">
              {product.price.toFixed(2)}
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Description
            </h2>
            <p className="text-base text-foreground/80 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="pt-4">
            <Button size="lg" className="w-full sm:w-auto gap-2">
              <ShoppingCart className="size-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
