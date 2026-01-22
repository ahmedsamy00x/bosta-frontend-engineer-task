import { useQuery } from "@tanstack/react-query"
import { BASE_URL } from "../../constants/CONSTANTS"
import type { Product } from "../../types/products"

const getProduct = async (id: string): Promise<Product> => {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  if (!response.ok) {
    throw new Error("Failed to fetch product")
  }
  return response.json()
}

export const useGetProductQuery = (id: string) => {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  })
}
