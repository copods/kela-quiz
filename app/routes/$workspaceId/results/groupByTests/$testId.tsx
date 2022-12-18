import CandidateListOfTest from '~/components/results/CandidateListOfTest'
import type { LoaderFunction } from '@remix-run/server-runtime'
import type { ActionFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import invariant from 'tiny-invariant'
import {
  getAllCandidatesOfTest,
  getAllCandidatesOfTestCount,
} from '~/models/result.server'
import { getUserWorkspaces } from '~/models/workspace.server'
import { getUserId } from '~/session.server'
import { resendTestLink } from '~/models/candidate.server'
import { actions } from '~/constants/action.constants'

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url)
  const query = url.searchParams
  const candidatesCount = await getAllCandidatesOfTestCount(params.testId!)
  const pageSize = Math.max(Number(query.get('pageSize') || 5), 5)
  const currentPage = Math.max(Number(query.get('page') || 1), 1)
  const statusFilter = query.get('filterByStatus') as string
  const userId = await getUserId(request)
  const currentWorkspaceId = params.workspaceId
  const workspaces = await getUserWorkspaces(userId as string)
  invariant(params.testId, 'resultId not found')
  const candidatesOfTest = await getAllCandidatesOfTest({
    id: params.testId,
    workspaceId: currentWorkspaceId as string,
    currentPage,
    pageSize,
    statusFilter,
  })
  if (!candidatesOfTest) {
    throw new Response('Not Found', { status: 404 })
  }

  return json({
    candidatesOfTest,
    params,
    workspaces,
    currentWorkspaceId,
    candidatesCount,
    currentPage,
    pageSize,
  })
}
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const action = formData.get('action')
  if (action === actions.resendTestLink) {
    const testId = formData.get('testId') as string
    const candidateId = formData.get('candidateId') as string
    const candidateInviteStatus = await resendTestLink({
      candidateId,
      testId,
    })
    return json({ candidateInviteStatus, candidateId })
  }
}
function CandidateListRoute() {
  return <CandidateListOfTest />
}

export default CandidateListRoute
