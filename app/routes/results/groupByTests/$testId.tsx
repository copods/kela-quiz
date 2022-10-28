import AdminLayout from '~/components/layouts/AdminLayout'
import CandidateListOfTest from '~/components/results/CandidateListOfTest'
import type { LoaderFunction } from '@remix-run/server-runtime'
import { json } from '@remix-run/node'

import invariant from 'tiny-invariant'
import { getAllCandidatesOfTest } from '~/models/result.server'

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
function CandidateListRoute() {
  return (
    <AdminLayout>
      <CandidateListOfTest />
    </AdminLayout>
  )
}

export default CandidateListRoute
