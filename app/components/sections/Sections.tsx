import SectionCard from './SectionCard'
import type { Question, Section } from '~/interface/Interface'
import { useResolvedPath, useLocation, useNavigate } from '@remix-run/react'
import {} from '@remix-run/react'
import SortFilter from '../common-components/SortFilter'
import { useEffect, useState } from 'react'
import { routes } from '~/constants/route.constants'
import type { sectionActionErrorsType } from '~/interface/Interface'

const SectionLink = ({
  section,
  actionStatusData,
  err,
  filter,
  setSelectedSection,
  currentWorkspaceId,
  sectionActionErrors,
  setSectionActionErrors,
}: {
  section: Section & {
    count?: number
    questions?: Array<Question>
  }
  actionStatusData?: string
  err?: string
  filter: string 
  currentWorkspaceId: string
  setSelectedSection: (e: string) => void
  sectionActionErrors?: sectionActionErrorsType
  setSectionActionErrors?: ({
    title,
    description,
  }: sectionActionErrorsType) => void
}) => {
  const path = `/${currentWorkspaceId}${routes.tests}/${section.id}${filter}`
  const [isDelete, setIsDelete] = useState(false)
  const location = useLocation() // to get current location
  const resolvedPath = useResolvedPath(path) // to get resolved path which would match with current location
  const isActive = location.pathname === resolvedPath.pathname
  let navigate = useNavigate()
  const [deleted, setDeleted] = useState(false)
  useEffect(() => {
    if (deleted === true) {
      setTimeout(() => {
        const activeCard = document.querySelector(
          '.activeSectionCard'
        ) as HTMLElement
        activeCard?.focus()
        setDeleted(false)
      }, 500)
    }
  }, [deleted])

  return (
    <div
      onClick={() => {
        setSelectedSection(section.id)
        if (isActive) {
          return
        }
        navigate(path)
      }}
      id="section-link"
      className={isActive ? 'activeSectionCard' : ''}
      role={'button'}
      tabIndex={0}
      key={section.id}
      onKeyUp={(e) => {
        if (e.key === 'Tab' && e.altKey) {
          window.location.href = '#section-search'
          // alt + Tab combination key for moving focus to section detail
        } else if (e.key === 'Enter') navigate(path)
        setSelectedSection(section.id)
      }}
    >
      <SectionCard
        isActive={isActive}
        name={section?.name}
        description={section?.description}
        createdBy={`${section?.createdBy?.firstName} ${section?.createdBy?.lastName}`}
        questionsCount={section?.count as number}
        createdAt={section.createdAt}
        id={section?.id}
        actionStatusData={actionStatusData}
        err={err}
        setDeleted={setDeleted}
        setIsDelete={setIsDelete}
        isDelete={isDelete}
        sectionActionErrors={sectionActionErrors}
        setSectionActionErrors={setSectionActionErrors}
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
  currentWorkspaceId: string
  sectionActionErrors?: sectionActionErrorsType
  setSectionActionErrors?: ({
    title,
    description,
  }: sectionActionErrorsType) => void
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
  currentWorkspaceId,
  sectionActionErrors,
  setSectionActionErrors,
}: SectionType) => {
  return (
    <div className="sectionLSWrapper flex h-full max-w-96 flex-col gap-6">
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
        className="section-cards flex flex-1 flex-col gap-5 overflow-auto p-1"
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
            sectionActionErrors={sectionActionErrors}
            setSectionActionErrors={setSectionActionErrors}
            currentWorkspaceId={currentWorkspaceId}
          />
        ))}
      </div>
    </div>
  )
}

export default Sections
