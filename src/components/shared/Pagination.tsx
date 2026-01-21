import { Field, FieldLabel } from "@/components/ui/field"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface PaginationComponentProps {
  page: number
  total: number
  per_page: number
  onPageChange: (page: number) => void
  onPerPageChange: (perPage: number) => void
}

const PER_PAGE_OPTIONS = [5, 10, 20, 50]

export function PaginationComponent({ 
  page, 
  total, 
  per_page, 
  onPageChange, 
  onPerPageChange 
}: PaginationComponentProps) {
  // Calculate pagination metadata
  const totalPages = Math.ceil(total / per_page)
  const startIndex = (page - 1) * per_page + 1
  const endIndex = Math.min(page * per_page, total)
  
  // Boundary checks
  const isFirstPage = page <= 1
  const isLastPage = page >= totalPages
  
  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!isFirstPage) {
      onPageChange(page - 1)
    }
  }
  
  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!isLastPage) {
      onPageChange(page + 1)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
      <Field orientation="horizontal" className="w-fit">
        <FieldLabel htmlFor="select-rows-per-page" className="text-sm">
          Items per page
        </FieldLabel>
        <Select 
          value={per_page.toString()} 
          onValueChange={(value) => onPerPageChange(parseInt(value))}
        >
          <SelectTrigger className="w-20" id="select-rows-per-page">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectGroup>
              {PER_PAGE_OPTIONS.map((option) => (
                <SelectItem key={option} value={option.toString()}>
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>

      <div className="text-sm text-muted-foreground">
        Showing <span className="font-medium text-foreground">{startIndex}</span> to{" "}
        <span className="font-medium text-foreground">{endIndex}</span> of{" "}
        <span className="font-medium text-foreground">{total}</span> items
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          Page <span className="font-medium text-foreground">{page}</span> of{" "}
          <span className="font-medium text-foreground">{totalPages}</span>
        </span>
        
        <Pagination className="mx-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={handlePrevious}
                className={isFirstPage ? "pointer-events-none opacity-50" : ""}
                aria-disabled={isFirstPage}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext 
                href="#" 
                onClick={handleNext}
                className={isLastPage ? "pointer-events-none opacity-50" : ""}
                aria-disabled={isLastPage}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
