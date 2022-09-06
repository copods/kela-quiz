import { Icon } from '@iconify/react'
import DropdownField from './form/Dropdown'
import {
  commonConstants,
  componentGlobalConstants,
  sectionsConstants,
} from '~/constants/common.constants'
import { sortByOrder } from '~/interface/Interface'

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
        <span title={sectionsConstants.sort}>
          {sortDirection === sortByOrder.ascending ? (
            <Icon
              tabIndex={0}
              id="ascend"
              icon="ph:sort-ascending-bold"
              onKeyUp={(e) => {
                if (e.key === 'Enter') onSortDirectionChange(sortByOrder.desc)
              }}
              onClick={() => onSortDirectionChange(sortByOrder.desc)}
              className="bg-light-200focus:outline-none cursor-pointer text-2xl"
              aria-label={commonConstants.sortAscending}
            />
          ) : (
            <Icon
              tabIndex={0}
              id="descend"
              icon="ph:sort-descending-bold"
              onKeyUp={(e) => {
                if (e.key === 'Enter')
                  onSortDirectionChange(sortByOrder.ascending)
              }}
              onClick={() => onSortDirectionChange(sortByOrder.ascending)}
              className="cursor-pointer text-2xl"
              aria-label={commonConstants.sortDescending}
            />
          )}
        </span>
        <DropdownField
          data={filterData}
          displayKey={'name'}
          valueKey={'value'}
          value={sortBy}
          setValue={onSortChange}
        />
      </div>
      <span
        className="flex items-center pl-4 text-sm text-gray-600"
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
