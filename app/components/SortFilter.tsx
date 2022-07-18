import { Icon } from "@iconify/react"
import DropdownField from "./form/Dropdown"

const SortFilter = ({ filterData, sortDirection, onSortDirectionChange, sortBy, onSortChange, totalItems }: { filterData: Array<any>, sortDirection: string, onSortDirectionChange: (e: string) => void, sortBy: string, onSortChange: (e: string) => void, totalItems: number }) => {

  return (
    <div className="flex justify-between items-center " >
      <div className="flex items-center gap-2.5">
        {
          sortDirection == 'asc' ?
            <Icon icon="ph:sort-ascending-bold" onClick={() => onSortDirectionChange('desc')} className="text-2xl cursor-pointer" /> :
            <Icon icon="ph:sort-descending-bold" onClick={() => onSortDirectionChange('asc')} className="text-2xl cursor-pointer" />
        }
        <DropdownField
          data={filterData}
          displayKey={'name'}
          valueKey={'value'}
          value={sortBy}
          setValue={onSortChange}
        />
      </div>
      <span className="bg-white border border-gray-200 flex justify-center items-center h-11 w-11 rounded-lg">
        {totalItems}
      </span>
    </div>

  )
}

export default SortFilter