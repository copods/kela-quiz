import AdminLayout from '~/components/layouts/AdminLayout'
import { getUserId, getWorkspaceId, requireUserId } from '~/session.server'
import { redirect } from '@remix-run/node'
import type { LoaderFunction, ActionFunction } from '@remix-run/node'
import TestList from '~/components/tests/TestList'
import { getAllTests } from '~/models/tests.server'
import { json } from '@remix-run/node'
import { useActionData, useLoaderData } from '@remix-run/react'
import { deleteTestById } from '~/models/tests.server'
import { toast } from 'react-toastify'
import type { Test } from '~/interface/Interface'
import { createCandidate } from '~/models/candidate.server'
import { routes } from '~/constants/route.constants'
import { useTranslation } from 'react-i18next'
import { getUserWorkspaces } from '~/models/workspace.server'
import { useEffect } from 'react'

type LoaderData = {
  tests: Awaited<Array<Test>>
  status?: string | undefined
  workspaces: Awaited<ReturnType<typeof getUserWorkspaces>>
  currentWorkspaceId: Awaited<ReturnType<typeof getWorkspaceId>>
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

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  const currentWorkspaceId = await getWorkspaceId(request)
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

  await getAllTests(filter, currentWorkspaceId as string)
    .then((res) => {
      tests = res as Test[]
      status = 'statusCheck.success'
    })
    .catch((err) => {
      status = err
    })
  return json<LoaderData>({ tests, status, workspaces, currentWorkspaceId })
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const action = formData.get('action')
  console.log('ACTION', action)
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
  const { t } = useTranslation()

  const data = useLoaderData() as unknown as LoaderData

  const testActionData = useActionData() as ActionData
  console.log('TEST_ACTION_DATA', testActionData)
  if (t(data.status as string) != t('statusCheck.success')) {
    toast.warn(t('statusCheck.commonError'))
  }
  useEffect(() => {
    if (testActionData) {
      if (testActionData.resp?.statusCode === 200) {
        toast.success(t(testActionData.resp?.message))
      } else if (testActionData.errors?.statusCode === 400) {
        toast.error(t(testActionData.errors?.message), {
          toastId: testActionData.errors?.statusCode,
        })
      }
    }
  }, [testActionData, t])
  return (
    <AdminLayout>
      <TestList tests={data.tests as Test[]} status={data.status} />
    </AdminLayout>
  )
}
