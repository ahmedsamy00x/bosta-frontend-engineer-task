import { useGetProductsQuery } from "@/services/api/get-products"
import ProductCard from "./ProductCard"
import ProductListLoader from "../loaders/ProductListLoader"
import { PaginationComponent } from "../shared/Pagination"
import {  PackageOpen, Plus } from "lucide-react"
import { usePagination, useSorting, type SortConfig } from "@/hooks"
import type { Product } from "@/services/types/products"
import Sorting from "../shared/Sorting"
import { Button } from "../ui/button"
import { Link } from "react-router"

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
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="text-center space-y-3">
          <div className="text-destructive text-lg font-semibold">
            Failed to load products
          </div>
          <p className="text-sm text-muted-foreground">
            {error.message || "An unexpected error occurred"}
          </p>
        </div>
      </div>
    )
  }

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <PackageOpen className="size-16 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No products found
        </h3>
        <p className="text-sm text-muted-foreground">
          Check back later for new items
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
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