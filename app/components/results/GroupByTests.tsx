import { useEffect, useState } from 'react'
import SortFilter from '../common-components/SortFilter'

import { Link, useLoaderData, useNavigate, useLocation } from '@remix-run/react'
import type {
  CandidateTest,
  tableColumnType,
  OtherFilters,
  Test,
} from '~/interface/Interface'
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
  const [statusFilter, setStatusFilter] = useState(filterByStatus[1].value)

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
  const otherFilters: OtherFilters[] = [
    {
      id: 'filterByStatus',
      data: filterByStatus,
      displayKey: 'name',
      valueKey: 'value',
      value: statusFilter,
      setValue: setStatusFilter,
    },
  ]

  const resultsColumn: tableColumnType[] = [
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
  const location = useLocation()
  useEffect(() => {
    navigate(
      `?sortBy=${sortBy}&sort=${sortDirection}&page=${resultsCurrentPage}&limit=${resultsPageSize}&status=${statusFilter}`
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    resultsPageSize,
    resultsCurrentPage,
    statusFilter,
    sortBy,
    sortDirection,
    location.search,
  ])

  useEffect(() => {
    navigate(
      `?sortBy=${sortBy}&sort=${sortDirection}&page=${1}&limit=${resultsPageSize}&status=${statusFilter}`
    )
    setStatusFilter(statusFilter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter])

  useEffect(() => {
    setResultsCurrentPage(candidateTestData.resultsCurrentPage)
  }, [candidateTestData.resultsCurrentPage])

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
      {candidateTestData.totalTestCount ? (
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
            paginationEnabled={candidateTests.length > 0 ? true : false}
            pageSize={resultsPageSize}
            setPageSize={setResultsPageSize}
            currentPage={resultsCurrentPage}
            onPageChange={setResultsCurrentPage}
            totalItems={candidateTestData.testCount}
          />
        </div>
      ) : (
        <EmptyStateComponent />
      )}
    </div>
  )
}
export default GroupByTests
