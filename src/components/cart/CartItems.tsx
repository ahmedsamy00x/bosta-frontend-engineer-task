import { useNavigate } from "react-router"
import { ArrowLeft, ShoppingBag } from "lucide-react"
import { useCartStore } from "@/services/store/CartStore"
import { Button } from "../ui/button"
import CartItem from "./CartItem"

const CartItems = () => {
  const { cart } = useCartStore()
  const navigate = useNavigate()

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <ShoppingBag className="size-16 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Your cart is empty
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Add some products to get started
        </p>
        <Button variant="outline" onClick={() => navigate("/")}>
          <ArrowLeft className="size-4" />
          Continue Shopping
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {cart.map((item) => (
          <CartItem
            key={item.product.id}
            product={item.product}
            quantity={item.quantity}
          />
        ))}
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="gap-2 text-muted-foreground hover:text-foreground"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="size-4" />
        Continue Shopping
      </Button>
    </div>
  )
}

export default CartItems
