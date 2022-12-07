import { useEffect, useState } from 'react'
import SortFilter from '../common-components/SortFilter'

import { useLoaderData, useSubmit } from '@remix-run/react'
import GroupByTestItems from './GroupByTestItems'
import type { CandidateTest, Test } from '~/interface/Interface'
import { sortByOrder } from '~/interface/Interface'
import { useTranslation } from 'react-i18next'

const GroupByTests = () => {
  const { t } = useTranslation()

  const [sortDirection, onSortDirectionChange] = useState(
    sortByOrder.desc as string
  )
  const sortByDetails = [
    {
      name: 'Name',
      value: 'name',
    },
    {
      name: 'Created Date',
      value: 'createdAt',
    },
  ]
  const [sortBy, onSortChange] = useState(sortByDetails[1].value)
  const candidateTestData = useLoaderData()
  const candidateTests = candidateTestData.candidateTest
  const candidateTestsArray = candidateTests.filter(
    (
      items: Test & {
        count?: number | undefined
        candidateTest?: CandidateTest
      }
    ) => {
      return items.candidateTest?.length !== 0 || items.deleted === false
    }
  )

  const submit = useSubmit()
  useEffect(() => {
    const filter = {
      orderBy: {
        [sortBy]: sortDirection,
      },
    }
    submit({ data: JSON.stringify(filter) }, { method: 'get' })
  }, [sortDirection, sortBy, submit])

  useEffect(() => {
    const heading = document.getElementById('heading')
    heading?.focus()
  }, [])
  return (
    <div className="flex flex-col gap-6 p-1" id="group-by-test-container">
      <h1
        tabIndex={0}
        id="heading"
        title={t('commonConstants.results')}
        role={t('commonConstants.results')}
        aria-label={t('commonConstants.results')}
        className="text-3xl font-bold text-gray-900"
      >
        {t('commonConstants.results')}
      </h1>
      {candidateTests.length ? (
        <div className="flex flex-col gap-6">
          <div id="sort-filter-container" className="w-48">
            <SortFilter
              filterData={sortByDetails}
              sortDirection={sortDirection}
              onSortDirectionChange={onSortDirectionChange}
              sortBy={sortBy}
              onSortChange={onSortChange}
              totalItems={candidateTestsArray.length}
              showSelected={false}
            />
          </div>

          <div className="rounded-lg shadow-base">
            <div className="col-span-full grid grid-cols-10 rounded-lg border border-solid border-gray-200 bg-white">
              <div className="col-span-full grid grid-cols-10 gap-3 bg-gray-100 py-4 px-12">
                <span className="col-span-1 text-sm font-semibold text-gray-500">
                  {t('commonConstants.srNo')}
                </span>
                <span className="col-span-3 text-sm font-semibold text-gray-500">
                  {t('testsConstants.assessment')}
                </span>
                <span className="col-span-2 text-sm font-semibold text-gray-500">
                  {t('commonConstants.total')}{' '}
                  {t('resultConstants.totalInvited')}
                </span>
                <span className="col-span-2 text-sm font-semibold text-gray-500">
                  {t('commonConstants.total')}{' '}
                  {t('resultConstants.totalAttended')}
                </span>
                <span className="col-span-1 text-sm font-semibold text-gray-500">
                  {t('resultConstants.status')}
                </span>
              </div>
              <div id="group-by-test-items" className="col-span-10 grid">
                {candidateTestsArray.map(
                  (
                    candidateTests: Test & {
                      count?: number | undefined
                      candidateTest?: CandidateTest
                    },
                    index: number
                  ) => (
                    <div
                      key={candidateTests.id}
                      className="GroupByTestRow col-span-10 grid"
                      id="group-by-items-container"
                      data-cy="group-by-items-container"
                    >
                      <GroupByTestItems
                        candidateName={candidateTests?.name}
                        candidateInvitedCount={
                          candidateTests?.candidateTest?.length as number
                        }
                        candidateAttendedCount={candidateTests?.count}
                        testDeletedStatus={candidateTests?.deleted}
                        index={index + 1}
                        id={candidateTests?.id}
                        currentWorkspaceId={
                          candidateTestData.currentWorkspaceId
                        }
                      />
                    </div>
                  )
                )}
                {candidateTests.length === 0 && (
                  <div className="flex items-center justify-center p-7">
                    <span>{t('resultConstants.noAssessmentAlert')}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-7 text-center">
          {t('sectionsConstants.noRecordFound')}
        </div>
      )}
    </div>
  )
}
export default GroupByTests
