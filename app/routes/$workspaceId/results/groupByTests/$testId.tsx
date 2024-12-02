import type { ActionFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import type { LoaderFunction } from "@remix-run/server-runtime"
import { redirect } from "@remix-run/server-runtime"
import invariant from "tiny-invariant"

import CandidateListOfTest from "~/components/results/CandidateListOfTest"
import { actions } from "~/constants/action.constants"
import { routes } from "~/constants/route.constants"
import { checkUserFeatureAuthorization } from "~/models/authorization.server"
import {
  getDetailsOfCandidatePerPage,
  getCountofAllCandidatesOfTest,
  getTestResendLink,
  getWorkspaces,
} from "~/services/results.service"
import { getUserId } from "~/session.server"

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUserId(request)
  const currentWorkspaceId = params.workspaceId

  const permission = await checkUserFeatureAuthorization(
    userId!,
    currentWorkspaceId!
  )

  const url = new URL(request.url)
  const query = url.searchParams
  const pageSize = Math.max(Number(query.get("pageSize") || 10), 5)
  const currentPage = Math.max(Number(query.get("page") || 1), 1)
  const statusFilter = query.get("filterByStatus") as string
  const searchText = query.get("searchText") as string
  const workspaces = await getWorkspaces(userId as string)
  const passFailFilter = query.get("filterByPassFail") as string
  const customFilters = query.get("customFilter") as string
  invariant(params.testId, "resultId not found")

  try {
    const candidatesCount = await getCountofAllCandidatesOfTest(
      params.testId!,
      statusFilter,
      userId!,
      currentWorkspaceId!,
      searchText ? searchText : "",
      passFailFilter,
      customFilters?.split(",")
    )
    const candidatesOfTest = await getDetailsOfCandidatePerPage({
      id: params.testId,
      workspaceId: currentWorkspaceId as string,
      userId: userId!,
      currentWorkspaceId: currentWorkspaceId!,
      currentPage,
      pageSize,
      statusFilter,
      searchText: searchText ? searchText : "",
      passFailFilter,
      customFilter: customFilters?.split(","),
    })
    return json({
      candidatesOfTest,
      params,
      workspaces,
      currentWorkspaceId,
      candidatesCount,
      currentPage,
      pageSize,
      permission,
      env: process.env,
    })
  } catch (error: any) {
    if (error.status === 403) {
      return redirect(routes.unauthorized)
    }
    return error
  }
}
export const action: ActionFunction = async ({ request, params }) => {
  const userId = await getUserId(request)
  const currentWorkspaceId = params.workspaceId
  const formData = await request.formData()
  const action = formData.get("action")
  if (action === actions.resendTestLink) {
    const testId = formData.get("testId") as string
    const candidateId = formData.get("candidateId") as string
    const id = formData.get("id") as string
    try {
      const candidateInviteStatus = await getTestResendLink({
        id,
        candidateId,
        testId,
        userId: userId!,
        workspaceId: currentWorkspaceId!,
      })
      return json({ candidateInviteStatus, candidateId })
    } catch (error: any) {
      if (error.status === 403) {
        return redirect(routes.unauthorized)
      }
    }
  }
}
function CandidateListRoute() {
  return <CandidateListOfTest />
}

export default CandidateListRoute
