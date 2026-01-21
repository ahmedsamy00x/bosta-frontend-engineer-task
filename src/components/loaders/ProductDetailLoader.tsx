import { Skeleton } from "../ui/skeleton"

export const ProductDetailLoader = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Skeleton className="h-8 w-36 mb-6 rounded-md" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <Skeleton className="aspect-square w-full rounded-2xl" />

        <div className="flex flex-col space-y-6">
          <Skeleton className="h-5 w-24 rounded-full" />

          <div className="space-y-2">
            <Skeleton className="h-8 w-full rounded-md" />
            <Skeleton className="h-8 w-3/4 rounded-md" />
          </div>

          <Skeleton className="h-12 w-32 rounded-md" />

          <div className="space-y-3">
            <Skeleton className="h-4 w-24 rounded-md" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-5/6 rounded-md" />
              <Skeleton className="h-4 w-4/5 rounded-md" />
            </div>
          </div>

          <div className="pt-4">
            <Skeleton className="h-11 w-40 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}
