import { useMemo } from "react"
import { useSearchParams } from "react-router"

export interface SortConfig<T> {
  key: string
  compareFn: (a: T, b: T) => number
}

interface UseSortingOptions<T> {
  data: T[] | undefined
  sortConfigs: SortConfig<T>[]
  defaultSort?: string
}

interface UseSortingReturn<T> {
  sortedData: T[]
  currentSort: string
  handleSortChange: (sortKey: string) => void
}

export function useSorting<T>({
  data,
  sortConfigs,
  defaultSort,
}: UseSortingOptions<T>): UseSortingReturn<T> {
  const [searchParams, setSearchParams] = useSearchParams()
  
  const currentSort = searchParams.get("sort") || defaultSort || sortConfigs[0]?.key || ""

  const activeSortConfig = useMemo(() => {
    return sortConfigs.find(config => config.key === currentSort)
  }, [sortConfigs, currentSort])

  const sortedData = useMemo(() => {
    if (!data) return []
    if (!activeSortConfig) return [...data]
    
    return [...data].sort(activeSortConfig.compareFn)
  }, [data, activeSortConfig])

  const handleSortChange = (sortKey: string) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev)
      newParams.set('sort', sortKey)
      newParams.set('page', '1')  
      return newParams
    })
  }

  return {
    sortedData,
    currentSort,
    handleSortChange,
  }
}