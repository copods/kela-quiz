import SectionCard from './SectionCard'
import type { Section } from '~/interface/Interface'
import { useResolvedPath, useLocation, NavLink } from '@remix-run/react'
import {} from '@remix-run/react'
import SortFilter from '../SortFilter'

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
  setOrder: (e: string) => void
  setSelectedSection: Function
  sortByDetails: Array<{ name: string; value: string }>
}
const Sections = ({
  sections,
  sortBy,
  setSortBy,
  order,
  setOrder,
  sortByDetails,
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
          <SectionLink key={section.id} section={section} />
        ))}
        {sections.length === 0 && (
          <div className="flex justify-center p-7">No Record Found</div>
        )}
      </div>
    </div>
  )
}

export default Sections
