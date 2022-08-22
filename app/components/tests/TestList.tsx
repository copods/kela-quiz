import { useSubmit } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Test } from '~/interface/Interface'
import SortFilter from '../SortFilter'
import TestTableItem from './TestTableItem'
import { commonConstants, testsConstants } from '~/constants/common.constants'
const TestList = ({ tests }: { tests: Array<Test> }) => {
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

  const submit = useSubmit()
  useEffect(() => {
    let filter = {
      orderBy: {
        [sortBy]: sortDirection,
      },
    }
    submit({ data: JSON.stringify(filter) }, { method: 'get' })
  }, [sortDirection, sortBy, submit])
  const showCheckBox = true
  return (
    <div className="flex h-full flex-col gap-6 pb-8">
      {/* header */}
      {/* <BreadCrumb data={breadCrumbData} /> */}
      <header className="flex items-center justify-between">
        <h2 title="Tests" className="text-3xl font-bold text-black">
          {testsConstants.Tests}
        </h2>
        <Link
          to={'/tests/add-test'}
          id="addTest"
          className="flex h-9 items-center rounded-lg bg-primary px-5 text-xs text-white"
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

      <div className="flex h-5/6 flex-col shadow-table">
        <div className="rounded-b-0 flex items-center rounded-t-md border border-b-0 border-solid border-borderColor bg-tableHeader px-9 py-3 font-semibold ">
          {showCheckBox && (
            <div className=" w-1/12 pl-2.5">
              <input type="checkbox"></input>
            </div>
          )}
          <div className="w-1/12 text-sm leading-5 text-gray-500">
            {testsConstants.srNoText}
          </div>
          <div className="w-3/12 text-sm leading-5 text-gray-500">
            {testsConstants.testListColumnLable}
          </div>
          <div className="w-2/12 text-sm leading-5 text-gray-500">
            {testsConstants.sectionText}
          </div>
          <div className="w-2/12 text-sm leading-5 text-gray-500">
            {testsConstants.createdOn}
          </div>
          <div className="w-2/12 text-sm leading-5 text-gray-500">
            {testsConstants.created} {commonConstants.byText}
          </div>
          <div className="flex w-1/12 justify-end text-sm leading-5 text-gray-500">
            {testsConstants.actionsText}
          </div>
        </div>
        <div
          id="testList"
          className=" rounded-t-0 flex flex-1 flex-col overflow-auto rounded-md border-t-0 border-solid border-borderColor bg-white px-9"
        >
          {tests.map((test, i) => (
            <TestTableItem
              key={i}
              id={test?.id}
              index={i + 1}
              testName={test?.name}
              createdAt={test?.createdAt}
              createdBy={`${test?.createdBy?.firstName} ${test?.createdBy?.lastName}`}
              description={test?.description}
              sections={test?.sections}
              showCheckBox={showCheckBox}
            />
          ))}

          {tests.length < 1 && (
            <div className="flex h-full flex-col items-center justify-center gap-6 overflow-auto">
              No test found. Add your first test
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TestList
