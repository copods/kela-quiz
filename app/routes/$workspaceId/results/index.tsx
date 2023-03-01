import type { LoaderFunction } from "@remix-run/node"
import { redirect } from "@remix-run/node"
import { json } from "@remix-run/node"

import GroupByTests from "~/components/results/GroupByTests"
import { routes } from "~/constants/route.constants"
import { getALLCandidateTests, getWorkspaces } from "~/services/results.service"
import { getUserId } from "~/session.server"

type LoaderData = {
  candidateTest: Awaited<ReturnType<typeof getALLCandidateTests>>
  userId: Awaited<ReturnType<typeof getUserId>>
  workspaces: Awaited<ReturnType<typeof getWorkspaces>>
  currentWorkspaceId: string
}
export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUserId(request)
  const query = new URL(request.url).searchParams
  const currentWorkspaceId = params.workspaceId as string
  const resultsItemsPerPage = Math.max(Number(query.get("limit") || 5), 5) //To set the lower bound, so that minimum count will always be 1 for current page and 5 for items per page.
  const resultsCurrentPage = Math.max(Number(query.get("page") || 1), 1)
  const statusFilter = query.get("status") as string
  const workspaces = await getWorkspaces(userId as string)
  const sortBy = query.get("sortBy")
  const sortOrder = query.get("sort")
  if (!userId) return redirect(routes.signIn)
  const candidateTest = await getALLCandidateTests(
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
}
const ResultsRoute = () => {
  return <GroupByTests />
}
export default ResultsRoute
