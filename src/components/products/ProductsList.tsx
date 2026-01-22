import { useGetProductsQuery } from "@/services/api/products/get-products"
import ProductCard from "./ProductCard"
import ProductListLoader from "../loaders/ProductListLoader"
import { PaginationComponent } from "../shared/Pagination"
import {  Plus } from "lucide-react"
import { usePagination, useSorting, type SortConfig } from "@/hooks"
import type { Product } from "@/services/types/products"
import Sorting from "../shared/Sorting"
import { Button } from "../ui/button"
import { Link } from "react-router"
import ErrorMessage from "../shared/ErrorMessage"
import Empty from "../shared/Empty"

const PRODUCT_SORT_CONFIGS: SortConfig<Product>[] = [
  {
    key: 'category-asc',
    compareFn: (a, b) => a.category.localeCompare(b.category)
  },
  {
    key: 'category-desc',
    compareFn: (a, b) => b.category.localeCompare(a.category)
  },
  {
    key: 'price-asc',
    compareFn: (a, b) => a.price - b.price
  },
  {
    key: 'price-desc',
    compareFn: (a, b) => b.price - a.price
  },
]

const ProductsList = () => {
  const { data, isLoading, error } = useGetProductsQuery()

  const { sortedData, currentSort, handleSortChange } = useSorting<Product>({
    data,
    sortConfigs: PRODUCT_SORT_CONFIGS,
    defaultSort: 'category-asc'
  })

  const {
    paginatedData,
    currentPage,
    perPage,
    totalItems,
    handlePageChange,
    handlePerPageChange,
    isEmpty,
  } = usePagination<Product>({
    data: sortedData,
    defaultPerPage: 10,
    maxPerPage: 100,
  })

  if (isLoading) {
    return <ProductListLoader />
  }

  if (error) {
    return (
      <ErrorMessage error={error} />
    )
  }

  if (isEmpty) {
    return (
      <Empty />
    )
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col md:flex-row items-start gap-y-4 md:items-center justify-between">
        <Sorting sort={currentSort} onSortChange={handleSortChange} />
        <Button variant="outline">
          <Link to="/products/create" className="flex items-center gap-2">
            <Plus className="size-4" />
            Create Product
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <PaginationComponent 
        page={currentPage}
        total={totalItems}
        per_page={perPage}
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
      />
    </div>
  )
}

export default ProductsList