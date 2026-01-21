import { useMemo, useEffect } from "react"
import { useSearchParams } from "react-router"

interface UsePaginationOptions<T> {
  data: T[] | undefined
  defaultPerPage?: number
  maxPerPage?: number
}

interface UsePaginationReturn<T> {
  // Current state
  currentPage: number
  perPage: number
  totalPages: number
  paginatedData: T[]
  
  // Metadata
  startIndex: number
  endIndex: number
  totalItems: number
  
  // Actions
  handlePageChange: (page: number) => void
  handlePerPageChange: (perPage: number) => void
  
  // Status
  isEmpty: boolean
  isValidPage: boolean
}

export function usePagination<T>({
  data,
  defaultPerPage = 10,
  maxPerPage = 100,
}: UsePaginationOptions<T>): UsePaginationReturn<T> {
  const [searchParams, setSearchParams] = useSearchParams()

  const rawPage = searchParams.get("page")
  const rawPerPage = searchParams.get("per_page")

  
  const perPage = useMemo(() => {
    const parsed = parseInt(rawPerPage || defaultPerPage.toString())
    if (isNaN(parsed) || parsed < 1) return defaultPerPage
    if (parsed > maxPerPage) return maxPerPage
    return parsed
  }, [rawPerPage, defaultPerPage, maxPerPage])

  const totalItems = data?.length || 0
  const totalPages = useMemo(() => {
    if (totalItems === 0) return 1
    return Math.ceil(totalItems / perPage)
  }, [totalItems, perPage])

  const currentPage = useMemo(() => {
    const parsed = parseInt(rawPage || "1")
    if (isNaN(parsed) || parsed < 1) return 1
    if (parsed > totalPages) return totalPages
    return parsed
  }, [rawPage, totalPages])

  useEffect(() => {
    const needsCorrection = 
      currentPage.toString() !== rawPage || 
      perPage.toString() !== rawPerPage
    
    if (needsCorrection) {
      setSearchParams({ 
        page: currentPage.toString(), 
        per_page: perPage.toString() 
      }, { replace: true })
    }
  }, [currentPage, perPage, rawPage, rawPerPage, setSearchParams])

  const startIndex = useMemo(() => {
    return (currentPage - 1) * perPage + 1
  }, [currentPage, perPage])

  const endIndex = useMemo(() => {
    return Math.min(currentPage * perPage, totalItems)
  }, [currentPage, perPage, totalItems])

  const paginatedData = useMemo(() => {
    if (!data) return []
    
    const start = (currentPage - 1) * perPage
    const end = Math.min(start + perPage, data.length)
    
    return data.slice(start, end)
  }, [data, currentPage, perPage])

  const isEmpty = totalItems === 0
  const isValidPage = currentPage >= 1 && currentPage <= totalPages

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return
    
    setSearchParams({ 
      page: newPage.toString(), 
      per_page: perPage.toString() 
    })
  }

  const handlePerPageChange = (newPerPage: number) => {
    setSearchParams({ 
      page: "1", 
      per_page: newPerPage.toString() 
    })
  }

  return {
    // Current state
    currentPage,
    perPage,
    totalPages,
    paginatedData,
    
    // Metadata
    startIndex,
    endIndex,
    totalItems,
    
    // Actions
    handlePageChange,
    handlePerPageChange,
    
    // Status
    isEmpty,
    isValidPage,
  }
}
