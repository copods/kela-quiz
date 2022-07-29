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
  const showCheckBox = true
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
            className="h-9 rounded-lg bg-primary px-5 text-xs text-whiteShadeOne"
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
          showSelected={true}
        />
      </div>

      <div className="flex h-5/6 flex-col ">
        <div className="flex items-center rounded-md border border-b-0 border-solid border-borderColor bg-tableHeader px-2 py-3 font-semibold ">
          {showCheckBox && (
            <div className=" w-1/12 pl-2">
              <input type="checkbox"></input>
            </div>
          )}
          <div className="w-1/12 text-sm leading-4 text-gray-500">S No.</div>
          <div className="w-3/12 text-sm leading-4 text-gray-500">Test</div>
          <div className="w-2/12 text-sm leading-4 text-gray-500">Sections</div>
          <div className="w-2/12 text-sm leading-4 text-gray-500">
            Created on
          </div>
          <div className="w-2/12 text-sm leading-4 text-gray-500">
            Created By
          </div>
          <div className="w-1/12 text-sm leading-4 text-gray-500">Actions</div>
        </div>
        <div
          id="testList"
          className=" flex flex-1 flex-col overflow-auto rounded-md border border-solid border-borderColor bg-white"
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
        </div>
      </div>
    </div>
  )
}

export default TestList
