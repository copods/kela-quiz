import { Icon } from '@iconify/react'
import DropdownField from './form/Dropdown'
import { componentGlobalConstants } from '~/constants/common.constants'
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
            tabIndex={0}
            id="ascend"
            icon="ph:sort-ascending-bold"
            onKeyUp={(e) => {
              if (e.key === 'Enter') onSortDirectionChange('desc')
            }}
            onClick={() => onSortDirectionChange('desc')}
            className="cursor-pointer text-2xl"
            aria-label='Sort Ascending'
          />
        ) : (
          <Icon
            tabIndex={0}
            id="descend"
            icon="ph:sort-descending-bold"
            onKeyUp={(e) => {
              if (e.key === 'Enter') onSortDirectionChange('asc')
            }}
            onClick={() => onSortDirectionChange('asc')}
            className="cursor-pointer text-2xl"
            aria-label='Sort Descending'
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
        className="flex items-center pl-4 text-sm text-totalCount"
        id="total-items-value"
      >
        <span>
          {componentGlobalConstants.totalCounts}:
          <span id="total-count-value" className="pl-1">
            {totalItems}
          </span>
        </span>
        {showSelected && (
          <>
            <Icon icon="ci:line-m" />
            <span className="pl-3 ">
              {componentGlobalConstants.selected}: 0/
              {totalItems}
            </span>
          </>
        )}
      </span>
    </div>
  )
}

export default SortFilter
