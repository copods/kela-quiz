import { Icon } from '@iconify/react'
import DropdownField from './form/Dropdown'
import { sortByOrder } from '~/interface/Interface'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()

  return (
    <div className="flex items-center gap-4" id="sort-filter">
      <div className="flex items-center gap-2.5" id="sort-filter-body">
        <span title={t('sectionsConstants.sort')}>
          {sortDirection === sortByOrder.ascending ? (
            <Icon
              tabIndex={0}
              id="ascend"
              icon="ph:sort-ascending-bold"
              onKeyUp={(e) => {
                if (e.key === 'Enter') onSortDirectionChange(sortByOrder.desc)
              }}
              onClick={() => onSortDirectionChange(sortByOrder.desc)}
              className="bg-light-200 cursor-pointer text-2xl focus:outline-none"
              aria-label={t('commonConstants.sortAscending')}
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
              className="cursor-pointer text-2xl focus:outline-none"
              aria-label={t('commonConstants.sortDescending')}
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
        className="flex items-center text-sm text-gray-600"
        id="total-items-value"
      >
        <span>
          {t('componentGlobalConstants.totalCounts')}:
          <span id="total-count-value" className="pl-1">
            {totalItems}
          </span>
        </span>
        {showSelected && (
          <>
            <Icon icon="ci:line-m" />
            <span className="pl-3 ">
              {t('componentGlobalConstants.selected')}: 0/
              {totalItems}
            </span>
          </>
        )}
      </span>
    </div>
  )
}

export default SortFilter
