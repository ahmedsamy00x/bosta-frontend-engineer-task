import { useCartStore } from "@/services/store/CartStore"
import CartItems from "../cart/CartItems"
import OrderSummary from "../cart/OrderSummary"

const CartPage = () => {
  const { cart } = useCartStore()

  // Render centered empty state when cart is empty
  if (cart.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl lg:text-3xl font-bold mb-8">Shopping Cart</h1>
        <CartItems />
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl lg:text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CartItems />
        </div>

        <div>
          <OrderSummary />
        </div>
      </div>
    </div>
  )
}

export default CartPage
