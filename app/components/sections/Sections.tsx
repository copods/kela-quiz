import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import SectionCard from './SectionCard'
import Dropdown from '../form/Dropdown'
import type { Section } from '@prisma/client'
import { NavLink } from '@remix-run/react'
import DropdownField from '../form/Dropdown'

type SectionType = {
  sections: Section[]
  sortBy: string
  selectedSection: string
  filters: string
  setSortBy: (e: string) => void
  order: string
  setOrder: Function
  sortByDetails: Array<{ name: string; id: string }>
}
const Sections = ({
  sections,
  selectedSection,
  sortBy,
  setSortBy,
  order,
  setOrder,
  filters,
  sortByDetails,
}: SectionType) => {
  // const [selectedSection, setSelectedSection] = useState(selectedSectionId)
  return (
    <div className="flex w-96 flex-col gap-6 ">
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
          {/* <Dropdown
            sortByDetails={sortByDetails}
            setSortBy={setSortBy}
            sortBy={sortBy}
          /> */}
          <DropdownField
            data={sortByDetails}
            displayKey={'name'}
            valueKey={'id'}
            value={sortBy}
            setValue={setSortBy}
          />
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 bg-white">
          {sections?.length}
        </span>
      </div>

      {/* list */}
      <div className="flex flex-col gap-6 overflow-auto" id="section-cards">
        {/* list */}
        {sections?.map((section: any) => {
          return (
            <NavLink
              to={'/sections/' + section.id + filters}
              key={section.id}
              className={({ isActive }) =>
                isActive ? 'activeSection' : 'inactiveSection'
              }
            >
              <SectionCard
                name={section?.name}
                createdBy={`${section?.createdBy?.firstName} ${section?.createdBy?.lastName}`}
                questionsCount={section?._count?.questions}
                createdAt={section.createdAt}
              />
            </NavLink>
          )
        })}
        {sections.length === 0 && (
          <div className="flex justify-center p-7">No Record Found</div>
        )}
      </div>
    </div>
  )
}

export default Sections
