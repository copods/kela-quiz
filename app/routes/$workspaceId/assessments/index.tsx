import type { LoaderFunction, ActionFunction } from "@remix-run/node"
import { redirect } from "@remix-run/node"
import { json } from "@remix-run/node"
import TestList from "~/components/tests/TestList"
import { routes } from "~/constants/route.constants"
import type { Test } from "~/interface/Interface"
import { sortByOrder } from "~/interface/Interface"
import {
  LoaderData,
  createCandidateByAssessId,
  deleteAssessmentById,
  getAllAssessments,
  getAllAssessmentsCount,
  getWorkspaces,
} from "~/services/assessments.service"
import { getUserId, requireUserId } from "~/session.server"

export const loader: LoaderFunction = async ({ request, params }) => {
  const query = new URL(request.url).searchParams
  const testsItemsPerPage = Math.max(Number(query.get("limit") || 5), 5) //To set the lower bound, so that minimum count will always be 1 for current page and 5 for items per page.
  const testsCurrentPage = Math.max(Number(query.get("page") || 1), 1)
  const userId = await getUserId(request)
  const currentWorkspaceId = params.workspaceId as string
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

  //fetching all assessments
  await getAllAssessments(
    sortBy as string,
    sortOrder as string,
    currentWorkspaceId as string,
    testsItemsPerPage,
    testsCurrentPage,
    callBack
  )

  const allTestsCount = await getAllAssessmentsCount(currentWorkspaceId)
  return json<LoaderData>({
    tests,
    status,
    workspaces,
    currentWorkspaceId,
    allTestsCount,
    testsCurrentPage,
    testsItemsPerPage,
  })
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const action = formData.get("action")
  const createdById = await requireUserId(request)
  const testId = formData.get("inviteCandidates") as string

  formData.delete("inviteCandidates")

  //deleting assssment by id
  if (action === "testDelete") {
    const response = await deleteAssessmentById(formData.get("id") as string)
    return response
  }

  // creating candidate for assessment
  const response = await createCandidateByAssessId(
    testId,
    createdById,
    formData
  )
  return response
}

export default function Tests() {
  return <TestList />
}
