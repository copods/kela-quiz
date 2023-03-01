import type { LoaderFunction } from "@remix-run/node"
import { redirect } from "@remix-run/node"
import { json } from "@remix-run/node"

import GroupByTests from "~/components/results/GroupByTests"
import { routes } from "~/constants/route.constants"
import { sortByOrder } from "~/interface/Interface"
import {
  getALLCandidateTests,
  getALLCandidateTestsCount,
  getTotalTestCounts,
  getWorkspaces,
} from "~/services/results.service"
import { getUserId } from "~/session.server"

type LoaderData = {
  candidateTest: Awaited<ReturnType<typeof getALLCandidateTests>>
  userId: Awaited<ReturnType<typeof getUserId>>
  workspaces: Awaited<ReturnType<typeof getWorkspaces>>
  currentWorkspaceId: string
  resultsItemsPerPage: number
  resultsCurrentPage: number
  testCount: number
  totalTestCount: number
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUserId(request)
  const query = new URL(request.url).searchParams
  const resultsItemsPerPage = Math.max(Number(query.get("limit") || 5), 5) //To set the lower bound, so that minimum count will always be 1 for current page and 5 for items per page.
  const resultsCurrentPage = Math.max(Number(query.get("page") || 1), 1)
  const statusFilter = (query.get("status") as string) || "active"
  const sortBy = query.get("sortBy")
  const sortOrder = query.get("sort") || sortByOrder.desc
  const currentWorkspaceId = params.workspaceId as string
  const testCount = await getALLCandidateTestsCount(
    currentWorkspaceId,
    statusFilter
  )
  const totalTestCount = await getTotalTestCounts(params.testId!)
  const workspaces = await getWorkspaces(userId as string)
  if (!userId) return redirect("/sign-in")
  try {
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
      resultsCurrentPage,
      resultsItemsPerPage,
      testCount,
      totalTestCount,
    })
  } catch (error: any) {
    if (error.status === 403) {
      return redirect(routes.members)
    }
  }
}

export default function Results() {
  return <GroupByTests />
}
