import type { SetStateAction } from "react"
import { useEffect, useState } from "react"

import { useFetcher, useNavigate } from "@remix-run/react"
import { useTranslation } from "react-i18next"

import Pagination from "../common-components/Pagination"
import SortFilter from "../common-components/SortFilter"

import SelectSectionCard from "./SelectSectionCard"

import { routes } from "~/constants/route.constants"
import { sortByOrder } from "~/interface/Interface"
import type { TestSection, AddedSectionDetails } from "~/interface/Interface"

const SelectSections = ({
  sections,
  setSections,
  updateSectionsList,
  currentWorkspaceId,
  totalSectionsCount,
  allSelectedSections,
}: {
  sections: Array<TestSection>
  setSections: (e: AddedSectionDetails, index: number) => void
  updateSectionsList: (e: SetStateAction<Array<TestSection>>) => void
  currentWorkspaceId: string
  totalSectionsCount: number
  allSelectedSections: Array<TestSection>
}) => {
  const [sortDirection, onSortDirectionChange] = useState(
    sortByOrder.ascending as string
  )
  const [sortBy, onSortChange] = useState("createdAt")
  const [sectionsCurrentPage, setSectionsCurrentPage] = useState(1)
  const [sectionsPageSize, setSectionsPageSize] = useState(6)
  const [pseudoDivs, setPseudoDivs] = useState([1])

  const filterByType = [
    {
      name: "Name",
      value: "name",
    },
    {
      name: "Created Date",
      value: "createdAt",
    },
  ]

  const fetcher = useFetcher()
  const { t } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    if (window.innerWidth > 1842 && sections.length % 4 != 0) {
      sections.length % 4 == 1
        ? setPseudoDivs([1, 2, 3])
        : sections.length % 4 == 2
        ? setPseudoDivs([1, 2])
        : setPseudoDivs([1])
    } else if (window.innerWidth > 1441 && sections.length % 3 != 0) {
      sections.length % 3 == 1 ? setPseudoDivs([1, 2]) : setPseudoDivs([1])
    } else if (window.innerWidth > 1086 && sections.length % 2 != 0) {
      setPseudoDivs([1])
    } else {
      setPseudoDivs([])
    }
  }, [sections.length])

  useEffect(() => {
    fetcher.submit(
      {
        sortBy: sortBy,
        sortOrder: sortDirection,
        currentPage: sectionsCurrentPage.toString(),
        pageSize: sectionsPageSize.toString(),
      },
      {
        method: "get",
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortDirection, sortBy, sectionsCurrentPage, sectionsPageSize])

  useEffect(() => {
    const { data } = fetcher
    if (data) {
      // if there is nothing in selected Array then we are updating the section Array
      let sortedData = data.sections
      if (allSelectedSections.length > 0) {
        // if there is something in selected array then we are updating that section array here
        sortedData = data.sections.map((section: TestSection) => {
          const selected = allSelectedSections.find(
            (selected) => selected.id === section.id
          )
          return selected || section
        })
      }
      updateSectionsList(sortedData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher])

  return (
    <div className="flex w-full flex-1 flex-col gap-6 overflow-x-auto rounded-lg bg-white p-6 shadow">
      {sections.length > 0 ? (
        <div className="flex h-full flex-col gap-5">
          {/* filters */}
          <SortFilter
            filterData={filterByType}
            sortDirection={sortDirection}
            onSortDirectionChange={onSortDirectionChange}
            sortBy={sortBy}
            onSortChange={onSortChange}
            totalItems={totalSectionsCount}
            showSelected={false}
          />
          {/* Sections list */}
          <div className="flex h-full flex-wrap gap-6 overflow-x-auto">
            {sections.map(
              (section: TestSection & { count?: number }, index) => {
                return (
                  <SelectSectionCard
                    section={section}
                    updateSection={(e) => setSections(e, index)}
                    questionCount={section?.count}
                    key={section.id}
                  />
                )
              }
            )}
            {pseudoDivs.map((temp) => {
              return (
                <div
                  key={temp}
                  className="h-1 min-w-sectionCard flex-1 border border-transparent px-5 py-6"
                ></div>
              )
            })}
          </div>
          <Pagination
            currentPage={sectionsCurrentPage}
            pageSizeOptions={[6, 12, 18, 24]}
            onPageChange={(page) => setSectionsCurrentPage?.(page)}
            pageSize={sectionsPageSize}
            setPageSize={setSectionsPageSize}
            totalItems={totalSectionsCount}
          />
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <span
            onClick={() => navigate(`/${currentWorkspaceId}${routes.tests}`)}
            role={"button"}
            onKeyDown={(e) => {
              if (e.key === "Enter")
                navigate(`/${currentWorkspaceId}${routes.tests}`)
            }}
            tabIndex={0}
            className="text-primary underline"
          >
            {t("sectionsConstants.addTestFirst")}
          </span>
        </div>
      )}
    </div>
  )
}

export default SelectSections
