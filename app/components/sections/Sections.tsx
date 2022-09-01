import SectionCard from './SectionCard'
import type { Section, User } from '~/interface/Interface'
import { useResolvedPath, useLocation, NavLink } from '@remix-run/react'
import {} from '@remix-run/react'
import SortFilter from '../SortFilter'
import { sectionsConstants } from '~/constants/common.constants'

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
  const setSectionId = (id: string) => {
    setSelectedSection(id)
  }
  return (
    <NavLink
      onClick={() => setSectionId(section.id)}
      to={path}
      key={section.id}
      onKeyUp={(e) => {
        if (e.key === 'Tab' && e.altKey) window.location.href = '#sectionSearch'
        // alt + Tab combination key for moving focus to section detail
      }}
    >
      <SectionCard
        isActive={location.pathname === resolvedPath.pathname}
        name={section?.name}
        createdBy={`${section?.createdBy?.firstName} ${section?.createdBy?.lastName}`}
        questionsCount={section?._count?.questions}
        createdAt={section.createdAt}
        id={section?.id}
        actionStatusData={actionStatusData}
        err={err}
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
        className="section-cards flex flex-1 flex-col gap-6 overflow-auto"
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
