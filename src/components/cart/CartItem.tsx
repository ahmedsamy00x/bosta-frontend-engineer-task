import { Minus, Plus, Trash2 } from "lucide-react"
import type { Product } from "@/services/types/products"
import { useCartStore } from "@/services/store/CartStore"
import { Button } from "../ui/button"

interface CartItemProps {
  product: Product
  quantity: number
}

const CartItem = ({ product, quantity }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCartStore()
  const lineTotal = product.price * quantity

  return (
    <div className="flex gap-4 p-4 bg-card rounded-xl border border-border/50">
      <div className="size-20 shrink-0 rounded-lg overflow-hidden bg-muted/30">
        <img
          src={product.image}
          alt={product.title}
          className="size-full object-contain p-2"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-medium text-foreground line-clamp-1">
              {product.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <p className="text-lg font-semibold shrink-0">
            ${lineTotal.toFixed(2)}
          </p>
        </div>

          <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center border border-border rounded-lg">
            <Button
              variant="ghost"
              size="icon-sm"
              className="rounded-r-none"
              onClick={() => updateQuantity(product.id!, quantity - 1)}
            >
              <Minus className="size-3.5" />
            </Button>
            <span className="w-10 text-center text-sm font-medium">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="icon-sm"
              className="rounded-l-none"
              onClick={() => updateQuantity(product.id!, quantity + 1)}
            >
              <Plus className="size-3.5" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground hover:text-destructive"
            onClick={() => removeFromCart(product.id!)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
