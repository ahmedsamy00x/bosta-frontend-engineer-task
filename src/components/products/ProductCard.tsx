import { useState } from "react"
import { Eye, ShoppingCart, Minus, Plus } from "lucide-react"
import type { Product } from "@/services/types/products"
import { Button } from "../ui/button"
import { useNavigate } from "react-router"
import { useCartStore } from "@/stores/useCartStore"

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCartStore()
  const navigate = useNavigate()

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`)
  }

  const handleAddToCart = () => {
    addToCart({ product, quantity })
    setQuantity(1) // Reset quantity after adding
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
        <h3 className="text-sm font-medium line-clamp-2 min-h-20 leading-tight text-foreground/90">
          {product.title}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-0.5">
          <span className="text-xs text-muted-foreground">$</span>
          <span className="text-xl font-semibold tracking-tight">
            {product.price.toFixed(2)}
          </span>
        </div>

        {/* Quantity Control */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Qty:</span>
          <div className="flex items-center border border-border rounded-lg">
            <Button
              variant="ghost"
              size="icon-xs"
              className="rounded-r-none cursor-pointer"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Minus className="size-3" />
            </Button>
            <span className="w-8 text-center text-sm font-medium">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="icon-xs"
              className="rounded-l-none cursor-pointer"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="size-3" />
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-1">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-1.5 cursor-pointer"
            onClick={handleViewDetails}
          >
            <Eye className="size-3.5" />
            Details
          </Button>
          <Button
            variant="default"
            size="sm"
            className="flex-1 gap-1.5 cursor-pointer"
            onClick={handleAddToCart}
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