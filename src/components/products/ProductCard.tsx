import { Eye, ShoppingCart } from "lucide-react"
import type { Product } from "@/services/types/products"
import { Button } from "../ui/button"
import { useNavigate } from "react-router"

interface ProductCardProps {
  product: Product
  onAddToCart?: () => void
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const navigate = useNavigate()
  const handleViewDetails = () => {
    navigate(`/product/${product.id}`)
  }
  return (
    <div className="group bg-card rounded-xl overflow-hidden border border-border/50 hover:border-border hover:shadow-lg transition-all duration-300">
      {/* Image Section */}
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-muted/20 to-muted/40">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain p-6 transition-transform duration-300 group-hover:scale-105"
        />

        
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <span className="text-[11px] uppercase tracking-widest text-muted-foreground/70 font-medium">
          {product.category}
        </span>

        {/* Title */}
        <h3 className="text-sm font-medium line-clamp-2 min-h-10 leading-tight text-foreground/90">
          {product.title}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-0.5">
          <span className="text-xs text-muted-foreground">$</span>
          <span className="text-xl font-semibold tracking-tight">
            {product.price.toFixed(2)}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-1">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-1.5"
            onClick={handleViewDetails}
          >
            <Eye className="size-3.5" />
            Details
          </Button>
          <Button
            variant="default"
            size="sm"
            className="flex-1 gap-1.5"
            onClick={onAddToCart}
          >
            <ShoppingCart className="size-3.5" />
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard