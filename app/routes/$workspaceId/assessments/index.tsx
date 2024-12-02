import type { LoaderFunction, ActionFunction } from "@remix-run/node"
import { redirect, json } from "@remix-run/node"

import TestList from "~/components/tests/TestList"
import { routes } from "~/constants/route.constants"
import type { Test } from "~/interface/Interface"
import { sortByOrder } from "~/interface/Interface"
import { checkUserFeatureAuthorization } from "~/models/authorization.server"
import {
  getCandidateByAssessmentId,
  deleteAssessmentById,
  getAllAssessments,
  getAllAssessmentsCount,
  getWorkspaces,
} from "~/services/assessments.service"
import { getUserId, requireUserId } from "~/session.server"
type LoaderData = {
  tests: Awaited<Array<Test>>
  status?: string | undefined
  workspaces: Awaited<ReturnType<typeof getWorkspaces>>
  currentWorkspaceId: string
  allTestsCount: number
  testsCurrentPage: number
  testsItemsPerPage: number
  permission: { [key: string]: { [key: string]: boolean } }
}
export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = (await getUserId(request)) as string
  const currentWorkspaceId = params.workspaceId as string

  const permission = await checkUserFeatureAuthorization(
    userId,
    currentWorkspaceId
  )
  if (!permission.assessments.read) {
    return redirect(routes.unauthorized)
  }

  const query = new URL(request.url).searchParams
  const testsItemsPerPage = Math.max(Number(query.get("limit") || 10), 10) //To set the lower bound, so that minimum count will always be 1 for current page and 5 for items per page.
  const testsCurrentPage = Math.max(Number(query.get("page") || 1), 1)
  const workspaces = await getWorkspaces(userId as string)
  if (!userId) return redirect(routes.signIn)
  let tests: Array<Test> = []
  let status: string = ""
  const sortBy = query.get("sortBy")
  const sortOrder = query.get("sort") || sortByOrder.desc

  let callBack = (AssessmentUpdate: Test[], statusUpdate: string) => {
    tests = AssessmentUpdate
    status = statusUpdate
  }
  try {
    //fetching all assessments
    await getAllAssessments(
      sortBy as string,
      sortOrder as string,
      currentWorkspaceId as string,
      testsItemsPerPage,
      testsCurrentPage,
      callBack,
      userId
    )

    const allTestsCount = await getAllAssessmentsCount(
      currentWorkspaceId,
      userId
    )
    return json<LoaderData>({
      tests,
      status,
      workspaces,
      currentWorkspaceId,
      allTestsCount,
      testsCurrentPage,
      testsItemsPerPage,
      permission,
    })
  } catch (error: any) {
    if (error.status === 403) {
      return redirect(routes.unauthorized)
    }
  }
}

export const action: ActionFunction = async ({ request, params }) => {
  try {
    const userId = await getUserId(request)
    const currentWorkspaceId = params.workspaceId as string
    const formData = await request.formData()
    const action = formData.get("action")
    const createdById = await requireUserId(request)
    const testId = formData.get("inviteCandidates") as string

    formData.delete("inviteCandidates")

    //deleting assssment by id
    if (action === "deleteTest") {
      const response = await deleteAssessmentById(
        formData.get("id") as string,
        userId!,
        currentWorkspaceId
      )
      return response
    }

    // creating candidate for assessment
    if (testId !== null) {
      let emails: Array<string> = []
      await formData.forEach((data) => {
        if (data != "") {
          emails.push(data as string)
        }
      })
      if (emails.length === 0) {
        return json({
          status: 401,
          message: "statusCheck.noEmailsInvite",
          testId,
        })
      }
      const candidateInviteStatus = await getCandidateByAssessmentId({
        emails,
        createdById,
        testId,
        userId: userId!,
        workspaceId: currentWorkspaceId,
      })
      return json({ candidateInviteStatus, testId })
    }
  } catch (error: any) {
    if (error.status === 403) {
      return redirect(routes.unauthorized)
    } else {
      return error
    }
  }
  return null
}

export default function Tests() {
  return <TestList />
}
