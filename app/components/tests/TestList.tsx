import { useSubmit } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Test } from '~/interface/Interface'
import BreadCrumb from '../BreadCrumb'
import SortFilter from '../SortFilter'
import TestTableItem from './TestTableItem'

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

  const breadCrumbData = [
    {
      tabName: 'Tests',
      route: '/tests',
    },
  ]
  const submit = useSubmit()
  useEffect(() => {
    var filter = {
      orderBy: {
        [sortBy]: sortDirection,
      },
    }
    submit({ data: JSON.stringify(filter) }, { method: 'get' })
  }, [sortDirection, sortBy, submit])
  const showCheckBox = false
  return (
    <div className="flex h-full flex-col gap-6 pb-8">
      {/* header */}
      <BreadCrumb data={breadCrumbData} />
      <header className="flex items-center justify-between">
        <h2 title="Tests" className="text-3xl font-bold text-black">
          Tests
        </h2>
        <Link to={'/tests/add-test'}>
          <button
            id="addTest"
            className="h-9 rounded-lg bg-primary px-5 text-xs text-white"
          >
            + Add Test
          </button>
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

      <div className="flex max-h-83 flex-col rounded-lg shadow-table ">
        <div className="rounded-b-0 flex items-center rounded-t-md border border-b-0 border-solid border-borderColor bg-tableHeader px-9 py-3 font-semibold ">
          {showCheckBox && (
            <div className=" w-1/12 pl-2.5">
              <input type="checkbox"></input>
            </div>
          )}
          <div className="w-1/12 pl-2.5 text-sm leading-5 text-gray-500">
            S No.
          </div>
          <div className="w-4/12 pl-3 text-sm leading-5 text-gray-500">
            Test
          </div>
          <div className="w-2/12 text-sm leading-5 text-gray-500">Sections</div>
          <div className="w-2/12 text-sm leading-5 text-gray-500">
            Created on
          </div>
          <div className="w-3/12 text-sm leading-5 text-gray-500">
            Created By
          </div>
          <div className="flex w-1/12 justify-end pr-4 text-sm leading-5 text-gray-500">
            Actions
          </div>
        </div>
        <div
          id="testList"
          className=" rounded-t-0 flex flex-1 flex-col overflow-auto rounded-md border-t-0 border-solid border-borderColor  "
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
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TestList
