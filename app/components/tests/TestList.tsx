import { useSubmit } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Test } from '~/interface/Interface'
import BreadCrumb from '../BreadCrumb'
import SortFilter from '../SortFilter'
import TestCard from './TestCard'

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
      <BreadCrumb data={breadCrumbData} />

      <SortFilter
        filterData={filterByType}
        sortDirection={sortDirection}
        onSortDirectionChange={onSortDirectionChange}
        sortBy={sortBy}
        onSortChange={onSortChange}
        totalItems={tests?.length}
      />

      <div className="flex flex-col gap-6 overflow-auto" id="testList">
        {tests.map((test, i) => {
          return (
            <TestCard
              key={test.id}
              id={test.id}
              name={test.name}
              createdBy={`${test?.createdBy?.firstName} ${test?.createdBy?.lastName}`}
              createdAt={test.createdAt}
              description={test.description}
            />
          )
        })}
      </div>
      {tests.length < 1 && (
        <div className="flex flex-col items-center justify-center gap-6 overflow-auto">
          No test found. Add your first test
        </div>
      )}
    </div>
  )
}

export default TestList
