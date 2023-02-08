import { Icon } from "@iconify/react"
import DropdownField from "./Dropdown"
import type { OtherFilters } from "~/interface/Interface"
import { sortByOrder } from "~/interface/Interface"
import { useTranslation } from "react-i18next"

const SortFilter = ({
  filterData,
  sortDirection,
  onSortDirectionChange,
  sortBy,
  onSortChange,
  totalItems,
  showSelected,
  otherFilters = [],
}: {
  filterData: Array<any>
  sortDirection: string
  onSortDirectionChange: (e: string) => void
  sortBy: string
  onSortChange: (e: string) => void
  totalItems: number
  showSelected: boolean
  otherFilters?: OtherFilters[]
}) => {
  const { t } = useTranslation()

  return (
    <div className="flex items-center gap-4" id="sort-filter">
      <div className="flex items-center gap-2.5" id="sort-filter-body">
        <span title={t("sectionsConstants.sort")}>
          {sortDirection === sortByOrder.ascending ? (
            <Icon
              tabIndex={0}
              id="ascend"
              icon="ph:sort-ascending-bold"
              onKeyUp={(e) => {
                if (e.key === "Enter") onSortDirectionChange(sortByOrder.desc)
              }}
              onClick={() => onSortDirectionChange(sortByOrder.desc)}
              aria-label={t("commonConstants.sortAscending")}
              className="bg-light-200 cursor-pointer text-2xl focus:outline-dotted focus:outline-2"
            />
          ) : (
            <Icon
              tabIndex={0}
              id="descend"
              icon="ph:sort-descending-bold"
              onKeyUp={(e) => {
                if (e.key === "Enter")
                  onSortDirectionChange(sortByOrder.ascending)
              }}
              onClick={() => onSortDirectionChange(sortByOrder.ascending)}
              aria-label={t("commonConstants.sortDescending")}
              className="cursor-pointer text-2xl focus:outline-dotted focus:outline-2"
            />
          )}
        </span>
        <div className="flex  gap-2">
          <div className="w-48">
            <DropdownField
              data={filterData}
              displayKey={"name"}
              valueKey={"value"}
              value={sortBy}
              setValue={onSortChange}
            />
          </div>

          {otherFilters.length > 0
            ? otherFilters.map((filterData) => (
                <div key={filterData.id} className="w-48">
                  <DropdownField
                    data={filterData.data}
                    displayKey={filterData.displayKey}
                    valueKey={filterData.valueKey}
                    value={filterData.value}
                    setValue={filterData.setValue}
                  />
                </div>
              ))
            : null}
        </div>
      </div>
      <span
        tabIndex={0}
        role={"banner"}
        className="flex items-center text-sm text-gray-600"
        id="total-items-value"
      >
        <span className="w-max">
          {t("componentGlobalConstants.totalCounts")}:
          <span id="total-count-value" className="pl-1">
            {totalItems}
          </span>
        </span>
        {showSelected && (
          <>
            <Icon icon="ci:line-m" />
            <span className="pl-3 ">
              {t("componentGlobalConstants.selected")}: 0/
              {totalItems}
            </span>
          </>
        )}
      </span>
    </div>
  )
}

export default SortFilter
