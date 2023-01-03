import { getUserId, requireUserId } from '~/session.server'
import { redirect } from '@remix-run/node'
import type { LoaderFunction, ActionFunction } from '@remix-run/node'
import TestList from '~/components/tests/TestList'
import { getAllTests, getAllTestsCount } from '~/models/tests.server'
import { json } from '@remix-run/node'
import { deleteTestById } from '~/models/tests.server'
import type { Test } from '~/interface/Interface'
import { createCandidate } from '~/models/candidate.server'
import { routes } from '~/constants/route.constants'
import { getUserWorkspaces } from '~/models/workspace.server'

type LoaderData = {
  tests: Awaited<Array<Test>>
  status?: string | undefined
  workspaces: Awaited<ReturnType<typeof getUserWorkspaces>>
  currentWorkspaceId: string
  allTestsCount: number
  testsCurrentPage: number
  testsItemsPerPage: number
}
export type ActionData = {
  errors?: {
    statusCode: number
    message: string
  }
  resp?: {
    statusCode: number
    message: string
  }
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const query = new URL(request.url).searchParams
  const testsItemsPerPage = Math.max(Number(query.get('testItems') || 5), 5) //To set the lower bound, so that minimum count will always be 1 for current page and 5 for items per page.
  const testsCurrentPage = Math.max(Number(query.get('testPage') || 1), 1)
  const userId = await getUserId(request)
  const currentWorkspaceId = params.workspaceId as string
  const workspaces = await getUserWorkspaces(userId as string)

  if (!userId) return redirect(routes.signIn)

  let tests: Array<Test> = []
  let status: string = ''

  const filter = Object.fromEntries(new URL(request.url).searchParams.entries())
    .data
    ? JSON.parse(
        Object.fromEntries(new URL(request.url).searchParams.entries()).data
      )
    : {}

  await getAllTests(
    filter,
    currentWorkspaceId as string,
    testsItemsPerPage,
    testsCurrentPage
  )
    .then((res) => {
      tests = res as Test[]
      status = 'statusCheck.success'
    })
    .catch((err) => {
      status = err
    })
  const allTestsCount = await getAllTestsCount(currentWorkspaceId)
  return json<LoaderData>({
    tests,
    status,
    workspaces,
    currentWorkspaceId,
    allTestsCount,
    testsCurrentPage,
    testsItemsPerPage,
  })
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const action = formData.get('action')
  const createdById = await requireUserId(request)
  const testId = formData.get('inviteCandidates') as string

  formData.delete('inviteCandidates')
  let deleteHandle = null
  if (action === 'testDelete') {
    await deleteTestById(formData.get('id') as string)
      .then((res) => {
        deleteHandle = json<ActionData>(
          { resp: { statusCode: 200, message: 'statusCheck.deletedSuccess' } },
          { status: 200 }
        )
      })
      .catch((err) => {
        deleteHandle = json<ActionData>(
          { errors: { statusCode: 400, message: 'statusCheck.commonError' } },
          { status: 400 }
        )
      })
    return deleteHandle
  }
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

export default function Tests() {
  return <TestList />
}
