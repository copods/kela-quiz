import type { LoaderFunction } from '@remix-run/server-runtime'
import { json } from '@remix-run/node'

import invariant from 'tiny-invariant'
import { getTestById } from '~/models/tests.server'

import TestDetails from '~/components/tests/TestDetails'
import AdminLayout from '~/components/layouts/AdminLayout'

type LoaderData = {
  testPreview: Awaited<ReturnType<typeof getTestById>>
}

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.testId, 'testId not found')
  console.log(params)
  const testPreview = await getTestById({ id: params.testId })
  if (!testPreview) {
    throw new Response('Not Found', { status: 404 })
  }
  console.log('tt', testPreview)

  return json<LoaderData>({ testPreview })
}

export default function TestsDetailsRoute() {
  return (
    <AdminLayout>
      <TestDetails />
    </AdminLayout>
  )
}
