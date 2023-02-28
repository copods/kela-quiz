import { useEffect, useState } from "react"

import { useResolvedPath, useLocation, useNavigate } from "@remix-run/react"

import Pagination from "../common-components/Pagination"
import SortFilter from "../common-components/SortFilter"

import SectionCard from "./SectionCard"

import { routes } from "~/constants/route.constants"
import { useCommonContext } from "~/context/Common.context"
import type { Question, Section, SectionInTest } from "~/interface/Interface"

const SectionLink = ({
  section,
  filter,
  currentWorkspaceId,
  sectionActionErrors,
  setSectionActionErrors,
  currentPageCount,
}: {
  section: Section & {
    count?: number
    questions?: Array<Question>
    sectionInTest: Array<SectionInTest>
  }
  filter: string
  currentWorkspaceId: string
  sectionActionErrors?: {
    title?: string
    decription?: string
    duplicateTitle?: string
  }
  setSectionActionErrors: ({
    title,
    description,
    duplicateTitle,
  }: {
    title?: string
    description?: string
    duplicateTitle?: string
  }) => void
  currentPageCount: number
}) => {
  const path = `/${currentWorkspaceId}${routes.tests}/${section.id}${filter}`
  const { clearStoredValue } = useCommonContext()
  const [isDelete, setIsDelete] = useState(false)
  const location = useLocation() // to get current location
  const resolvedPath = useResolvedPath(path) // to get resolved path which would match with current location
  const isActive = location.pathname === resolvedPath.pathname
  const navigate = useNavigate()
  const [deleted, setDeleted] = useState(false)
  useEffect(() => {
    if (deleted === true) {
      setTimeout(() => {
        const activeCard = document.querySelector(
          ".activeSectionCard"
        ) as HTMLElement
        activeCard?.focus()
        setDeleted(false)
      }, 500)
    }
  }, [deleted])

  return (
    <div
      onClick={() => {
        !isActive && navigate(path)
        clearStoredValue("activeTest")
      }}
      id="section-link"
      className={isActive ? "activeSectionCard" : ""}
      role={"button"}
      tabIndex={0}
      key={section.id}
      onKeyUp={(e) => {
        if (e.key === "Tab" && e.altKey) {
          window.location.href = "#section-search"
          // alt + Tab combination key for moving focus to section detail
        } else if (e.key === "Enter") navigate(path)
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
        setDeleted={setDeleted}
        setIsDelete={setIsDelete}
        isDelete={isDelete}
        sectionActionErrors={sectionActionErrors}
        setSectionActionErrors={setSectionActionErrors}
        currentPageCount={currentPageCount}
        filter={filter}
      />
    </div>
  )
}
type SectionType = {
  sections: Section[]
  sortBy: string
  filters: string
  setSortBy: (e: string) => void
  order: string
  setOrder: (e: string) => void
  sortByDetails: Array<{ name: string; value: string }>
  currentWorkspaceId: string
  sectionActionErrors?: {
    title?: string
    decription?: string
    duplicateTitle?: string
  }
  setSectionActionErrors: ({
    title,
    description,
    duplicateTitle,
  }: {
    title?: string
    description?: string
    duplicateTitle?: string
  }) => void
  totalCount: number
  testsPageSize: number
  testsCurrentPage: number
  setTestPageSize: (e: number) => void
  setTestsCurrentPage: (e: number) => void
}
const Sections = ({
  sections,
  sortBy,
  filters,
  setSortBy,
  order,
  setOrder,
  sortByDetails,
  currentWorkspaceId,
  sectionActionErrors,
  setSectionActionErrors,
  totalCount,
  testsPageSize,
  testsCurrentPage,
  setTestPageSize,
  setTestsCurrentPage,
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
            totalItems={totalCount}
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
            sectionActionErrors={sectionActionErrors}
            setSectionActionErrors={setSectionActionErrors}
            currentWorkspaceId={currentWorkspaceId}
            currentPageCount={sections?.length}
          />
        ))}
        <Pagination
          currentPage={testsCurrentPage!}
          onPageChange={(page) => setTestsCurrentPage?.(page)}
          pageSize={testsPageSize!}
          setPageSize={setTestPageSize!}
          totalItems={totalCount}
          hideRange={true}
        />
      </div>
    </div>
  )
}

export default Sections
