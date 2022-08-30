import { useSubmit } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Test } from '~/interface/Interface'
import SortFilter from '../SortFilter'
import TestTableItem from './TestTableItem'
import { commonConstants, sortByOrder, testsConstants } from '~/constants/common.constants'
import { routes } from '~/constants/route.constants'
const TestList = ({
  tests,
  status,
}: {
  tests: Array<Test>
  status: string | undefined
}) => {
  const [sortDirection, onSortDirectionChange] = useState(sortByOrder.ascending as string)
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
  const submit = useSubmit()
  useEffect(() => {
    let filter = {
      orderBy: {
        [sortBy]: sortDirection,
      },
    }
    submit({ data: JSON.stringify(filter) }, { method: 'get' })
    return () => {
      if (filter) {
        filter = {
          orderBy: {},
        }
      }
    }
  }, [sortDirection, sortBy])

  const showCheckBox = false
  return (
    <div className="test-list-container flex h-full flex-col gap-6 ">
      {/* header */}
      {/* <BreadCrumb data={breadCrumbData} /> */}
      <header className="flex items-center justify-between">
        <h2
          tabIndex={0}
          role={testsConstants.Tests}
          title="Tests"
          className="text-3xl font-bold text-black"
        >
          {testsConstants.Tests}
        </h2>
        <Link
          to={routes.addTest}
          id="add-test"
          tabIndex={0}
          className="flex h-9 items-center rounded-lg bg-primary px-5 text-xs text-white"
          title={testsConstants.addTestbutton}
          aria-label={testsConstants.addTestbutton}
        >
          + {testsConstants.addTestbutton}
        </Link>
      </header>
      <div id="sort-filter-container">
        <SortFilter
          filterData={filterByType}
          sortDirection={sortDirection}
          onSortDirectionChange={onSortDirectionChange}
          sortBy={sortBy}
          onSortChange={onSortChange}
          totalItems={tests?.length}
          showSelected={false}
        />
      </div>
      {tests?.length !== 0 ? (
        <div className="flex flex-1 flex-col rounded-lg pb-6 ">
          <div className="rounded-b-0 flex items-center rounded-t-md border border-b-0 border-solid border-borderColor bg-tableHeader px-9 py-3 font-semibold shadow-table">
            {showCheckBox && (
              <div className="w-1/12">
                <input type="checkbox" />
              </div>
            )}
            <div className="w-1/12 text-sm leading-5 text-gray-500">
              {testsConstants.srNoText}
            </div>
            <div className="w-4/12 text-sm leading-5 text-gray-500">
              {testsConstants.testListColumnLabel}
            </div>
            <div className="w-3/12 text-sm leading-5 text-gray-500">
              {testsConstants.sectionText}
            </div>
            <div className="w-2/12 text-sm leading-5 text-gray-500">
              {testsConstants.createdOn}
            </div>
            <div className="w-2/12 text-sm leading-5 text-gray-500">
              {testsConstants.created} {commonConstants.byText}
            </div>
            <div className="flex w-1/12 text-sm leading-5 text-gray-500">
              {testsConstants.actionsText}
            </div>
          </div>
          <div
            id="test-list"
            className="rounded-t-0 flex flex-col rounded-md border-t-0 border-solid border-borderColor shadow-table"
          >
            {tests.map((test, i) => (
              <TestTableItem
                key={i}
                id={test?.id}
                index={i + 1}
                totalCount={tests.length}
                testName={test?.name}
                createdAt={test?.createdAt}
                createdBy={`${test?.createdBy?.firstName} ${test?.createdBy?.lastName}`}
                sections={test?.sections}
                showCheckBox={showCheckBox}
                status={status}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>{testsConstants.noTestFound}</div>
      )}
    </div>
  )
}

export default TestList
