import { useSubmit } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Test } from '~/interface/Interface'
import { sortByOrder } from '~/interface/Interface'
import SortFilter from '../common-components/SortFilter'
import TestTableItem from './TestTableItem'
import Button from '../common-components/Button'
import { routes } from '~/constants/route.constants'
import { useTranslation } from 'react-i18next'
import Pagination from '../common-components/pagination/Pagination'
// import Checkbox from '../form/CheckBox'
const TestList = ({
  tests,
  status,
  currentWorkspaceId,
}: {
  tests: Array<Test>
  status: string | undefined
  currentWorkspaceId: string
}) => {
  const { t } = useTranslation()

  const [sortDirection, onSortDirectionChange] = useState(
    sortByOrder.desc as string
  )
  const navigate = useNavigate()
  const sortByDetails = [
    {
      name: 'Name',
      value: 'name',
    },
    {
      name: 'Created Date',
      value: 'createdAt',
    },
  ]
  const [sortBy, onSortChange] = useState(sortByDetails[1].value)
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
  }, [sortDirection, sortBy, submit])
  const showCheckBox = false
  useEffect(() => {
    const heading = document.getElementById('assessments-page-title')
    heading?.focus()
  }, [])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(3)
  return (
    <div className="test-list-container flex h-full flex-col gap-6 p-1">
      {/* header */}
      {/* <BreadCrumb data={breadCrumbData} /> */}
      <header className="flex items-center justify-between">
        <h2
          id="assessments-page-title"
          tabIndex={0}
          role={t('testsConstants.assessments')}
          title={t('testsConstants.assessments')}
          className="text-3xl font-bold text-black"
        >
          {t('testsConstants.assessments')}
        </h2>
        <Button
          className="px-5"
          onClick={() =>
            navigate(`/${currentWorkspaceId}${routes.addAssessment}`)
          }
          id="add-test"
          tabIndex={0}
          varient="primary-solid"
          title={t('testsConstants.addTestbutton')}
          aria-label={t('testsConstants.addTestbutton')}
          buttonText={`+ ${t('testsConstants.addTestbutton')}`}
        />
      </header>
      {tests.length > 0 ? (
        <>
          <div id="sort-filter-container">
            <SortFilter
              filterData={sortByDetails}
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
              <div
                id="assessments-table-sr-no"
                className="w-1/12 text-sm text-gray-500"
              >
                {t('commonConstants.srNo')}
              </div>
              <div
                id="assessments-table-assessment"
                className="w-4/12 text-sm text-gray-500"
              >
                {t('testsConstants.assessment')}
              </div>
              <div
                id="assessments-table-test"
                className="w-3/12 text-sm text-gray-500"
              >
                {t('testsConstants.testText')}
              </div>
              <div
                id="assessments-table-created-on"
                className="w-2/12 text-sm text-gray-500"
              >
                {t('testsConstants.createdOn')}
              </div>
              <div
                id="assessments-table-created-by"
                className="w-2/12 text-sm text-gray-500"
              >
                {t('testsConstants.created')} {t('commonConstants.byText')}
              </div>
              <div
                id="assessments-table-actions"
                className="flex w-1/12 text-sm text-gray-500"
              >
                {t('testsConstants.actionsText')}
              </div>
            </div>
            <div
              id="test-list"
              className="rounded-t-0 flex flex-col rounded-md border-solid border-gray-200 shadow-base"
            >
              {tests?.map((test, i) => (
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
                  currentWorkspaceId={currentWorkspaceId}
                />
              ))}
              <Pagination
                onPageChange={(page) => setCurrentPage(page)}
                currentPage={currentPage}
                totalItems={tests.length}
                pageSizeOptions={[1, 3, 4, 5]}
                pageSize={pageSize}
                setPageSize={setPageSize}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="p-7 text-center">
          {t('testsConstants.noAssessmentFound')}
        </div>
      )}
    </div>
  )
}
export default TestList
