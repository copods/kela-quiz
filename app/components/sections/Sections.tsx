import SectionCard from './SectionCard'
import type { Section, User } from '~/interface/Interface'
import { useResolvedPath, useLocation, useNavigate } from '@remix-run/react'
import {} from '@remix-run/react'
import SortFilter from '../SortFilter'

const SectionLink = ({
  section,
  actionStatusData,
  err,
  filter,
  setSelectedSection,
}: {
  section: Section & { _count?: { questions: number }; createdBy?: User }
  actionStatusData?: string
  err?: string
  filter: string
  setSelectedSection: (e: string) => void
}) => {
  const path = `/sections/${section.id}`
  const location = useLocation() // to get current location
  const resolvedPath = useResolvedPath(path) // to get resolved path which would match with current location
  let navigate = useNavigate();
  return (
    <div
      onClick={() =>{ setSelectedSection(section.id); navigate(path)}}
      role={'button'}
      tabIndex={0}
      key={section.id}
      onKeyUp={(e) => {
        if (e.key === 'Tab' && e.altKey)
          window.location.href = '#section-search'
        // alt + Tab combination key for moving focus to section detail
      }}
    >
      <SectionCard
        isActive={location.pathname === resolvedPath.pathname}
        name={section?.name}
        createdBy={`${section?.createdBy?.firstName} ${section?.createdBy?.lastName}`}
        questionsCount={section?._count?.questions as number}
        createdAt={section.createdAt}
        id={section?.id}
        actionStatusData={actionStatusData}
        err={err}
      />
    </div>
  )
}
type SectionType = {
  sections: Section[]
  sortBy: string
  selectedSection: string
  filters: string
  setSortBy: (e: string) => void
  order: string
  err?: string
  actionStatusData?: string
  setOrder: (e: string) => void
  setSelectedSection: (e: string) => void
  sortByDetails: Array<{ name: string; value: string }>
}
const Sections = ({
  sections,
  sortBy,
  filters,
  setSortBy,
  order,
  setOrder,
  setSelectedSection,
  sortByDetails,
  err,
  actionStatusData,
}: SectionType) => {
  return (
    <div className="sectionLSWrapper flex h-full w-96 flex-col gap-6">
      {/* filters */}
      <div className="flex items-center justify-between p-1">
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
        className="section-cards flex flex-1 flex-col gap-6 overflow-auto p-1"
        id="section-cards"
      >
        {sections?.map((section: Section) => (
          <SectionLink
            key={section.id}
            section={section}
            filter={filters}
            setSelectedSection={setSelectedSection}
            actionStatusData={actionStatusData}
            err={err}
          />
        ))}
      </div>
    </div>
  )
}

export default Sections
