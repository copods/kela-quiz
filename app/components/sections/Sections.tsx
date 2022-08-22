import SectionCard from './SectionCard'
import type { Section } from '~/interface/Interface'
import { useResolvedPath, useLocation, NavLink } from '@remix-run/react'
import {} from '@remix-run/react'
import SortFilter from '../SortFilter'
import { sectionsConstants } from '~/constants/common.constants'

const SectionLink = ({ section, filter, setSelectedSection }: { section: any, filter: string, setSelectedSection:(e:string) => void }) => {
  const path = `/sections/${section.id}`
  const location = useLocation() // to get current location
  const resolvedPath = useResolvedPath(path) // to get resolved path which would match with current location

  const getSectionId = (id:string) => {
      setSelectedSection(id);
  }

  return (
    <NavLink 
       onClick={()=> getSectionId(section.id)}
       to={path}
       key={section.id}>
      <SectionCard
        isActive={location.pathname === resolvedPath.pathname}
        name={section?.name}
        createdBy={`${section?.createdBy?.firstName} ${section?.createdBy?.lastName}`}
        questionsCount={section?._count?.questions as number}
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
  setOrder: (e: string) => void
  setSelectedSection: (e: string) => void,
  sortByDetails: Array<{ name: string; value: string }>
}
const Sections = ({
  sections,
  sortBy,
  filters,
  setSortBy,
  order,
  setOrder,
  sortByDetails,
  setSelectedSection
}: SectionType) => {
  return (
    <div className="flex h-full w-96 flex-col gap-6">
      {/* filters */}
      <div className="flex items-center justify-between ">
        <div id="sort-filter-container">
          <SortFilter
            filterData={sortByDetails}
            sortDirection={order}
            onSortDirectionChange={setOrder}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalItems={sections?.length}
            showSelected={false}
          />
        </div>
      </div>

      {/* list */}
      <div
        className="flex flex-1 flex-col gap-6 overflow-auto"
        id="section-cards"
      >
        {sections?.map((section: any) => (
          <SectionLink 
              key={section.id}
              section={section}
              filter={filters}
              setSelectedSection={setSelectedSection} />
        ))}
        {sections.length === 0 && (
          <div className="flex justify-center p-7">
            {sectionsConstants.noRecordFound}
          </div>
        )}
      </div>
    </div>
  )
}

export default Sections
