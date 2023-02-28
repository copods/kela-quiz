import { useEffect, useState } from "react"

import { useNavigate, useLocation } from "react-router-dom"

import moment from "moment"

import { Icon } from "@iconify/react"
import { useActionData, useLoaderData, useSubmit } from "@remix-run/react"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"

import Button from "../common-components/Button"
import DeletePopUp from "../common-components/DeletePopUp"
import EmptyStateComponent from "../common-components/EmptyStateComponent"
import SortFilter from "../common-components/SortFilter"
import Table from "../common-components/TableComponent"
import ListActionMenu from "../ListActionMenu"

import ChipGroup from "./ChipGroup"
import InviteCandidatePopup from "./InviteCandidatePopup"

import { routes } from "~/constants/route.constants"
import { useCommonContext } from "~/context/Common.context"
import { sortByOrder } from "~/interface/Interface"
import type { Test, User, tableColumnType } from "~/interface/Interface"

const TestList = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const submit = useSubmit()
  const location = useLocation()
  //loader and action data
  const testLoaderData = useLoaderData()
  const testActionData = useActionData()
  if (t(testLoaderData.status as string) != t("statusCheck.success")) {
    toast.warn(t("statusCheck.commonError"))
  }
  useEffect(() => {
    if (testActionData) {
      if (testActionData?.resp?.statusCode === 200) {
        toast.success(t(testActionData?.resp?.message))
      } else if (testActionData?.errors?.statusCode === 400) {
        toast.error(t(testActionData?.errors?.message), {
          toastId: testActionData?.errors?.statusCode,
        })
      }
    }
  }, [testActionData, t])
  const tests = testLoaderData.tests
  const { setCustomStorage, getStoredValue } = useCommonContext()
  //sort filter data
  const [sortDirection, onSortDirectionChange] = useState(
    sortByOrder.desc as string
  )

  const sortByDetails = [
    {
      name: "Name",
      value: "name",
    },
    {
      name: "Created Date",
      value: "createdAt",
    },
  ]
  const [sortBy, onSortChange] = useState(
    getStoredValue("assessmentSort")?.value
      ? getStoredValue("assessmentSort")?.value
      : sortByDetails[1].value
  )
  const [testsCurrentPage, setTestsCurrentPage] = useState(
    testLoaderData.testsCurrentPage
  )
  const [testsPageSize, setTestsPageSize] = useState(5)
  const [candidatePopupOpen, setCandidatePopupOpen] = useState<boolean>(false)
  const [showDeletePopup, setShowDeletePopup] = useState(false)
  const [deleted, setDeleted] = useState(false)
  useEffect(() => {
    setTestsCurrentPage(testLoaderData.testsCurrentPage)
  }, [testLoaderData.testsCurrentPage])
  const [id, setId] = useState("")
  const [selectedTest, setSelectedTest] = useState({ id: "", name: "" })
  useEffect(() => {
    if (deleted) {
      setTimeout(() => {
        document.getElementById("1")?.focus()
        setDeleted(false)
      }, 500)
    }
  }, [deleted])
  // delete test function
  const deleteTest = (id: string) => {
    submit(
      {
        action: "testDelete",
        id: id,
      },
      { method: "post" }
    )
  }

  //render functions for table
  const SeriaLNoCell = (data: Test, index: number) => {
    return <span>{index + 1}</span>
  }
  const TestNameDataCell = (data: Test, index: number) => {
    return (
      <div
        className="test-name-navigation w-4/12 cursor-pointer p-1 text-base font-medium text-primary"
        aria-label={data.name}
        title={data.name}
        onClick={() =>
          navigate(
            `/${testLoaderData.currentWorkspaceId}${routes.assessments}/${data.id}`
          )
        }
        role={"button"}
        onKeyDown={(e) => {
          if (e.key === "Enter")
            navigate(
              `/${testLoaderData.currentWorkspaceId}${routes.assessments}/${data.id}`
            )
        }}
        id={`${index}`}
        tabIndex={0}
        key={data.id}
      >
        <span id="test-name-navigation">{data.name}</span>
      </div>
    )
  }
  const TestDataCell = (data: Test) => {
    return (
      <span>
        <ChipGroup sections={data.sections} totalCount={data.sections.length} />
      </span>
    )
  }
  const CreatedByDataCell = (data: Test & { createdBy: User }) => {
    return (
      <span>
        {data?.createdBy?.firstName} {data?.createdBy?.lastName}
      </span>
    )
  }
  const JoinedOnCell = (data: Test) => {
    return <span>{moment(data?.createdAt).format("DD MMMM YY")}</span>
  }

  const TestInvite = (data: Test, index: number) => {
    const menuItemsDetailsList = [
      {
        id: "Delete",
        menuListText: `${t("commonConstants.delete")}`,
        menuListIcon: "ic:outline-delete-outline",
      },
    ]
    return (
      <>
        <div className="flex" id="action-cell">
          <Icon
            id={`invite-popup-open${index}`}
            role={"button"}
            tabIndex={0}
            className="candidateInviteIcon cursor-pointer text-2xl text-primary focus:outline-dotted focus:outline-2"
            icon={"ant-design:user-add-outlined"}
            onClick={(e) => {
              setCandidatePopupOpen(true)
              setSelectedTest({ id: data.id, name: data.name })
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                setCandidatePopupOpen(true)
                setSelectedTest({ id: data.id, name: data.name })
              }
            }}
            aria-label={t("members.inviteMember")}
          />
          <ListActionMenu
            menuIcon={"mdi:dots-vertical"}
            onItemClick={setShowDeletePopup}
            open={showDeletePopup}
            menuDetails={menuItemsDetailsList}
            aria-label={t("testTableItem.menu")}
            id={data.id}
            setId={setId}
          />
        </div>
        {id === data.id && (
          <DeletePopUp
            setOpen={setShowDeletePopup}
            open={showDeletePopup}
            onDelete={() => deleteTest(data.id)}
            setDeleted={setDeleted}
            status={testLoaderData.status}
            deleteItem={data.name}
            deleteItemType={t("testsConstants.assessment")}
          />
        )}
      </>
    )
  }
  const testColumns: tableColumnType[] = [
    { title: "Sr.No", field: "Sr_No", render: SeriaLNoCell, width: "10%" },
    {
      title: "Assessment",
      field: "name",
      render: TestNameDataCell,
      width: "20%",
    },
    { title: "Test", field: "test", render: TestDataCell, width: "25%" },
    {
      title: "Created On",
      field: "createdAt",
      render: JoinedOnCell,
      width: "20%",
    },
    {
      title: "Created By",
      field: "createdBy",
      render: CreatedByDataCell,
      width: "15%",
    },
    { title: "Action", field: "action", render: TestInvite, width: "10%" },
  ]
  useEffect(() => {
    if (testLoaderData.allTestsCount === 0) {
      navigate(`/${testLoaderData.currentWorkspaceId}${routes.assessments}`, {
        replace: true,
      })
    } else if (testLoaderData.allTestsCount > 0 && tests.length > 0) {
      navigate(
        `?sortBy=${sortBy}&sort=${sortDirection}&page=${testsCurrentPage}&limit=${testsPageSize}`,
        { replace: true }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    testsPageSize,
    testsCurrentPage,
    sortBy,
    sortDirection,
    navigate,
    testLoaderData.allTestsCount,
    location.search,
  ])

  useEffect(() => {
    setCustomStorage("assessmentSort", sortBy)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy])

  useEffect(() => {
    const heading = document.getElementById("assessments-page-title")
    heading?.focus()
  }, [])

  return (
    <div className="test-list-container flex h-full flex-col gap-6 p-1">
      {/* header */}
      {/* <BreadCrumb data={breadCrumbData} /> */}
      <header className="flex items-center justify-between">
        <h2
          id="assessments-page-title"
          tabIndex={0}
          role={t("testsConstants.assessments")}
          title={t("testsConstants.assessments")}
          className="text-3xl font-bold text-black"
        >
          {t("testsConstants.assessments")}
        </h2>
        <Button
          className="px-5"
          onClick={() =>
            navigate(
              `/${testLoaderData.currentWorkspaceId}${routes.addAssessment}`
            )
          }
          id="add-test"
          tabIndex={0}
          variant="primary-solid"
          title={t("testsConstants.addTestbutton")}
          aria-label={t("testsConstants.addTestbutton")}
          buttonText={`+ ${t("testsConstants.addTestbutton")}`}
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
              totalItems={testLoaderData?.allTestsCount}
              showSelected={false}
            />
          </div>
          <div className="flex flex-1 flex-col rounded-lg pb-6">
            <Table
              columns={testColumns}
              data={tests}
              paginationEnabled={true}
              pageSize={testsPageSize}
              setPageSize={setTestsPageSize}
              currentPage={testsCurrentPage}
              onPageChange={setTestsCurrentPage}
              totalItems={testLoaderData.allTestsCount}
            />
          </div>
        </>
      ) : (
        <EmptyStateComponent />
      )}
      <InviteCandidatePopup
        openInvitePopup={candidatePopupOpen}
        setOpenInvitePopup={setCandidatePopupOpen}
        testName={selectedTest.name}
        testId={selectedTest.id}
        testsPageSize={testsPageSize}
        testsCurrentPage={testsCurrentPage}
        sortBy={sortBy}
        sortDirection={sortDirection}
      />
    </div>
  )
}
export default TestList
