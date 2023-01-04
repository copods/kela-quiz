import { Link, useActionData, useNavigate, useSubmit } from '@remix-run/react'
import { Icon } from '@iconify/react'
import { useLoaderData } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { routes } from '~/constants/route.constants'
import Table from '../common-components/TableComponent'
import moment from 'moment'
import TestListActionMenu from '../../components/TestListActionMenu'
import DropdownField from '../common-components/Dropdown'
import type {
  CandidateTest,
  Candidate,
  CandidateResult,
} from '~/interface/Interface'
import { toast } from 'react-toastify'
const filterByStatus = [
  {
    name: 'All',
    value: 'all',
  },
  {
    name: 'Pending',
    value: 'pending',
  },
  {
    name: 'Completed',
    value: 'complete',
  },
]

const CandidateListOfTest = () => {
  const { candidatesOfTest, currentWorkspaceId } = useLoaderData()
  const candidatesLoaderData = useLoaderData()
  const { t } = useTranslation()
  let navigate = useNavigate()
  const submit = useSubmit()
  const actionData = useActionData()
  const [menuListOpen, setmenuListOpen] = useState<boolean>(false)
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState(filterByStatus[0].value)

  const filteredData =
    candidatesLoaderData.candidatesOfTest.candidateTest?.filter(
      (candidate: {
        candidate: { firstName: string; lastName: string; email: string }
      }) => {
        return `${candidate?.candidate?.firstName} ${candidate?.candidate?.lastName} ${candidate?.candidate?.email}`
          .toLowerCase()
          .includes(searchText.toLowerCase())
      }
    )
  const [pageSize, setPageSize] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const resendInvite = (id: string, candidateId: string, testId: string) => {
    submit(
      {
        action: 'resendInvite',
        id: id,
        candidateId: candidateId,
        testId: testId,
      },
      { method: 'post' }
    )
  }

  const SeriaLNoCell = (data: { [key: string]: string }, index: number) => {
    return <span>{index + 1}</span>
  }
  const NameDataCell = (
    data: CandidateTest & { candidate: Candidate } & {
      candidateResult: CandidateResult[]
    }
  ) => {
    return (
      <span>
        {data.candidate.firstName && data.candidate.lastName && data.startedAt ? (
          <Link
            to={`/${currentWorkspaceId}/results/groupByTests/${data?.testId}/${data?.candidateId}`}
            className="col-span-2 flex  truncate font-semibold text-primary"
            title={data.candidate.firstName + ' ' + data.candidate.lastName}
          >
            {data.candidate.firstName + ' ' + data.candidate.lastName}
          </Link>
        ) : (
          <i>--No Name--</i>
        )}
      </span>
    )
  }
  const EmailDataCell = (data: { candidate: Candidate }) => {
    return <span title={data.candidate.email}>{data.candidate.email}</span>
  }
  const InvitedAtCell = (data: CandidateResult) => {
    return (
      <span
        title={
          data.createdAt ? moment(data.createdAt).format('DD MMMM YY') : '-'
        }
      >
        {data.createdAt ? moment(data.createdAt).format('DD MMMM YY') : '-'}
      </span>
    )
  }
  const StartedAtCell = (data: CandidateResult) => {
    return (
      <span>
        {data.startedAt ? moment(data.startedAt).format('DD MMMM YY') : '-'}
      </span>
    )
  }
  const InvitedByCell = (data: {
    candidate: { createdBy: { firstName: string } }
  }) => {
    return <span>{data.candidate.createdBy.firstName}</span>
  }
  const ResultCell = (data: { candidateResult: CandidateResult[] }) => {
    function getPercent() {
      let result = 0
      for (let i of data.candidateResult) {
        result = (i.correctQuestion / i.totalQuestion) * 100
        return `${parseInt(result.toFixed(2))}%`
      }
    }
    return <span>{getPercent() ?? 'NA'}</span>
  }
  const StatusCell = (
    data: { candidateResult: CandidateResult[] } & CandidateResult
  ) => {
    return (
      <div className="absolute flex items-center">
        <span
          className={`rounded-full px-2 py-1 text-xs text-gray-900 ${
            data?.candidateResult.length > 0 ? 'bg-green-200' : 'bg-yellow-200'
          }`}
        >
          {data?.candidateResult.length > 0
            ? t('commonConstants.completed')
            : t('commonConstants.pending')}
        </span>
        {data?.candidateResult.length > 0 ? (
          ''
        ) : (
          <TestListActionMenu
            menuIcon={'mdi:dots-vertical'}
            onItemClick={setmenuListOpen}
            open={menuListOpen}
            menuListText={t('resultConstants.resendInvite')}
            aria-label={t('testTableItem.menu')}
            id={data.id}
            resendInvite={() =>
              resendInvite(data.id, data.candidateId, data.testId)
            }
          />
        )}
      </div>
    )
  }
  const column = [
    { title: 'Sr.No', field: 'sr_no', render: SeriaLNoCell },
    { title: 'Name', field: 'name', render: NameDataCell, width: '15%' },
    { title: 'Email', field: 'email', render: EmailDataCell, width: '20%' },
    {
      title: 'Invited At',
      field: 'invitedAt',
      render: InvitedAtCell,
      width: '15%',
    },
    {
      title: 'Started At',
      field: 'invitedAt',
      render: StartedAtCell,
      width: '15%',
    },
    {
      title: 'Invited By',
      field: 'invitedBy',
      render: InvitedByCell,
      width: '10%',
    },
    { title: 'Result', field: 'Result', render: ResultCell },
    { title: 'Status', field: 'status', render: StatusCell, width: '10%' },
  ]

  useEffect(() => {
    navigate(
      `?page=${currentPage}&pageSize=${pageSize}&filterByStatus=${statusFilter}`
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, currentPage, statusFilter])

  useEffect(() => {
    if (
      actionData?.candidateInviteStatus ===
      t('candidateExamConstants.candidateTestCreated')
    ) {
      toast.success(t('testsConstants.reinvited'))
    }
    if (
      actionData?.candidateInviteStatus === t('candidateExamConstants.endTest')
    ) {
      toast.error(t('testsConstants.testEnded'))
    }
  }, [actionData, t])
  return (
    <div id="test-details" className="flex h-full flex-col gap-4 ">
      <header className="border-b border-solid border-slate-300">
        <div className="flex gap-2 pb-6">
          <div
            onClick={() =>
              navigate(`/${currentWorkspaceId}${routes.resultGroupTest}`)
            }
            role={'button'}
            tabIndex={0}
            className="flex items-center gap-4 "
            onKeyDown={(e) => {
              if (e.key === 'Enter')
                navigate(`/${currentWorkspaceId}${routes.resultGroupTest}`)
            }}
          >
            <Icon
              className="text-3xl font-semibold text-gray-900"
              id="back-button"
              icon="mdi:arrow-left"
            />
          </div>
          <span className="text-3xl font-semibold text-gray-900" id="title">
            {candidatesOfTest?.name}
          </span>
        </div>
      </header>
      <div className="relative flex items-center gap-4">
        <Icon
          id="ascend"
          icon="charm:search"
          className="bg-light-200 absolute left-3 text-base text-gray-500"
        />
        <input
          tabIndex={0}
          id="section-search"
          type="text"
          name="search"
          placeholder={t('testsConstants.searchCandidate')}
          title={t('testsConstants.searchCandidate')}
          className="h-11 w-48 rounded-lg border px-5 pl-8 text-sm shadow-sm focus:outline-dotted"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="w-36">
          <DropdownField
            data={filterByStatus}
            displayKey="name"
            valueKey="value"
            value={statusFilter}
            setValue={setStatusFilter}
          />
        </div>
      </div>
      <Table
        columns={column}
        data={filteredData}
        paginationEnabled={true}
        pageSize={pageSize}
        setPageSize={setPageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalItems={candidatesLoaderData.candidatesCount}
      />
    </div>
  )
}

export default CandidateListOfTest
