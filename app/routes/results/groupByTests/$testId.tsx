import AdminLayout from '~/components/layouts/AdminLayout'
import CandidateListOfTest from '~/components/results/CandidateListOfTest'
import type { LoaderFunction } from '@remix-run/server-runtime'
import type { ActionFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { getAllCandidatesOfTest } from '~/models/result.server'
import { resendTestLink } from '~/models/candidate.server'
import { actions } from '~/constants/action.constants'

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.testId, 'resultId not found')
  const candidatesOfTest = await getAllCandidatesOfTest({
    id: params.testId,
  })
  if (!candidatesOfTest) {
    throw new Response('Not Found', { status: 404 })
  }

  return json({
    candidatesOfTest,
    params,
  })
}
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const action = formData.get('action')
  if (action === actions.resendTestLink) {
    const testId = formData.get('testId') as string
    const id = formData.get('candidateId') as string
    const candidateInviteStatus = await resendTestLink({
      id,
      testId,
    })
    return json({ candidateInviteStatus, id })
  }
}
function CandidateListRoute() {
  return (
    <AdminLayout>
      <CandidateListOfTest />
    </AdminLayout>
  )
}

export default CandidateListRoute
