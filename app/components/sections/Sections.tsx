import { Icon } from '@iconify/react'
import { useState } from 'react'
import SectionCard from './SectionCard'
import Dropdown from '../form/Dropdown'
import type { LoaderData } from '../../routes/sections'

type SectionType = {
  data: LoaderData
  sortBy: {
    name: string
    id: string
  }
  setSortBy: (e: { name: string; id: string }) => void
  order: string
  setOrder: Function
  sortByDetails: Array<{ name: string; id: string }>
}
const Sections = ({
  data,
  sortBy,
  setSortBy,
  order,
  setOrder,
  sortByDetails,
}: SectionType) => {
  const [selectedSection, setSelectedSection] = useState(data.selectedSectionId)
  // const []

  return (
    <div className="flex w-96 flex-col gap-6 overflow-auto">
      {/* filters */}
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-2.5">
          {order === 'asc' ? (
            <Icon
              icon="ph:sort-ascending-bold"
              onClick={() => setOrder('desc')}
              className="cursor-pointer text-2xl"
            />
          ) : (
            <Icon
              icon="ph:sort-descending-bold"
              onClick={() => setOrder('asc')}
              className="cursor-pointer text-2xl"
            />
          )}
          {/* <select
                className="test-base h-11 w-36 rounded-lg border border-gray-200 px-3"
                // onChange={() => setFilterValue(event)}
              >
                {filterByType.map((filterBy, i) => {
                  return (
                    <option key={i} value={filterBy?.value}>
                      {filterBy?.name}
                    </option>
                  )
                })}
              </select> */}
          <Dropdown
            sortByDetails={sortByDetails}
            setSortBy={setSortBy}
            sortBy={sortBy}
          />
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 bg-white">
          {data?.sections?.length}
        </span>
      </div>

      {/* list */}
      {data.sections?.map((el: any) => {
        return (
          <SectionCard
            key={el.id}
            section={el}
            selectedSectionId={selectedSection}
            setSelectedSectionId={setSelectedSection}
          />
        )
      })}
      {data.sections.length === 0 && (
        <div className="flex justify-center p-7">No Record Found</div>
      )}
    </div>
  )
}

export default Sections
