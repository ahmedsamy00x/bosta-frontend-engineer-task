import { useGetProductsQuery } from "@/services/api/get-products"
import ProductCard from "./ProductCard"
import ProductListLoader from "../loaders/ProductListLoader"

const ProductsList = () => {
    const { data, isLoading, error } = useGetProductsQuery()
    if (isLoading) return <ProductListLoader />
    if (error) return <div>Error: {error.message}</div>
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {data?.map((product) => (
            <ProductCard key={product.id} product={product} />
        ))}
    </div>
  )
}

export default ProductsList