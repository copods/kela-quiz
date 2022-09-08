import { useSubmit } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Test } from '~/interface/Interface'
import SortFilter from '../SortFilter'
import TestTableItem from './TestTableItem'
import { commonConstants, testsConstants } from '~/constants/common.constants'
import Button from '../form/Button'
import { routes } from '~/constants/route.constants'
// import Checkbox from '../form/CheckBox'
const TestList = ({
  tests,
  status,
}: {
  tests: Array<Test>
  status: string | undefined
}) => {
  const [sortDirection, onSortDirectionChange] = useState('asc')
  const [sortBy, onSortChange] = useState('name')
  const navigate = useNavigate()
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
    <div className="test-list-container flex h-full flex-col gap-6">
      {/* header */}
      {/* <BreadCrumb data={breadCrumbData} /> */}
      <header className="flex items-center justify-between">
        <h2
          tabIndex={0}
          role={testsConstants.tests}
          title={testsConstants.tests}
          className="text-3xl font-bold text-black"
        >
          {testsConstants.tests}
        </h2>
        <Button
          className="px-5"
          onClick={() => navigate(routes.addTest)}
          id="add-test"
          tabIndex={0}
          varient="primary-solid"
          title={testsConstants.addTestbutton}
          aria-label={testsConstants.addTestbutton}
          buttonText={`+ ${testsConstants.addTestbutton}`}
        />
      </header>
      {tests.length ? (
        <>
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
          <div className="flex flex-1 flex-col rounded-lg pb-6">
            <div className="rounded-b-0 flex items-center gap-3 rounded-t-md border-solid border-gray-200 bg-gray-100 px-9 py-3 font-semibold shadow-base">
              {showCheckBox && (
                <div className="w-1/12">
                  <input type="checkbox" />
                </div>
              )}
              <div className="w-1/12 text-sm text-gray-500">
                {testsConstants.srNoText}
              </div>
              <div className="w-4/12 text-sm text-gray-500">
                {testsConstants.testListColumnLabel}
              </div>
              <div className="w-3/12 text-sm text-gray-500">
                {testsConstants.sectionText}
              </div>
              <div className="w-2/12 text-sm text-gray-500">
                {testsConstants.createdOn}
              </div>
              <div className="w-2/12 text-sm text-gray-500">
                {testsConstants.created} {commonConstants.byText}
              </div>
              <div className="flex w-1/12 text-sm text-gray-500">
                {testsConstants.actionsText}
              </div>
            </div>
            <div
              id="test-list"
              className="rounded-t-0 flex flex-col rounded-md border-solid border-gray-200 shadow-base"
            >
              {tests.map((test, i) => (
                <TestTableItem
                  key={test?.id}
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
        </>
      ) : (
        <div className="p-7 text-center">{testsConstants.noTestFound}</div>
      )}
    </div>
  )
}
export default TestList
