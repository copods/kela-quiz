import type { LoaderFunction } from '@remix-run/server-runtime'
import { json } from '@remix-run/node'

import invariant from 'tiny-invariant'
import { getTestById } from '~/models/tests.server'

import TestDetails from '~/components/tests/TestDetails'
import AdminLayout from '~/components/layouts/AdminLayout'
import { statusCheck } from '~/constants/common.constants'

type LoaderData = {
  testPreview: Awaited<ReturnType<typeof getTestById>>
}

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.testId, 'testId not found')
  const testPreview = await getTestById({ id: params.testId })
  if (!testPreview) {
    throw new Response(statusCheck.notFound, { status: 404 })
  }

  return json<LoaderData>({ testPreview })
}

export default function TestsDetailsRoute() {
  return (
    <AdminLayout>
      <TestDetails />
    </AdminLayout>
  )
}
