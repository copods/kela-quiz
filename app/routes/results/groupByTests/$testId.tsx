import AdminLayout from '~/components/layouts/AdminLayout'
import CandidateListOfTest from '~/components/results/CandidateListOfTest'
import type { LoaderFunction } from '@remix-run/server-runtime'
import { json } from '@remix-run/node'

import invariant from 'tiny-invariant'
import { getAllCandidatesOfTest } from '~/models/result.server'
import { getUserWorkspaces } from '~/models/workspace.server'
import { getUserId, getWorkspaceId } from '~/session.server'

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUserId(request)
  const currentWorkspaceId = await getWorkspaceId(request)
  const workspaces = await getUserWorkspaces(userId as string)
  invariant(params.testId, 'resultId not found')
  const candidatesOfTest = await getAllCandidatesOfTest({
    id: params.testId,
    workspaceId: currentWorkspaceId as string,
  })
  if (!candidatesOfTest) {
    throw new Response('Not Found', { status: 404 })
  }

  return json({
    candidatesOfTest,
    params,
    workspaces,
    currentWorkspaceId,
  })
}
function CandidateListRoute() {
  return (
    <AdminLayout>
      <CandidateListOfTest />
    </AdminLayout>
  )
}

export default CandidateListRoute
