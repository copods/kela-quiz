import { useEffect, useState } from 'react'
import SortFilter from '../common-components/SortFilter'

import { Link, useLoaderData, useNavigate, useSubmit } from '@remix-run/react'
import type { CandidateTest, Test } from '~/interface/Interface'
import { sortByOrder } from '~/interface/Interface'
import { useTranslation } from 'react-i18next'
import EmptyStateComponent from '../common-components/EmptyStateComponent'
import Table from '../common-components/TableComponent'
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
const filterByStatus = [
  {
    name: 'All',
    value: 'all',
  },
  {
    name: 'Active',
    value: 'active',
  },
  {
    name: 'Inactive',
    value: 'inactive',
  },
]
const GroupByTests = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const candidateTestData = useLoaderData()
  const [sortDirection, onSortDirectionChange] = useState(
    sortByOrder.desc as string
  )
  const [resultsPageSize, setResultsPageSize] = useState(
    candidateTestData.resultsItemsPerPage
  )
  const [resultsCurrentPage, setResultsCurrentPage] = useState(
    candidateTestData.resultsCurrentPage
  )
  const [sortBy, onSortChange] = useState(sortByDetails[1].value)
  const [statusFilter, setStatusFilter] = useState(filterByStatus[0].value)

  const candidateTests = candidateTestData.candidateTest
  const candidateTestsArray = candidateTests.filter(
    (
      items: Test & {
        count?: number | undefined
        candidateTest?: CandidateTest
      }
    ) => {
      return items.candidateTest?.length !== 0 || items.deleted === false
    }
  )

  const submit = useSubmit()
  useEffect(() => {
    const filter = {
      orderBy: {
        [sortBy]: sortDirection,
      },
    }
    submit({ data: JSON.stringify(filter) }, { method: 'get' })
  }, [sortDirection, sortBy, submit])

  useEffect(() => {
    const heading = document.getElementById('heading')
    heading?.focus()
  }, [])

  const SrNoDataCell = (data: Test, index: number) => {
    return <span>{index + 1}</span>
  }
  const AssessmentDataCell = (data: Test) => {
    return (
      <Link
        tabIndex={0}
        to={`/${candidateTestData.currentWorkspaceId}/results/groupByTests/${data.id}`}
        id="group-by-item-test"
        data-cy="group-by-item-test"
        className="groupByItemTest text-base font-semibold text-primary"
      >
        {data.name}
      </Link>
    )
  }
  const TotalInvitedDataCell = (
    data: Test & { _count: { candidateTest: number } }
  ) => {
    return <span>{data._count.candidateTest}</span>
  }
  const TotalAttendedDataCell = (
    data: Test & { _count: { candidateResult: number } }
  ) => {
    return <span>{data._count.candidateResult}</span>
  }
  const StatusDataCell = (data: Test) => {
    return (
      <div
        className={`${
          data.deleted ? 'text-yellow-500' : 'text-green-500'
        } col-span-1 text-base`}
      >
        {data.deleted
          ? t('resultConstants.inactive')
          : t('resultConstants.active')}
      </div>
    )
  }
  const otherFilters = [
    {
      id: '1',
      data: filterByStatus,
      displayKey: 'name',
      valueKey: 'value',
      value: statusFilter,
      setValue: setStatusFilter,
    },
  ]

  const resultsColumn = [
    { title: 'Sr.No', field: 'sr_no', render: SrNoDataCell, width: '12%' },
    {
      title: 'Assessment',
      field: 'name',
      render: AssessmentDataCell,
      width: '28%',
    },
    { title: 'Total Invited', field: 'role', render: TotalInvitedDataCell },
    {
      title: 'Total Attended',
      field: 'createdAt',
      render: TotalAttendedDataCell,
    },
    { title: 'Status', field: 'action', render: StatusDataCell },
  ]
  useEffect(() => {
    navigate(
      `?ResultPage=${resultsCurrentPage}&ResultItems=${resultsPageSize}&filterByStatus=${statusFilter}`
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultsPageSize, resultsCurrentPage, statusFilter])
  return (
    <div
      className="flex h-full flex-col gap-6 p-1"
      id="group-by-test-container"
    >
      <h1
        tabIndex={0}
        id="heading"
        title={t('commonConstants.results')}
        role={t('commonConstants.results')}
        aria-label={t('commonConstants.results')}
        className="text-3xl font-bold text-gray-900"
      >
        {t('commonConstants.results')}
      </h1>
      {candidateTests.length ? (
        <div className="flex flex-col gap-6">
          <div id="sort-filter-container" className="w-48">
            <SortFilter
              filterData={sortByDetails}
              sortDirection={sortDirection}
              onSortDirectionChange={onSortDirectionChange}
              sortBy={sortBy}
              onSortChange={onSortChange}
              totalItems={candidateTestsArray.length}
              showSelected={false}
              otherFilters={otherFilters}
            />
          </div>
          <Table
            columns={resultsColumn}
            data={candidateTestData.candidateTest}
            paginationEnabled={true}
            pageSize={resultsPageSize}
            setPageSize={setResultsPageSize}
            currentPage={resultsCurrentPage}
            onPageChange={setResultsCurrentPage}
            totalItems={candidateTestData.testCount}
          />
          {/* <div className="rounded-lg shadow-base">
            <div className="col-span-full grid grid-cols-10 rounded-lg border border-solid border-gray-200 bg-white">
              <div className="col-span-full grid grid-cols-10 gap-3 bg-gray-100 py-4 px-12">
                <span className="col-span-1 text-sm font-semibold text-gray-500">
                  {t('commonConstants.srNo')}
                </span>
                <span className="col-span-3 text-sm font-semibold text-gray-500">
                  {t('testsConstants.assessment')}
                </span>
                <span className="col-span-2 text-sm font-semibold text-gray-500">
                  {t('commonConstants.total')}{' '}
                  {t('resultConstants.totalInvited')}
                </span>
                <span className="col-span-2 text-sm font-semibold text-gray-500">
                  {t('commonConstants.total')}{' '}
                  {t('resultConstants.totalAttended')}
                </span>
                <span className="col-span-1 text-sm font-semibold text-gray-500">
                  {t('resultConstants.status')}
                </span>
              </div>
              <div id="group-by-test-items" className="col-span-10 grid">
                {candidateTestsArray.map(
                  (
                    candidateTests: Test & {
                      count?: number | undefined
                      candidateTest?: CandidateTest
                    },
                    index: number
                  ) => (
                    <div
                      key={candidateTests.id}
                      className="GroupByTestRow col-span-10 grid"
                      id="group-by-items-container"
                      data-cy="group-by-items-container"
                    >
                      <GroupByTestItems
                        candidateName={candidateTests?.name}
                        candidateInvitedCount={
                          candidateTests?.candidateTest?.length as number
                        }
                        candidateAttendedCount={candidateTests?.count}
                        testDeletedStatus={candidateTests?.deleted}
                        index={index + 1}
                        id={candidateTests?.id}
                        currentWorkspaceId={
                          candidateTestData.currentWorkspaceId
                        }
                      />
                    </div>
                  )
                )}
                {candidateTests.length === 0 && (
                  <div className="flex items-center justify-center p-7">
                    <span>{t('resultConstants.noAssessmentAlert')}</span>
                  </div>
                )}
              </div>
            </div>
          </div> */}
        </div>
      ) : (
        <EmptyStateComponent />
      )}
    </div>
  )
}
export default GroupByTests
