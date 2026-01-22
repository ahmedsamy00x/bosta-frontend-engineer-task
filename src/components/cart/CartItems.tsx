import { useNavigate } from "react-router"
import { ArrowLeft } from "lucide-react"
import { useCartStore } from "@/stores/useCartStore"
import { Button } from "../ui/button"
import CartItem from "./CartItem"
import Empty from "../shared/Empty"

const CartItems = () => {
  const { cart } = useCartStore()
  const navigate = useNavigate()

  if (cart.length === 0) {
    return (
      <Empty message="Your cart is empty" description="Check back later for new items">
          <Button variant="outline" className="cursor-pointer" onClick={() => navigate("/")}>
            <ArrowLeft className="size-4" />
            Continue Shopping
          </Button> 
        </Empty>
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
