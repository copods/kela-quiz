import { useSubmit } from "@remix-run/react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import BreadCrumb from "../BreadCrumb"
import type { Test } from "../Interface"
import SortFilter from "../SortFilter"
import TestCard from "./TestCard"

const TestList = ({ tests }: { tests: Array<Test> }) => {

  const [sortDirection, onSortDirectionChange] = useState('asc')
  const [sortBy, onSortChange] = useState('name')

  const filterByType = [
    {
      name: 'Name',
      value: 'name'
    },
    {
      name: 'Created Date',
      value: 'createdAt'
    }
  ]

  const breadCrumbData = [
    {
      tabName: 'Test',
      route: '/tests'
    },
    {
      tabName: 'test',
      route: ''
    }
  ]
  const submit = useSubmit()
  useEffect(() => {
    var filter = {
      orderBy: {
        [sortBy]: sortDirection,
      },
    }
    console.log('filter', filter)
    submit({ data: JSON.stringify(filter) }, { method: "get" })
  }, [sortDirection, sortBy, submit])

  return (
    <div className="flex flex-col gap-6 h-full overflow-hidden">
      {/* header */}
      <header className="flex justify-between items-center">
        <h2 title="Tests" className="text-3xl font-bold text-black">Tests</h2>
        <Link to={'/tests/add-test'}>
          <button id="addTest" className="px-5 h-9 text-[#F0FDF4] bg-primary rounded-lg text-xs" >+ Add Test</button>
        </Link>
      </header>
      <BreadCrumb data={breadCrumbData} />

      <SortFilter filterData={filterByType} sortDirection={sortDirection} onSortDirectionChange={onSortDirectionChange} sortBy={sortBy} onSortChange={onSortChange} totalItems={tests?.length} />

      <div className="flex flex-col gap-6 overflow-auto" id="testList">
        {
          tests.map((test, i) => {
            return (
              <TestCard key={test.id} name={test.name} createdBy={`${test?.createdBy?.firstName} ${test?.createdBy?.lastName}`} createdAt={test.createdAt} description={test.description} />
            )
          })
        }
      </div>
    </div>
  )
}

export default TestList