import { useEffect, useState } from 'react'
import SortFilter from '../SortFilter'
import {
  resultConstants,
  commonConstants,
  sectionsConstants,
} from '~/constants/common.constants'

import { useLoaderData, useSubmit } from '@remix-run/react'
import GroupByTestItems from './GroupByTestItems'
import type { CandidateTest, Test } from '~/interface/Interface'
import { sortByOrder } from '~/interface/Interface'

const GroupByTests = () => {
  const [sortDirection, onSortDirectionChange] = useState(
    sortByOrder.ascending as string
  )
  const [sortBy, onSortChange] = useState('name')
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
  const candidateTestData = useLoaderData()
  const candidateTests = candidateTestData.candidateTest

  const submit = useSubmit()
  useEffect(() => {
    const filter = {
      orderBy: {
        [sortBy]: sortDirection,
      },
    }
    submit({ data: JSON.stringify(filter) }, { method: 'get' })
  }, [sortDirection, sortBy, submit])
  return (
    <div className="flex flex-col gap-6 p-1" id="group-by-test-container">
      <h1
        tabIndex={0}
        title={commonConstants.results}
        role={commonConstants.results}
        aria-label={commonConstants.results}
        className="text-3xl font-bold text-gray-900"
      >
        {commonConstants.results}
      </h1>
      {candidateTests.length ? (
        <div className="flex flex-col gap-6">
          <div id="sort-filter-container" className="w-48">
            <SortFilter
              filterData={filterByType}
              sortDirection={sortDirection}
              onSortDirectionChange={onSortDirectionChange}
              sortBy={sortBy}
              onSortChange={onSortChange}
              totalItems={candidateTests?.length}
              showSelected={false}
            />
          </div>

          <div className="rounded-lg shadow-base">
            <div className="col-span-full grid grid-cols-10 rounded-lg border border-solid border-gray-200 bg-white">
              <div className="col-span-full grid grid-cols-10 gap-3 bg-gray-100 py-4 px-12">
                <span className="col-span-1 text-sm font-semibold text-gray-500">
                  {resultConstants.srNo}
                </span>
                <span className="col-span-3 text-sm font-semibold text-gray-500">
                  {resultConstants.test}
                </span>
                <span className="col-span-2 text-sm font-semibold text-gray-500">
                  {commonConstants.total} {resultConstants.totalInvited}
                </span>
                <span className="col-span-2 text-sm font-semibold text-gray-500">
                  {commonConstants.total} {resultConstants.totalAttended}
                </span>
                <span className="col-span-1 text-sm font-semibold text-gray-500">
                  {resultConstants.status}
                </span>
              </div>
              <div id="group-by-test-items" className="col-span-10 grid">
                {candidateTests.map(
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
                      />
                    </div>
                  )
                )}
                {candidateTests.length === 0 && (
                  <div className="flex items-center justify-center p-7">
                    <span>{resultConstants.noTestAlert}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-7 text-center">{sectionsConstants.noRecordFound}</div>
      )}
    </div>
  )
}
export default GroupByTests
