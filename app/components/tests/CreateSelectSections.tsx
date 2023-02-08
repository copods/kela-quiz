import type { SetStateAction } from 'react'
import { useEffect, useState } from 'react'
import { sortByOrder } from '~/interface/Interface'
import type { TestSection } from '~/interface/Interface'
import SortFilter from '../common-components/SortFilter'
import SelectSectionCard from './SelectSectionCard'
import { useTranslation } from 'react-i18next'
import { useFetcher, useNavigate } from '@remix-run/react'
import { routes } from '~/constants/route.constants'

const SelectSections = ({
  sections,
  setSections,
  updateSectionsList,
  currentWorkspaceId,
}: {
  sections: Array<TestSection>
  setSections: <T>(e: T, i: number) => void
  updateSectionsList: (e: SetStateAction<Array<TestSection>>) => void
  currentWorkspaceId: string
}) => {
  const [sortDirection, onSortDirectionChange] = useState(
    sortByOrder.ascending as string
  )
  const [sortBy, onSortChange] = useState('name')
  const [pseudoDivs, setPseudoDivs] = useState([1])
  const filterByType = [
    {
      name: 'Name',
      value: 'name',
    },
    {
      name: 'Created Date',
      value: 'createdAt',
    },
  ]
  const [sectionData, setSectionData] = useState(sections)

  const fetcher: any = useFetcher()
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
      },
      {
        method: 'get',
      }
    )
  }, [sortDirection, sortBy])

  useEffect(() => {
    if (fetcher.data) {
      setSectionData(fetcher.data.sections)
    }
  }, [fetcher.data])

  return (
    <div className="flex w-full flex-1 flex-col gap-6 overflow-x-auto rounded-lg bg-white p-6 shadow">
      {sections.length > 0 ? (
        <div className="flex flex-col gap-6 overflow-x-auto">
          {/* filters */}
          <SortFilter
            filterData={filterByType}
            sortDirection={sortDirection}
            onSortDirectionChange={onSortDirectionChange}
            sortBy={sortBy}
            onSortChange={onSortChange}
            totalItems={sections?.length}
            showSelected={false}
          />
          {/* Sections list */}
          <div className="flex flex-wrap gap-6">
            {sectionData.map((section: TestSection & { count?: number }, i) => {
              return (
                <SelectSectionCard
                  section={section}
                  updateSection={(e) => setSections(e, i)}
                  questionCount={section?.count}
                  key={section.id}
                />
              )
            })}
            {pseudoDivs.map((temp) => {
              return (
                <div
                  key={temp}
                  className="h-1 min-w-sectionCard flex-1 border border-transparent px-5 py-6"
                ></div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <span
            onClick={() => navigate(`/${currentWorkspaceId}${routes.tests}`)}
            role={'button'}
            onKeyDown={(e) => {
              if (e.key === 'Enter')
                navigate(`/${currentWorkspaceId}${routes.tests}`)
            }}
            tabIndex={0}
            className="text-primary underline"
          >
            {t('sectionsConstants.addTestFirst')}
          </span>
        </div>
      )}
    </div>
  )
}

export default SelectSections
