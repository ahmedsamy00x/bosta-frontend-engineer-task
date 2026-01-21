import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../constants/CONSTANTS";
import type { Product } from "../types/products";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export const createProduct = async (product: Product) => {
    const response = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    })
    if (!response.ok) {
        throw new Error("Failed to create product")
    }
    return response.json()
}

export const useCreateProductMutation = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    return useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] })
            toast.success("Product created successfully")
            navigate("/")
            
        },
        onError: (error) => {
            toast.error(error.message || "Failed to create product")
        }
    })
}