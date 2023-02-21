/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"

import { Icon } from "@iconify/react"
import { json } from "@remix-run/node"
import {
  Outlet,
  useActionData,
  useLoaderData,
  useLocation,
  useNavigate,
} from "@remix-run/react"
import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime"
import { redirect } from "@remix-run/server-runtime"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"

import Button from "~/components/common-components/Button"
import EmptyStateComponent from "~/components/common-components/EmptyStateComponent"
import AddEditSection from "~/components/sections/AddEditSection"
import Sections from "~/components/sections/Sections"
import { routes } from "~/constants/route.constants"
import { sortByOrder } from "~/interface/Interface"
import type { Section } from "~/interface/Interface"
import {
  getAllSectionCount,
  getAllTestsData,
  getWorkspaces,
  handleAddTest,
  handleDeleteTest,
  handleEditTest,
  getFIRSTSection,
} from "~/services/tests.service"
import { getUserId, requireUserId } from "~/session.server"

export type ActionData = {
  path: string
  deleted: string
  sectionId: string
  errors?: {
    title?: string
    body?: string
    status?: number
    check?: Date
    name?: string
    description?: string
  }
  createSectionFieldError?: {
    title?: string
    description?: string
    duplicateTitle?: string
  }
  resp?: {
    status?: string
    check?: Date
    title?: string
    data?: Section
    id?: string
  }
}

export type LoaderData = {
  sections: Section[]
  selectedSectionId?: string
  filters: string
  status: string
  workspaces: Awaited<ReturnType<typeof getWorkspaces>>
  currentWorkspaceId: string
  testCurrentPage: number
  testItemsPerPage: number
  getAllTestsCount: number
  sortBy: string | null
  sortOrder: string | null
}

export const loader: LoaderFunction = async ({ request, params }) => {
  try {
    // taking search params from URL
    const query = new URL(request.url).searchParams

    // taking number of items per page and current page number from query
    const testItemsPerPage = Math.max(Number(query.get("testItems") || 5), 5) //To set the lower bound, so that minimum count will always be 1 for current page and 5 for items per page.
    const testCurrentPage = Math.max(Number(query.get("testPage") || 1), 1)
    // taking sortBy and order
    const sortBy = query.get("sortBy") || "name"

    const sortOrder = query.get("sort") || sortByOrder.desc
    const userId = await getUserId(request)
    const currentWorkspaceId = params.workspaceId as string
    const workspaces = await getWorkspaces(userId as string)

    let sections: Array<Section> = []
    let status: string = ""
    let callBack = (sectionUpdate: Section[], statusUpdate: string) => {
      sections = sectionUpdate
      status = statusUpdate
    }
    // import function from helper which return number of sections based on
    // sort : sortBy ('name' / 'Created Date')
    // PaginationData : current page number (testCurrentPage) and number of items per page(testItemsPerPage)
    await getAllTestsData(
      sortBy,
      sortOrder,
      currentWorkspaceId as string,
      testCurrentPage,
      testItemsPerPage,
      callBack
    )
    const selectedSectionId = params.sectionId
      ? params.sectionId?.toString()
      : undefined
    const getAllTestsCount = await getAllSectionCount(currentWorkspaceId)

    if (!userId) return redirect(routes.signIn)
    const filters = `?sortBy=${sortBy}&sort=${sortOrder}&testPage=${testCurrentPage}&testItems=${testItemsPerPage}`
    return json<LoaderData>({
      sections,
      selectedSectionId,
      filters,
      status,
      workspaces,
      currentWorkspaceId,
      testCurrentPage,
      testItemsPerPage,
      getAllTestsCount,
      sortBy,
      sortOrder,
    })
  } catch (err) {
    console.log(err)
  }
}

export const action: ActionFunction = async ({ request, params }) => {
  const createdById = await requireUserId(request)
  const currentWorkspaceId = params.workspaceId as string
  const formData = await request.formData()
  const action =
    formData.get("addSection") ||
    formData.get("editSection") ||
    formData.get("deleteSection")
  const validateTitle = (title: string) => {
    if (typeof title !== "string" || title.length <= 0) {
      return "statusCheck.nameIsReq"
    }
  }

  const validateDescription = (description: string) => {
    if (typeof description !== "string" || description.length <= 0) {
      return "statusCheck.descIsReq"
    }
  }

  if (action === "sectionEdit") {
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const id = formData.get("id") as string
    const createSectionFieldError = {
      title: validateTitle(name),
      description: validateDescription(description),
    }
    if (Object.values(createSectionFieldError).some(Boolean)) {
      return json({ createSectionFieldError }, { status: 400 })
    }
    const response = await handleEditTest(name, description, id)
    return response
  }
  if (action === "sectionAdd") {
    const name = formData.get("name")
    const description = formData.get("description")
    const createSectionFieldError = {
      title: validateTitle(name as string),
      description: validateDescription(description as string),
    }

    if (Object.values(createSectionFieldError).some(Boolean)) {
      return json({ createSectionFieldError }, { status: 400 })
    }
    return await handleAddTest(
      name as string,
      description as string,
      createdById,
      currentWorkspaceId
    )
  }
  if (action === "sectionDelete") {
    const currentPage = formData.get("currentPage") as string
    const pagePerItems = formData.get("pageSize") as string
    const totalItems = formData.get("totalSectionsOnCurrentPage") as string
    const sortFilter = formData.get("filter") as string
    const deleteSectionId = formData.get("id") as string
    await handleDeleteTest(deleteSectionId)

    const sectionId = await getFIRSTSection(
      sortFilter
        .split("&")
        .filter((res) => res.includes("sortBy"))[0]
        .split("=")[1],
      sortFilter
        .split("&")
        .filter((res) => res.includes("sort="))[0]
        .split("=")[1],
      params.workspaceId as string,
      totalItems === "1" && currentPage !== "1"
        ? Number(currentPage) - 1
        : Number(currentPage),
      Number(pagePerItems)
    )
    if (sectionId && totalItems === "1" && currentPage !== "1") {
      redirect(
        `/${params.workspaceId}${
          routes.tests
        }/${sectionId}?${sortFilter}&testPage=${
          Number(currentPage) - 1
        }&testItems=${pagePerItems}`
      )
      return {
        deleted: "deleteLastTestOnPage",
        path: `/${params.workspaceId}${
          routes.tests
        }/${sectionId}?${sortFilter}&testPage=${
          Number(currentPage) - 1
        }&testItems=${pagePerItems}`,
      }
    } else {
      if (sectionId) {
        redirect(
          `/${params.workspaceId}${routes.tests}/${sectionId}?${sortFilter}&testPage=${currentPage}&testItems=${pagePerItems}`
        )
        return {
          sectionId: sectionId,
          deleted: "deleted",
        }
      } else {
        redirect(`/${params.workspaceId}${routes.tests}`)
        return {
          deleted: "deleted",
        }
      }
    }
  }
  return "ok"
}

export default function SectionPage() {
  const data = useLoaderData() as unknown as LoaderData
  const { t } = useTranslation()
  const sectionActionData = useActionData() as ActionData
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
  const [sectionDetailFull, setSectionDetailFull] = useState(false)
  const [showAddSectionModal, setShowAddSectionModal] = useState(false)
  const [order, setOrder] = useState(sortByOrder.desc as string)
  const [sortBy, setSortBy] = useState(sortByDetails[1].value)
  const [sectionActionErrors, setSectionActionErrors] = useState({})
  const [testsPageSize, setTestPageSize] = useState(5)
  const [testsCurrentPage, setTestsCurrentPage] = useState(data.testCurrentPage)
  const location = useLocation()
  const navigate = useNavigate()
  if (t(data.status) != t("statusCheck.success")) {
    toast.error(t("statusCheck.commonError"))
  }
  useEffect(() => {
    if (sectionActionData?.deleted === "deleteLastTestOnPage") {
      toast.success(t("statusCheck.deletedSuccess"), {
        toastId: t("statusCheck.deletedSuccess"),
      })
      navigate(sectionActionData?.path)
    }
  }, [sectionActionData?.path])

  useEffect(() => {
    if (sectionActionData) {
      if (
        t(sectionActionData.resp?.status as string) ===
        t("statusCheck.testUpdatedSuccess")
      ) {
        toast.success(t(sectionActionData.resp?.status as string), {
          toastId: t(sectionActionData.resp?.status as string),
        })
        navigate(`${location.pathname}${location.search}`)
      } else if (sectionActionData?.deleted) {
        toast.success(t("statusCheck.deletedSuccess"), {
          toastId: t("statusCheck.deletedSuccess"),
        })
        // eslint-disable-next-line no-lone-blocks
        {
          sectionActionData.sectionId &&
            navigate(
              `/${data.currentWorkspaceId}${routes.tests}/${sectionActionData?.sectionId}?sortBy=${sortBy}&sort=${order}&testPage=${testsCurrentPage}&testItems=${testsPageSize}`
            )
        }
      }
    }
  }, [
    sectionActionData,
    t,
    navigate,
    sectionActionData?.resp,
    sectionActionData?.sectionId,
  ])

  useEffect(() => {
    //checking if tests are zero then redirect to /tests
    if (data.getAllTestsCount === 0) {
      navigate(`/${data.currentWorkspaceId}${routes.tests}`)
    } else if (
      // checking if new test added && total count of tests are not zero or data is present for present page
      // navigate to given path
      data.getAllTestsCount > 0 ||
      data.sections.length >= 0 ||
      (!location.search && data.getAllTestsCount > 0)
    ) {
      navigate(
        `/${data.currentWorkspaceId}${routes.tests}/${data.sections[0]?.id}?sortBy=${sortBy}&sort=${order}&testPage=${testsCurrentPage}&testItems=${testsPageSize}`
      )
    }
  }, [
    testsCurrentPage,
    testsPageSize,
    t,
    data.getAllTestsCount,
    data.sections[0]?.id,
    location.search,
    sortBy,
    sectionActionData?.sectionId,
  ])

  useEffect(() => {
    if (data.sortOrder !== order) {
      navigate(
        `/${data.currentWorkspaceId}${routes.tests}/${
          data.sections.slice(-1)[0]?.id
        }?sortBy=${sortBy}&sort=${order}&testPage=${testsCurrentPage}&testItems=${testsPageSize}`
      )
    }
  }, [order])

  useEffect(() => {
    setTestsCurrentPage(data.testCurrentPage)
  }, [data])

  useEffect(() => {
    const heading = document.getElementById("tests-heading")
    heading?.focus()
  }, [])

  return (
    <div className="flex h-full flex-col gap-6 overflow-hidden p-1">
      {/* header */}
      <header className="flex items-start justify-between">
        <h2
          className="text-3xl font-bold text-black"
          id="tests-heading"
          tabIndex={0}
          role={t("routeFiles.tests")}
          title={t("routeFiles.tests")}
          aria-label={t("routeFiles.tests")}
        >
          {t("routeFiles.tests")}
        </h2>
        <Button
          id="add-section"
          data-cy="submit"
          className="h-9 px-5"
          variant="primary-solid"
          onClick={() => setShowAddSectionModal(!showAddSectionModal)}
          title={t("sectionsConstants.addTests")}
          buttonText={`+ ${t("sectionsConstants.addTests")}`}
        />
      </header>
      {data.sections.length > 0 && location.pathname.includes("/tests/") ? (
        <div
          className={`flex flex-1 overflow-hidden ${
            sectionDetailFull ? "" : "gap-5"
          }`}
        >
          {/* section list */}
          <div className={`${sectionDetailFull ? "hidden" : ""}`}>
            <Sections
              sections={data.sections as Section[]}
              filters={data.filters}
              sortBy={sortBy}
              setSortBy={setSortBy}
              order={order}
              setOrder={setOrder}
              sortByDetails={sortByDetails}
              currentWorkspaceId={data.currentWorkspaceId as string}
              sectionActionErrors={sectionActionErrors}
              setSectionActionErrors={setSectionActionErrors}
              totalCount={data.getAllTestsCount}
              testsPageSize={testsPageSize}
              testsCurrentPage={testsCurrentPage}
              setTestPageSize={setTestPageSize}
              setTestsCurrentPage={setTestsCurrentPage}
            />
          </div>
          {/* section details */}
          <div className={`z-10 flex flex-1 items-center `}>
            <span
              className="z-20 -mr-5"
              tabIndex={0}
              role={"button"}
              onClick={() => setSectionDetailFull(!sectionDetailFull)}
              onKeyUp={(e) => {
                if (e.key === "Enter") setSectionDetailFull(!sectionDetailFull)
              }}
            >
              {sectionDetailFull ? (
                <Icon
                  icon={"akar-icons:circle-chevron-right-fill"}
                  className="cursor-pointer text-4xl text-primary"
                />
              ) : (
                <Icon
                  icon={"akar-icons:circle-chevron-left-fill"}
                  className="cursor-pointer text-4xl text-primary"
                />
              )}
            </span>
            <Outlet />
          </div>
        </div>
      ) : (
        <EmptyStateComponent />
      )}
      <AddEditSection
        open={showAddSectionModal}
        sectionActionErrors={sectionActionErrors}
        setSectionActionErrors={setSectionActionErrors}
        setOpen={setShowAddSectionModal}
        showErrorMessage={sectionActionData?.errors?.status === 400}
        data={data}
      />
    </div>
  )
}
