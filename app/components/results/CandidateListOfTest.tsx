import { useEffect, useState } from "react"

import moment from "moment"

import { Icon } from "@iconify/react"
import {
  Link,
  useActionData,
  useFetcher,
  useNavigate,
  useSubmit,
} from "@remix-run/react"
import { useLoaderData } from "@remix-run/react"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"

import ListActionMenu from "../../components/ListActionMenu"
import DropdownField from "../common-components/Dropdown"
import Table from "../common-components/TableComponent"

import resendTestLink from "~/../public/assets/resend-test-invitation.svg"
import { routes } from "~/constants/route.constants"
import { useCommonContext } from "~/context/Common.context"
import type {
  CandidateTest,
  Candidate,
  CandidateResult,
  tableColumnType,
} from "~/interface/Interface"
const filterByStatus = [
  {
    name: "All",
    value: "all",
  },
  {
    name: "Pending",
    value: "pending",
  },
  {
    name: "Completed",
    value: "complete",
  },
]

const CandidateListOfTest = () => {
  const { candidatesOfTest, currentWorkspaceId } = useLoaderData()
  const candidatesLoaderData = useLoaderData()
  const { setCustomStorage, getStoredValue } = useCommonContext()
  const { t } = useTranslation()
  let navigate = useNavigate()
  const submit = useSubmit()
  const fetcher = useFetcher()
  const actionData = useActionData()
  const loaderData = useLoaderData()
  const [menuListOpen, setmenuListOpen] = useState<boolean>(false)
  const [searchText, setSearchText] = useState("")
  const [statusFilter, setStatusFilter] = useState(
    getStoredValue("candidateListFilter")
      ? getStoredValue("candidateListFilter")?.value
      : filterByStatus[0].value
  )
  let [filteredData, setFilteredData] = useState(candidatesOfTest.candidateTest)
  const [pageSize, setPageSize] = useState(5)
  const [currentPage, setCurrentPage] = useState(
    candidatesLoaderData.currentPage
  )
  const [candidateCounts, setCandidateCounts] = useState(
    candidatesLoaderData.candidatesCount
  )

  useEffect(() => {
    setFilteredData(candidatesOfTest.candidateTest)
  }, [candidatesOfTest.candidateTest])

  useEffect(() => {
    fetcher.submit(
      {
        searchText: searchText,
        filterByStatus: statusFilter,
      },
      {
        method: "get",
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, statusFilter])

  useEffect(() => {
    if (fetcher.data) {
      setFilteredData(fetcher.data.candidatesOfTest.candidateTest)
      setCandidateCounts(fetcher.data.candidatesCount)
    }
  }, [fetcher.data, searchText])

  useEffect(() => {
    navigate(`?page=${1}&pageSize=${pageSize}&filterByStatus=${statusFilter}`, {
      replace: true,
    })
    setStatusFilter(statusFilter)
    setCustomStorage("candidateListFilter", statusFilter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter])

  useEffect(() => {
    navigate(
      `?page=${currentPage}&pageSize=${pageSize}&filterByStatus=${statusFilter}`,
      { replace: true }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, currentPage])

  useEffect(() => {
    setCurrentPage(candidatesLoaderData.currentPage)
  }, [candidatesLoaderData.currentPage])

  const resendInvite = (id: string, candidateId: string, testId: string) => {
    submit(
      {
        action: "resendInvite",
        id: id,
        candidateId: candidateId,
        testId: testId,
      },
      { method: "post" }
    )
  }

  useEffect(() => {
    if (
      actionData?.candidateInviteStatus ===
      t("candidateExamConstants.candidateTestCreated")
    ) {
      toast.success(t("testsConstants.reinvited"))
    } else if (
      actionData?.candidateInviteStatus === t("candidateExamConstants.endTest")
    ) {
      toast.error(t("testsConstants.testEnded"))
    } else if (
      actionData?.candidateInviteStatus === t("commonConstants.onGoing")
    ) {
      toast.error(t("testsConstants.ongoingTest"))
    }
  }, [actionData, t])

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link).then(
      () => toast.success(t("testsConstants.copyLink")),
      (error) => toast.error(`${t("testConstants.copyLinkFailed")}${error}`)
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
    const candidateName =
      data.candidate.firstName + " " + data.candidate.lastName
    return (
      <span data-cy="candidateName">
        {data.candidate.firstName &&
        data.candidate.lastName &&
        data.startedAt ? (
          <Link
            to={`/${currentWorkspaceId}/results/groupByTests/${data?.testId}/${data?.candidateId}`}
            className="col-span-2 flex  truncate font-semibold text-primary"
            title={candidateName}
          >
            {candidateName}
          </Link>
        ) : data.candidate.firstName &&
          data.candidate.lastName &&
          !data.startedAt ? (
          <span>{candidateName}</span>
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
          data.createdAt ? moment(data.createdAt).format("DD MMMM YY") : "-"
        }
      >
        {data.createdAt ? moment(data.createdAt).format("DD MMMM YY") : "-"}
      </span>
    )
  }
  const StartedAtCell = (data: CandidateResult) => {
    return (
      <span>
        {data.startedAt ? moment(data.startedAt).format("DD MMMM YY") : "-"}
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
    return <span>{getPercent() ?? "NA"}</span>
  }
  const StatusCell = (
    data: { candidateResult: CandidateResult[] } & CandidateResult
  ) => {
    const menuItemsDetailsList = [
      {
        show: loaderData.permission.invite_candidate.update,
        id: "resend-invite",
        menuListText: t("resultConstants.resendInvite"),
        menuListLink: resendTestLink,
        menuLinkAltTagLine: t("resultConstants.resendAssessmentInvite"),
        handleItemAction: () =>
          resendInvite(data.id, data.candidateId, data.testId),
      },
      {
        show: true,
        id: "copy-link",
        menuListText: t("resultConstants.copyLink"),
        menuListIcon: "material-symbols:content-copy-outline",
        handleItemAction: () => copyLink(data.link as string),
      },
    ]
    return (
      <div id="status-cell" className="flex items-center">
        <div
          tabIndex={0}
          role={"banner"}
          className="flex items-center justify-between"
        >
          {data.startedAt === null ? (
            <span className="rounded-full bg-yellow-200 px-2 py-1 text-xs">
              {t("commonConstants.pending")}
            </span>
          ) : data.startedAt != null && data.endAt === null ? (
            <span className="rounded-full bg-blue-50 px-2 py-1 text-xs">
              {t("commonConstants.onGoing")}
            </span>
          ) : (
            data.endAt != null && (
              <span className="rounded-full bg-green-200 px-2 py-1 text-xs">
                {t("commonConstants.completed")}
              </span>
            )
          )}
          {data?.candidateResult.length <= 0 && (
            <ListActionMenu
              menuIcon={"mdi:dots-vertical"}
              onItemClick={setmenuListOpen}
              open={menuListOpen}
              aria-label={t("testTableItem.menu")}
              id={data.id}
              menuDetails={menuItemsDetailsList.filter((list) => list.show)}
              customClasses={{
                item: "text-primary text-xs w-36 shadow-sm",
              }}
            />
          )}
        </div>
      </div>
    )
  }
  const column: tableColumnType[] = [
    { title: "Sr.No", field: "sr_no", render: SeriaLNoCell },
    { title: "Name", field: "name", render: NameDataCell, width: "15%" },
    { title: "Email", field: "email", render: EmailDataCell, width: "20%" },
    {
      title: "Invited At",
      field: "invitedAt",
      render: InvitedAtCell,
      width: "15%",
    },
    {
      title: "Started At",
      field: "invitedAt",
      render: StartedAtCell,
      width: "15%",
    },
    {
      title: "Invited By",
      field: "invitedBy",
      render: InvitedByCell,
      width: "10%",
    },
    { title: "Result", field: "Result", render: ResultCell },
    { title: "Status", field: "status", render: StatusCell, width: "10%" },
  ]

  return (
    <div id="test-details" className="flex h-full flex-col gap-4 ">
      <header className="border-b border-solid border-slate-300">
        <div className="flex gap-2 pb-6">
          <div
            onClick={() =>
              navigate(`/${currentWorkspaceId}${routes.resultGroupTest}`)
            }
            role={"button"}
            tabIndex={0}
            className="flex items-center gap-4 "
            onKeyDown={(e) => {
              if (e.key === "Enter")
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
          placeholder={t("testsConstants.searchCandidate")}
          title={t("testsConstants.searchCandidate")}
          className="h-11 w-48 rounded-lg border px-5 pl-8 text-sm shadow-sm focus:outline-dotted"
          onChange={(e) => {
            setSearchText(e.target.value)
          }}
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
        totalItems={candidateCounts}
      />
    </div>
  )
}

export default CandidateListOfTest
