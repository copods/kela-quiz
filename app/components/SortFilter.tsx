import { Icon } from '@iconify/react'
import DropdownField from './form/Dropdown'

const SortFilter = ({
  filterData,
  sortDirection,
  onSortDirectionChange,
  sortBy,
  onSortChange,
  totalItems,
  showSelected,
}: {
  filterData: Array<any>
  sortDirection: string
  onSortDirectionChange: (e: string) => void
  sortBy: string
  onSortChange: (e: string) => void
  totalItems: number
  showSelected: boolean
}) => {
  return (
    <div className="flex items-center" id="sort-filter">
      <div className="flex items-center gap-2.5" id="sort-filter-body">
        {sortDirection == 'asc' ? (
          <Icon
            icon="ph:sort-ascending-bold"
            onClick={() => onSortDirectionChange('desc')}
            className="cursor-pointer text-2xl"
          />
        ) : (
          <Icon
            icon="ph:sort-descending-bold"
            onClick={() => onSortDirectionChange('asc')}
            className="cursor-pointer text-2xl"
          />
        )}
        <DropdownField
          data={filterData}
          displayKey={'name'}
          valueKey={'value'}
          value={sortBy}
          setValue={onSortChange}
        />
      </div>
      <span
        className="flex items-center pl-4 text-sm font-normal text-totalCount"
        id="total-items-value"
      >
        <span className="pr-3">Total Counts: {totalItems}</span>
        {showSelected && (
          <>
            <Icon icon="ci:line-m" />
            <span className="pl-3 ">Selected: 0/{totalItems}</span>
          </>
        )}
      </span>
    </div>
  )
}

export default SortFilter
