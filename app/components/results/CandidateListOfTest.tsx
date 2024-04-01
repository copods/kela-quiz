import { useEffect, useState } from "react"

import moment from "moment"

import { Icon } from "@iconify/react"
import {
  Link,
  useActionData,
  useFetcher,
  useNavigate,
  useLoaderData,
} from "@remix-run/react"
import debounce from "debounce"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"

import ListActionMenu from "../../components/ListActionMenu"
import DropdownField from "../common-components/Dropdown"
import RangeSlider from "../common-components/RangeSlider/RangeSlider"
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

const filterByPassFail = [
  {
    name: "All",
    value: "all",
  },
  {
    name: "Pass",
    value: "pass",
  },
  {
    name: "Fail",
    value: "fail",
  },
  {
    name: "Custom",
    value: "custom",
  },
]

const CandidateListOfTest = () => {
  const { candidatesOfTest, currentWorkspaceId, env } = useLoaderData()
  const candidatesLoaderData = useLoaderData()
  const { setCustomStorage, getStoredValue } = useCommonContext()
  const { t } = useTranslation()
  let navigate = useNavigate()
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
  const [passFailFilter, setPassFailFilter] = useState(
    getStoredValue("candidateListPassFailFilter")
      ? getStoredValue("candidateListPassFailFilter")?.value
      : filterByPassFail[0].value
  )
  let [filteredData, setFilteredData] = useState(candidatesOfTest.candidateTest)
  const [customFilter, setCustomFilter] = useState(
    getStoredValue("customFilter")
      ? getStoredValue("customFilter")?.value
      : [40, 80]
  )

  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(
    candidatesLoaderData.currentPage
  )
  const [candidateCounts, setCandidateCounts] = useState(
    candidatesLoaderData.candidatesCount
  )

  useEffect(() => {
    setFilteredData(candidatesOfTest.candidateTest)
  }, [candidatesOfTest.candidateTest])

  const fetchData = debounce(() => {
    fetcher.submit(
      {
        searchText: searchText,
        filterByStatus: statusFilter,
        filterByPassFail: passFailFilter,
        customFilter: customFilter.toString(),
      },
      {
        method: "get",
      }
    )
  }, 500)
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, statusFilter, passFailFilter, customFilter])

  useEffect(() => {
    const { candidateInviteStatus, candidatesOfTest, candidatesCount } =
      fetcher.data || {}

    if (
      candidateInviteStatus === t("candidateExamConstants.candidateTestCreated")
    ) {
      toast.success(t("testsConstants.reinvited"))
    }

    if (candidatesOfTest?.candidateTest) {
      setFilteredData(candidatesOfTest.candidateTest)
      setCandidateCounts(candidatesCount)
    }
  }, [fetcher.data, searchText, t])

  useEffect(() => {
    navigate(
      `?page=${1}&pageSize=${pageSize}&filterByStatus=${statusFilter}&filterByPassFail=${passFailFilter}&customFilter=${customFilter}`,
      {
        replace: true,
      }
    )
    setStatusFilter(statusFilter)
    setPassFailFilter(passFailFilter)
    setCustomStorage("candidateListFilter", statusFilter)
    setCustomStorage("candidateListPassFailFilter", passFailFilter)
    setCustomStorage("customFilter", customFilter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, passFailFilter])

  useEffect(() => {
    navigate(
      `?page=${currentPage}&pageSize=${pageSize}&filterByStatus=${statusFilter}&filterByPassFail=${passFailFilter}&customFilter=${customFilter}`,
      { replace: true }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, currentPage])

  useEffect(() => {
    setCurrentPage(candidatesLoaderData.currentPage)
  }, [candidatesLoaderData.currentPage])

  useEffect(() => {
    if (
      actionData?.candidateInviteStatus === t("candidateExamConstants.endTest")
    ) {
      toast.error(t("testsConstants.testEnded"))
    }
  }, [actionData, t])

  const updateCustomFilter = (e: any) => {
    setCustomFilter(e)
  }

  const resendInvite = (id: string, candidateId: string, testId: string) => {
    fetcher.submit(
      {
        action: "resendInvite",
        id: id,
        candidateId: candidateId,
        testId: testId,
      },
      { method: "post" }
    )
  }

  const copyLink = (id: string) => {
    const link = `${env.PUBLIC_URL}/assessment/${id}`
    navigator.clipboard.writeText(link).then(
      () => toast.success(t("testsConstants.copyLink")),
      (error) => toast.error(`${t("testConstants.copyLinkFailed")}${error}`)
    )
  }
  const SeriaLNoCell = (data: { [key: string]: string }, index: number) => {
    return <span>{(currentPage - 1) * pageSize + index + 1}</span>
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
          data.createdAt ? moment(data.createdAt).format("DD MMM YYYY") : "-"
        }
      >
        {data.createdAt ? moment(data.createdAt).format("DD MMM YYYY") : "-"}
      </span>
    )
  }

  const ResultCell = (
    data: {
      candidateResult: CandidateResult[]
      linkSentOn: string
    } & CandidateResult
  ) => {
    const now = moment(new Date())
    const LinkSendedTime = moment(data?.linkSentOn)
    const duration = now.diff(LinkSendedTime, "hours")
    let result = 0
    for (let i of data.candidateResult) {
      result = (i.correctQuestion / i.totalQuestion) * 100
    }
    const resUI = (
      <div className={` ${result >= 70 ? "text-green-600" : "text-red-600"}`}>
        {result >= 70 ? "Pass" : "Fail"}
        <span className="text-slate-400">&nbsp;•&nbsp;</span>
        <span className="text-xs text-slate-800">
          {`${parseInt(result.toFixed(2))}%`}
        </span>
      </div>
    )

    const statusUI = (
      <>
        {data.startedAt === null ? (
          <span className="py-1 text-sm">{t("commonConstants.pending")}</span>
        ) : data.startedAt != null && data.endAt === null && duration < 48 ? (
          <span className="py-1 text-sm">{t("commonConstants.onGoing")}</span>
        ) : data.startedAt != null && data.endAt !== null ? (
          <span className="py-1 text-sm">{resUI}</span>
        ) : (
          <span className="py-1 text-sm">NA</span>
        )}
      </>
    )

    return <span>{result ? resUI : statusUI}</span>
  }

  const ActionsCell = (
    data: {
      candidateResult: CandidateResult[]
      linkSentOn: string
    } & CandidateResult
  ) => {
    const menuItemsDetailsList = [
      {
        show: loaderData.permission.invite_candidate.update && !data.startedAt,
        id: "resend-invite",
        menuListText: t("resultConstants.resendInvite"),
        menuListLink: resendTestLink,
        menuLinkAltTagLine: t("resultConstants.resendAssessmentInvite"),
        handleItemAction: () =>
          resendInvite(data.id, data.candidateId, data.id),
      },
      {
        show: true,
        id: "copy-link",
        menuListText: t("resultConstants.copyLink"),
        menuListIcon: "material-symbols:content-copy-outline",
        handleItemAction: () => copyLink(data.id as string),
      },
    ]

    return (
      <div id="status-cell">
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
    )
  }

  const column: tableColumnType[] = [
    { title: "Sr.No", field: "sr_no", render: SeriaLNoCell, width: "10%" },
    { title: "Name", field: "name", render: NameDataCell, width: "30%" },
    { title: "Email", field: "email", render: EmailDataCell, width: "30%" },
    {
      title: "Invited At",
      field: "invitedAt",
      render: InvitedAtCell,
      width: "15%",
    },
    { title: "Result", field: "Result", render: ResultCell },
    { title: "", field: "actions", render: ActionsCell, width: "5%" },
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
        <div className="w-44">
          <DropdownField
            data={filterByStatus}
            displayKey="name"
            valueKey="value"
            value={statusFilter}
            setValue={setStatusFilter}
            label="Status"
          />
        </div>
        <div className="w-44">
          <DropdownField
            data={filterByPassFail}
            displayKey="name"
            valueKey="value"
            value={passFailFilter}
            setValue={setPassFailFilter}
            label="Result"
          />
        </div>
        {passFailFilter == "custom" && (
          <div className="flex w-80 items-center gap-2  text-sm text-gray-600">
            <span>Range: </span>{" "}
            <RangeSlider
              min={0}
              max={100}
              minValue={customFilter[0]}
              maxValue={customFilter[1]}
              onChange={updateCustomFilter}
            />
          </div>
        )}
      </div>
      <Table
        columns={column}
        data={filteredData}
        paginationEnabled={filteredData.length > 0 && true}
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
