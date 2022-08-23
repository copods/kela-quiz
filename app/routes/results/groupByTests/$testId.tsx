import React from 'react'
import AdminLayout from '~/components/layouts/AdminLayout'
import CandidateListOfTest from '~/components/results/CandidateListOfTest'
import type { LoaderFunction } from '@remix-run/server-runtime'
import { json } from '@remix-run/node'

import invariant from 'tiny-invariant'
import { getCandidateEmailById } from '~/models/result.server'

type LoaderData = {
  testPreview: Awaited<ReturnType<typeof getCandidateEmailById>>
  params: any
}

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.testId, 'resultId not found')
  const testPreview = await getCandidateEmailById({ id: params.testId })
  if (!testPreview) {
    throw new Response('Not Found', { status: 404 })
  }

  return json<LoaderData>({ testPreview, params })
}
function CandidateListRoute() {
  return (
    <AdminLayout>
      <CandidateListOfTest />
    </AdminLayout>
  )
}

export default CandidateListRoute
