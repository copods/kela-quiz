import { useEffect, useState } from "react"

import moment from "moment"

import { Icon } from "@iconify/react"
import {
  Link,
  useFetcher,
  useNavigate,
  useLoaderData,
  useLocation,
} from "@remix-run/react"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"

import ListActionMenu from "../../components/ListActionMenu"
import Table from "../common-components/TableComponent"

import resendTestLink from "~/../public/assets/resend-test-invitation.svg"
import type { CandidateResult, tableColumnType } from "~/interface/Interface"
import type { loader } from "~/routes/$workspaceId.results.groupByCandidate._index"

const GroupByCandidate = () => {
  const { t } = useTranslation()

  const { candidates, candidatesCount, currentWorkspaceId, currentPage, env } =
    useLoaderData<typeof loader>()

  const navigate = useNavigate()
  const location = useLocation()
  const fetcher = useFetcher()

  const [searchText, setSearchText] = useState("")
  const [pageSize, setPageSize] = useState(10)
  const [currentPages, setCurrentPage] = useState(currentPage)
  let [filteredData, setFilteredData] = useState(candidates)
  const [menuListOpen, setmenuListOpen] = useState<boolean>(false)

  const copyLink = (id: string) => {
    const link = `${env.PUBLIC_URL}/assessment/${id}`
    navigator.clipboard.writeText(link).then(
      () => toast.success(t("testsConstants.copyLink")),
      (error) => toast.error(`${t("testConstants.copyLinkFailed")}${error}`)
    )
  }

  // resendInvite 00e0cc51-1c83-4554-a1e7-ab62d1ea5309 27dca272-94cf-41c6-b379-b48346dfb7c3 00e0cc51-1c83-4554-a1e7-ab62d1ea5309
  // resendInvite 27dca272-94cf-41c6-b379-b48346dfb7c3 null 27dca272-94cf-41c6-b379-b48346dfb7c3

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

  const SeriaLNoCell = (data: { [key: string]: string }, index: number) => {
    return <span>{(currentPage - 1) * pageSize + index + 1}</span>
  }

  const NameDataCell = (data: any) => {
    const candidateName = data.firstName + " " + data.lastName
    const NameC = (
      <span className="flex flex-col leading-[90%]">
        {candidateName}
        <span className="text-sm text-stone-400">{data.email}</span>
      </span>
    )

    return (
      <span data-cy="candidateName">
        {data.firstName && data.lastName && data.startedAt ? (
          <Link
            to={`/${currentWorkspaceId}/results/groupByTests/${data?.candidateResult[0]?.testId}/${data?.candidateId}`}
            className="text-primary col-span-2 flex truncate font-semibold"
            title={candidateName}
          >
            {NameC}
          </Link>
        ) : data.firstName && data.lastName && !data.startedAt ? (
          NameC
        ) : (
          <span className="text-sm text-stone-400">{data.email}</span>
        )}
      </span>
    )
  }

  const TestDataCell = (data: any) => {
    return <span title={data.testName}>{data.testName}</span>
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
        show: !data.startedAt,
        id: "resend-invite",
        menuListText: t("resultConstants.resendInvite"),
        menuListLink: resendTestLink,
        menuLinkAltTagLine: t("resultConstants.resendAssessmentInvite"),
        handleItemAction: () => resendInvite(data.testId, data.id, data.testId),
      },
      {
        show: true,
        id: "copy-link",
        menuListText: t("resultConstants.copyLink"),
        menuListIcon: "material-symbols:content-copy-outline",
        handleItemAction: () => copyLink(data.testId as string),
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
    { title: "Sr.No", field: "sr_no", render: SeriaLNoCell, width: "5%" },
    { title: "Name", field: "name", render: NameDataCell, width: "25%" },
    { title: "Test", field: "test", render: TestDataCell, width: "40%" },
    {
      title: "Invited At",
      field: "invitedAt",
      render: InvitedAtCell,
      width: "15%",
    },
    { title: "Result", field: "Result", render: ResultCell },
    { title: "", field: "actions", render: ActionsCell, width: "5%" },
  ]

  useEffect(() => {
    setFilteredData(candidates)
  }, [candidates])

  useEffect(() => {
    navigate(
      `?page=${currentPages}&limit=${pageSize}&searchText=${searchText}`,
      { replace: true }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPages, pageSize, searchText, location.search])

  return (
    <div id="test-details" className="flex h-full flex-col gap-4 ">
      <header className="border-b border-solid border-slate-300">
        <div className="flex gap-2 pb-6">
          <span className="text-3xl font-semibold text-gray-900" id="title">
            {t("commonConstants.groupByCandidate")}
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
            setCurrentPage(1)
            setSearchText(e.target.value)
          }}
        />
      </div>
      <Table
        columns={column}
        data={filteredData}
        paginationEnabled={filteredData.length > 0 && true}
        pageSize={pageSize}
        setPageSize={setPageSize}
        currentPage={currentPages}
        onPageChange={(e) => {
          setCurrentPage(e)
        }}
        totalItems={candidatesCount}
      />
    </div>
  )
}

export default GroupByCandidate
