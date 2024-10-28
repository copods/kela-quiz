import type { LoaderFunction } from "@remix-run/node"
import { redirect, json } from "@remix-run/node"

import GroupByTests from "~/components/results/GroupByTests"
import { routes } from "~/constants/route.constants"
import { checkUserFeatureAuthorization } from "~/models/authorization.server"
import {
  getDetailsOfAllAssessments,
  getWorkspaces,
} from "~/services/results.service"
import { getUserId } from "~/session.server"

type LoaderData = {
  candidateTest: Awaited<ReturnType<typeof getDetailsOfAllAssessments>>
  userId: Awaited<ReturnType<typeof getUserId>>
  workspaces: Awaited<ReturnType<typeof getWorkspaces>>
  currentWorkspaceId: string
}
export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUserId(request)
  const currentWorkspaceId = params.workspaceId as string

  const permission = await checkUserFeatureAuthorization(
    userId!,
    currentWorkspaceId
  )
  if (!permission.results.read) {
    return redirect(routes.unauthorized)
  }

  const query = new URL(request.url).searchParams
  const resultsItemsPerPage = Math.max(Number(query.get("limit") || 10), 10) //To set the lower bound, so that minimum count will always be 1 for current page and 5 for items per page.
  const resultsCurrentPage = Math.max(Number(query.get("page") || 1), 1)
  const statusFilter = query.get("status") as string
  const workspaces = await getWorkspaces(userId as string)
  const sortBy = query.get("sortBy")
  const sortOrder = query.get("sort")
  if (!userId) return redirect(routes.signIn)
  try {
    const candidateTest = await getDetailsOfAllAssessments(
      currentWorkspaceId as string,
      resultsItemsPerPage,
      resultsCurrentPage,
      statusFilter,
      sortBy as string,
      sortOrder as string,
      userId
    )
    return json<LoaderData>({
      candidateTest,
      userId,
      workspaces,
      currentWorkspaceId,
    })
  } catch (error: any) {
    if (error.status === 403) {
      return redirect(routes.unauthorized)
    }
  }
}
const ResultsRoute = () => {
  return <GroupByTests />
}

export default ResultsRoute
