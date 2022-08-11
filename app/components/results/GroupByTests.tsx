import { useEffect, useState } from 'react'
import SortFilter from '../SortFilter'
import { resultConstants, commonConstants } from '~/constants/common.constants'
import { useLoaderData, useSubmit } from '@remix-run/react'
import GroupByTestItems from './GroupByTestItems'
import type { CandidateTest, Test } from '~/interface/Interface'
const GroupByTests = () => {
  const [sortDirection, onSortDirectionChange] = useState('asc')
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
    var filter = {
      orderBy: {
        [sortBy]: sortDirection,
      },
    }
    submit({ data: JSON.stringify(filter) }, { method: 'get' })
  }, [sortDirection, sortBy, submit])
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-gray-900 ">Group by tests</h1>
      <div className="flex flex-col gap-10">
        <div id="sort-filter-container">
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
        <div className="grid grid-cols-12  bg-[#F9FAFB] ">
          <div className="col-span-full grid grid-cols-10 rounded-lg border-[1px] border-solid border-[#E5E7EB] bg-white">
            <div className="col-span-full grid grid-cols-10 py-4 px-12">
              <span className="col-span-2 text-sm  font-semibold  text-gray-500">
                {resultConstants.order}
              </span>
              <span className="col-span-3 text-sm  font-semibold  text-gray-500">
                {resultConstants.test}
              </span>
              <span className="col-span-2 text-sm  font-semibold  text-gray-500">
                {commonConstants.total} {resultConstants.totalInvited}
              </span>
              <span className="col-span-2 text-sm  font-semibold  text-gray-500">
                {commonConstants.total} {resultConstants.totalAttended}
              </span>
            </div>
            {candidateTests.map(
              (
                candidateTests: Test & { candidateTest?: CandidateTest },
                i: number
              ) => (
                <div
                  key={candidateTestData.id}
                  className="memberRow col-span-10 grid"
                >
                  <GroupByTestItems candidateTests={candidateTests} index={i} />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default GroupByTests
