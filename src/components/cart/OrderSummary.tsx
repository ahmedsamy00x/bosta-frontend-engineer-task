import { Lock, Truck } from "lucide-react"
import { useCartStore } from "@/services/store/CartStore"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"

const SHIPPING_THRESHOLD = 500
const SHIPPING_COST = 49

const OrderSummary = () => {
  const { cart } = useCartStore()

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total = subtotal + shipping

  if (cart.length === 0) {
    return null
  }

  return (
    <div className="bg-muted/30 rounded-2xl p-6 space-y-6 lg:sticky lg:top-6">
      <h2 className="text-lg font-semibold">Order Summary</h2>

      {/* Summary Lines */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        {subtotal < SHIPPING_THRESHOLD && (
          <p className="text-xs text-muted-foreground">
            Free shipping on orders over ${SHIPPING_THRESHOLD}
          </p>
        )}
      </div>

      <Separator />

      <div className="flex justify-between">
        <span className="font-semibold">Total</span>
        <span className="text-xl font-bold">${total.toFixed(2)}</span>
      </div>

      <Button size="lg" className="w-full">
        Proceed to Checkout
      </Button>

      <div className="flex items-center justify-center gap-6 pt-2">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Lock className="size-3.5" />
          <span>Secure Checkout</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Truck className="size-3.5" />
          <span>Fast Delivery</span>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
