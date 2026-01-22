import { useQuery } from "@tanstack/react-query"
import { BASE_URL } from "../../constants/CONSTANTS"
import type { Product } from "../../types/products"
const getProducts = async () => {
    const response = await fetch(`${BASE_URL}/products`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (!response.ok) {
        throw new Error("Failed to fetch products")
    }
    return response.json()
}

export const useGetProductsQuery = () => { 
    return useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: getProducts
    })
}