import { useSubmit } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Test } from '~/interface/Interface'
import BreadCrumb from '../BreadCrumb'
import SortFilter from '../SortFilter'
import TestTable from './TestTable'

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
    {
      tabName: 'Test',
      route: '',
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

  return (
    <div className="flex h-full flex-col gap-6 overflow-hidden">
      {/* header */}
      <BreadCrumb data={breadCrumbData} />
      <header className="flex items-center justify-between">
        <h2 title="Tests" className="text-3xl font-bold text-black">
          Tests
        </h2>
        <Link to={'/tests/add-test'}>
          <button
            id="addTest"
            className="h-9 rounded-lg bg-primary px-5 text-xs text-[#F0FDF4]"
          >
            + Add Test
          </button>
        </Link>
      </header>
      <div className="flex">
        <SortFilter
          filterData={filterByType}
          sortDirection={sortDirection}
          onSortDirectionChange={onSortDirectionChange}
          sortBy={sortBy}
          onSortChange={onSortChange}
          totalItems={tests?.length}
        />
      </div>

      <div>
        <div className="flex items-center rounded-md border-[1px] border-b-0 border-solid border-[#E5E7EB] bg-[#f3f4f6] px-2 py-3 font-semibold ">
          <div className=" w-16 pl-2">
            <input type="checkbox"></input>
          </div>
          <div className="w-1/12 text-sm leading-4 text-gray-500">Order</div>
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
          className=" flex  flex-1 flex-col  overflow-auto rounded-md border-[1px] border-solid border-[#E5E7EB] bg-white  "
        >
          {tests.map((test, i) => (
            <TestTable
              key={i}
              id={test?.id}
              uniqueId={i}
              testName={test?.name}
              createdAt={test?.createdAt}
              createdBy={test?.createdBy?.firstName}
              description={test?.description}
              sections={test?.sections}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TestList
