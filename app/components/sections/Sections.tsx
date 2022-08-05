import { Icon } from '@iconify/react'
import SectionCard from './SectionCard'
import DropdownField from '../form/Dropdown'
import type { Section } from '~/interface/Interface'
import { useResolvedPath, useLocation, NavLink } from '@remix-run/react'
import {} from '@remix-run/react'
import { sectionsFolder } from '~/constants/common.constants'
const SectionLink = ({ section }: { section: any }) => {
  const path = `/sections/${section.id}`
  const location = useLocation() // to get current location
  const resolvedPath = useResolvedPath(path) // to get resolved path which would match with current location
  return (
    <NavLink to={path} key={section.id}>
      <SectionCard
        isActive={location.pathname === resolvedPath.pathname}
        name={section?.name}
        createdBy={`${section?.createdBy?.firstName} ${section?.createdBy?.lastName}`}
        questionsCount={section?._count?.questions}
        createdAt={section.createdAt}
      />
    </NavLink>
  )
}

type SectionType = {
  sections: Section[]
  sortBy: string
  selectedSection: string
  filters: string
  setSortBy: (e: string) => void
  order: string
  setOrder: Function
  setSelectedSection: Function
  sortByDetails: Array<{ name: string; id: string }>
}
const Sections = ({
  sections,
  sortBy,
  setSortBy,
  order,
  setOrder,
  filters,
  setSelectedSection,
  sortByDetails,
}: SectionType) => {
  return (
    <div className="flex h-full w-96 flex-col gap-6">
      {/* filters */}
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-2.5">
          {order === 'asc' ? (
            <Icon
              icon="ph:sort-descending-bold"
              onClick={() => setOrder('desc')}
              className="icon-desc cursor-pointer text-2xl"
            />
          ) : (
            <Icon
              icon="ph:sort-ascending-bold"
              onClick={() => setOrder('asc')}
              className="icon-asc cursor-pointer text-2xl"
            />
          )}
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
      <div
        className="flex flex-1 flex-col gap-6 overflow-auto"
        id="section-cards"
      >
        {sections?.map((section: any) => (
          <SectionLink key={section.id} section={section} />
        ))}
        {sections.length === 0 && (
          <div className="flex justify-center p-7">
            {sectionsFolder.noRecordFound}
          </div>
        )}
      </div>
    </div>
  )
}

export default Sections
