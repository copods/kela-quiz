import type { ActionFunction, LoaderFunction } from '@remix-run/server-runtime'

import { json } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { getTestById } from '~/models/tests.server'
import TestDetails from '~/components/tests/TestDetails'
import { getUserWorkspaces } from '~/models/workspace.server'
import { getUserId, requireUserId } from '~/session.server'
import { createCandidate } from '~/models/candidate.server'

type LoaderData = {
  testPreview: Awaited<ReturnType<typeof getTestById>>
  workspaces: Awaited<ReturnType<typeof getUserWorkspaces>>
  currentWorkspaceId: string
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUserId(request)
  const currentWorkspaceId = params.workspaceId as string
  const workspaces = await getUserWorkspaces(userId as string)
  invariant(params.testId, 'testId not found')
  const testPreview = await getTestById({ id: params.testId })
  if (!testPreview) {
    throw new Response('Not Found', { status: 404 })
  }

  return json<LoaderData>({ testPreview, workspaces, currentWorkspaceId })
}
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const createdById = await requireUserId(request)
  const testId = formData.get('inviteCandidates') as string
  formData.delete('inviteCandidates')

  if (testId !== null) {
    let emails: Array<string> = []
    await formData.forEach((fd) => {
      if (fd != '') {
        emails.push(fd as string)
      }
    })
    if (emails.length === 0) {
      return json({
        status: 401,
        message: 'statusCheck.noEmailsInvite',
        testId,
      })
    }
    const candidateInviteStatus = await createCandidate({
      emails,
      createdById,
      testId,
    })

    return json({ candidateInviteStatus, testId })
  }
}
export default function TestsDetailsRoute() {
  return <TestDetails />
}
