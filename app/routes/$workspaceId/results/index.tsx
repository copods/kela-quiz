import { getUserId } from '~/session.server'
import { redirect } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import GroupByTests from '~/components/results/GroupByTests'
import { getAllCandidateTests } from '~/models/result.server'
import { routes } from '~/constants/route.constants'
import { getUserWorkspaces } from '~/models/workspace.server'

type LoaderData = {
  candidateTest: Awaited<ReturnType<typeof getAllCandidateTests>>
  userId: Awaited<ReturnType<typeof getUserId>>
  workspaces: Awaited<ReturnType<typeof getUserWorkspaces>>
  currentWorkspaceId: string
}
export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUserId(request)
  const query = new URL(request.url).searchParams
  const currentWorkspaceId = params.workspaceId as string
  const resultsItemsPerPage = Math.max(Number(query.get('ResultItems') || 5), 5) //To set the lower bound, so that minimum count will always be 1 for current page and 5 for items per page.
  const resultsCurrentPage = Math.max(Number(query.get('ResultPage') || 1), 1)
  const statusFilter = query.get('filterByStatus') as string
  const workspaces = await getUserWorkspaces(userId as string)
  if (!userId) return redirect(routes.signIn)
  const filter = Object.fromEntries(new URL(request.url).searchParams.entries())
    .data
    ? JSON.parse(
        Object.fromEntries(new URL(request.url).searchParams.entries()).data
      )
    : {}
  const candidateTest = await getAllCandidateTests(
    filter,
    currentWorkspaceId as string,
    resultsItemsPerPage,
    resultsCurrentPage,
    statusFilter
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
