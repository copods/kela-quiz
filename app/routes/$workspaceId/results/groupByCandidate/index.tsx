import GroupByCandidate from "~/components/results/GroupByCandidate"
import type { ActionFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import type { LoaderFunction } from "@remix-run/server-runtime"
import { redirect } from "@remix-run/server-runtime"

import { actions } from "~/constants/action.constants"
import { routes } from "~/constants/route.constants"
import { checkUserFeatureAuthorization } from "~/models/authorization.server"
import {
  getTestResendLink,
  getWorkspaces,
  getAllCandidatePerPage,
  getCountofAllCandidates,
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
  const pageSize = Math.max(Number(query.get("limit") || 10), 5)
  const workspaces = await getWorkspaces(userId as string)
  const currentPage = Math.max(Number(query.get("page") || 1), 1)
  const searchText = query.get("searchText") as string
  try {
    const candidatesCount = await getCountofAllCandidates(
      userId!,
      currentWorkspaceId!,
      searchText ? searchText : ""
    )
    const candidates = await getAllCandidatePerPage({
      userId: userId!,
      currentWorkspaceId: currentWorkspaceId!,
      currentPage,
      pageSize,
      searchText: searchText ? searchText : "",
    })
    return json({
      candidates,
      params,
      // workspaces,
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

export default function Results() {
  return <GroupByCandidate />
}
