import { useEffect } from "react"

import type { Section } from "@prisma/client"
import { useLoaderData, useActionData, useNavigate } from "@remix-run/react"
import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime"
import { json, redirect } from "@remix-run/server-runtime"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"

import AddTestComponent from "~/components/tests/AddTest"
import { routes } from "~/constants/route.constants"

import { getUserId, requireUserId } from "~/session.server"
import { getUserWorkspaceService } from "~/services/workspace.service"
import {
  getAllSectionCount,
  getAllTestsData,
  getCreateTest,
} from "~/services/tests.service"

type LoaderData = {
  sections: Section[]
  status: string
  workspaces: Awaited<ReturnType<typeof getUserWorkspaceService>>
  currentWorkspaceId: string
  getAllSectionsCount: number
}

export type ActionData = {
  errors?: {
    title: string
    status: number
  }
  resp?: {
    title: string
    status: number
  }
}
export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUserId(request)
  const currentWorkspaceId = params.workspaceId as string
  const workspaces = await getUserWorkspaceService(userId as string)

  const query = new URL(request.url).searchParams
  const sortBy = query.get("sortBy") as string
  const sortOrder = query.get("sortOrder") as string
  const testItemsPerPage = Math.max(Number(query.get("pageSize") || 3), 3)
  const testCurrentPage = Math.max(Number(query.get("currentPage") || 1), 1)

  const getAllSectionsCount = await getAllSectionCount(currentWorkspaceId)

  if (!userId) return redirect(routes.signIn)

  let sections: Array<Section> = []
  let status: string = ""
  let callBack = (sectionUpdate: Section[], statusUpdate: string) => {
    sections = sectionUpdate
    status = statusUpdate
  }
  await getAllTestsData(
    sortBy,
    sortOrder,
    currentWorkspaceId as string,
    testCurrentPage,
    testItemsPerPage,
    callBack
  )
  return json<LoaderData>({
    sections,
    status,
    workspaces,
    currentWorkspaceId,
    getAllSectionsCount,
  })
}

export const action: ActionFunction = async ({ request, params }) => {
  const createdById = await requireUserId(request)
  const workspaceId = params.workspaceId
  const formData = await request.formData()

  const data = formData.get("data")

  return await getCreateTest(
    createdById,
    workspaceId as string,
    JSON.parse(data as string)
  )
}

const AddTest = () => {
  const { t } = useTranslation()
  const testData = useLoaderData() as unknown as LoaderData
  const actionData = useActionData() as ActionData
  const navigate = useNavigate()
  useEffect(() => {
    if (actionData) {
      if (actionData.resp?.status === 200) {
        navigate(`/${testData.currentWorkspaceId}${routes.assessments}`)
        toast.success(t(actionData.resp?.title))
      } else if (actionData.errors?.status === 400) {
        toast.error(t(actionData.errors?.title), {
          toastId: actionData.errors?.title,
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData, navigate, t])

  if (t(testData.status) != t("statusCheck.success")) {
    toast.success(t("statusCheck.commonError"))
  }

  return (
    <AddTestComponent
      currentWorkspaceId={testData.currentWorkspaceId}
      sections={testData.sections}
      totalSections={testData.getAllSectionsCount}
    />
  )
}

export default AddTest
