import type { LoaderFunction } from '@remix-run/server-runtime'
import { json } from '@remix-run/node'

import invariant from 'tiny-invariant'
import { getTestById } from '~/models/tests.server'

import TestDetails from '~/components/tests/TestDetails'
import AdminLayout from '~/components/layouts/AdminLayout'
import { getUserWorkspaces } from '~/models/workspace.server'
import { getWorkspaceId, getUserId } from '~/session.server'

type LoaderData = {
  testPreview: Awaited<ReturnType<typeof getTestById>>
  workspaces: Awaited<ReturnType<typeof getUserWorkspaces>>
  currentWorkspaceId: Awaited<ReturnType<typeof getWorkspaceId>>
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUserId(request)
  const currentWorkspaceId = await getWorkspaceId(request)
  const workspaces = await getUserWorkspaces(userId as string)
  invariant(params.testId, 'testId not found')
  const testPreview = await getTestById({ id: params.testId })
  if (!testPreview) {
    throw new Response('Not Found', { status: 404 })
  }

  return json<LoaderData>({ testPreview, workspaces, currentWorkspaceId })
}

export default function TestsDetailsRoute() {
  return (
    <AdminLayout>
      <TestDetails />
    </AdminLayout>
  )
}
