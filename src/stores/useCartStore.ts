import { create } from "zustand"
import type { Product } from "@/services/types/products"

interface CartStore {
    cart: {
        product: Product
        quantity: number
    }[]
    addToCart: ({ product, quantity }: { product: Product, quantity: number }) => void
    removeFromCart: (productId: number) => void
    updateQuantity: (productId: number, quantity: number) => void
    clearCart: () => void
}

export const useCartStore = create<CartStore>((set) => ({
    cart: [],
    addToCart: ({ product, quantity }) => set((state) => {
        const existingItem = state.cart.find((item) => item.product.id === product.id)
        if (existingItem) {
            return {
                cart: state.cart.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                ),
            }
        }
        return { cart: [...state.cart, { product, quantity }] }
    }),
    removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter((item) => item.product.id !== productId)
    })),
    updateQuantity: (productId, quantity) => set((state) => ({
        cart: quantity <= 0
            ? state.cart.filter((item) => item.product.id !== productId)
            : state.cart.map((item) =>
                item.product.id === productId
                    ? { ...item, quantity }
                    : item
            ),
    })),
    clearCart: () => set({ cart: [] }),
}))