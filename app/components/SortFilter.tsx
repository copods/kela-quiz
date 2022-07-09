import { Icon } from "@iconify/react"

const SortFilter = ({ sortDirection, onSortDirectionChange, sortBy, onSortByChange, totalItems }: { sortDirection: string, onSortDirectionChange: (e: string) => void, sortBy: string, onSortByChange: (e: string) => void, totalItems: number }) => {

  const filterByType = [
    {
      name: 'Name',
      value: 'name'
    },
    {
      name: 'Created Date',
      value: 'date'
    }
  ]

  return (
    <div className="flex justify-between items-center " >
      <div className="flex items-center gap-2.5">
        {
          sortDirection == 'asc' ?
            <Icon icon="ph:sort-ascending-bold" onClick={() => onSortDirectionChange('asc')} className="text-2xl cursor-pointer" /> :
            <Icon icon="ph:sort-descending-bold" onClick={() => onSortDirectionChange('desc')} className="text-2xl cursor-pointer" />
        }
        {/* <DropdownField
            data={sortByDetails}
            displayKey={'name'}
            valueKey={'id'}
            value={sortBy}
            setValue={setSortBy}
          /> */}
      </div>
      <span className="bg-white border border-gray-200 flex justify-center items-center h-11 w-11 rounded-lg">
        {totalItems}
      </span>
    </div>

  )
}

export default SortFilter