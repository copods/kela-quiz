import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import SectionCard from './SectionCard'
import Dropdown from '../form/Dropdown'
import type { Section } from '@prisma/client'

type SectionType = {
  sections: Section[]
  selectedSectionId: string
  sortBy: {
    name: string
    id: string
  }
  selectedSection: string
  setSelectedSection: (e: string) => void
  filters: string
  setSortBy: (e: { name: string; id: string }) => void
  order: string
  setOrder: Function
  sortByDetails: Array<{ name: string; id: string }>
}
const Sections = ({
  sections,
  selectedSectionId,
  setSelectedSection,
  selectedSection,
  sortBy,
  setSortBy,
  order,
  setOrder,
  filters,
  sortByDetails,
}: SectionType) => {

  // const [selectedSection, setSelectedSection] = useState(selectedSectionId)
  useEffect(() => {
    setSelectedSection(selectedSectionId)
  }, [selectedSectionId])
  return (
    <div className="flex w-96 flex-col gap-6 overflow-auto">
      {/* filters */}
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-2.5">
          {order === 'desc' ? (
            <Icon
              icon="ph:sort-ascending-bold"
              onClick={() => setOrder('asc')}
              className="cursor-pointer text-2xl"
            />
          ) : (
            <Icon
              icon="ph:sort-descending-bold"
              onClick={() => setOrder('desc')}
              className="cursor-pointer text-2xl"
            />
          )}
          <Dropdown
            sortByDetails={sortByDetails}
            setSortBy={setSortBy}
            sortBy={sortBy}
          />
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 bg-white">
          {sections?.length}
        </span>
      </div>

      {/* list */}
      {sections?.map((el: any) => {
        return (
          <SectionCard
            key={el.id}
            section={el}
            filters={filters}
            selectedSectionId={selectedSection}
            setSelectedSectionId={setSelectedSection}
          />
        )
      })}
      {sections.length === 0 && (
        <div className="flex justify-center p-7">No Record Found</div>
      )}
    </div>
  )
}

export default Sections
