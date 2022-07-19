import { Icon } from '@iconify/react'
import DropdownField from './form/Dropdown'

const SortFilter = ({
  filterData,
  sortDirection,
  onSortDirectionChange,
  sortBy,
  onSortChange,
  totalItems,
}: {
  filterData: Array<any>
  sortDirection: string
  onSortDirectionChange: (e: string) => void
  sortBy: string
  onSortChange: (e: string) => void
  totalItems: number
}) => {
  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center gap-2.5">
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
      <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 bg-white">
        {totalItems}
      </span>
    </div>
  )
}

export default SortFilter
