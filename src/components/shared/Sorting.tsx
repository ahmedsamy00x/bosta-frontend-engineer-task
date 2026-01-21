import { Field, FieldLabel } from "../ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

interface SortingProps {
  sort: string
  onSortChange: (value: string) => void
}

const Sorting = ({ sort, onSortChange }: SortingProps) => {
  return (
    <Field orientation="horizontal" className="w-fit">
      <FieldLabel htmlFor="sort-by" className="text-sm">
        Sort by
      </FieldLabel>
      <Select value={sort} onValueChange={onSortChange}>
        <SelectTrigger id="sort-by">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="category-asc">Category: A to Z</SelectItem>
          <SelectItem value="category-desc">Category: Z to A</SelectItem>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
        </SelectContent>
      </Select>
    </Field>
  )
}

export default Sorting