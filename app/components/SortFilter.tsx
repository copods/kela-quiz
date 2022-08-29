import { Icon } from '@iconify/react'
import DropdownField from './form/Dropdown'
import {
  componentGlobalConstants,
  sectionsConstants,
} from '~/constants/common.constants'

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
        <div 
             tabIndex={0}
             role={sectionsConstants.sort}
             title={sectionsConstants.sort}
             aria-label={sectionsConstants.sort}
             onKeyUp={(e) => {
              if (e.key === 'Enter') onSortDirectionChange('desc')
            }}
            onClick={() => onSortDirectionChange('desc')}
        >
          {sortDirection == 'asc' ? (
            <Icon
              id="ascend"
              icon="ph:sort-ascending-bold"
              className="cursor-pointer text-2xl"
            />
          ) : (
            <Icon
              id="descend"
              icon="ph:sort-descending-bold"
              className="cursor-pointer text-2xl"
            />
          )}
        </div>

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
        tabIndex={0}
        role={componentGlobalConstants.totalCounts}
        title={componentGlobalConstants.totalCounts}
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
