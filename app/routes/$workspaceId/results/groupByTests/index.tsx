import type { LoaderFunction } from "@remix-run/node"
import { redirect } from "@remix-run/node"
import { json } from "@remix-run/node"

import GroupByTests from "~/components/results/GroupByTests"
import { sortByOrder } from "~/interface/Interface"
import {
  getAllCandidateTests,
  getAllCandidateTestsCount,
  getTotalTestCount,
} from "~/models/result.server"
import { getUserWorkspaces } from "~/models/workspace.server"
import { getUserId } from "~/session.server"
type LoaderData = {
  candidateTest: Awaited<ReturnType<typeof getAllCandidateTests>>
  userId: Awaited<ReturnType<typeof getUserId>>
  workspaces: Awaited<ReturnType<typeof getUserWorkspaces>>
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
  const statusFilter = query.get("status") as string
  const sortBy = query.get("sortBy")
  const sortOrder = query.get("sort") || sortByOrder.desc
  const currentWorkspaceId = params.workspaceId as string
  const testCount = await getAllCandidateTestsCount(
    currentWorkspaceId,
    statusFilter
  )
  const totalTestCount = await getTotalTestCount(params.testId!)
  const workspaces = await getUserWorkspaces(userId as string)
  if (!userId) return redirect("/sign-in")
  const candidateTest = await getAllCandidateTests(
    currentWorkspaceId as string,
    resultsItemsPerPage,
    resultsCurrentPage,
    statusFilter,
    sortBy as string,
    sortOrder as string
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
}

export default function Results() {
  return <GroupByTests />
}
