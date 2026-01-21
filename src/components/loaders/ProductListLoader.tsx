import { Skeleton } from '../ui/skeleton'

const ProductListLoader = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="animate-pulse">
                <Skeleton className="h-72 w-full rounded-lg" />
            </div>
        ))}
    </div>
  )
}

export default ProductListLoader