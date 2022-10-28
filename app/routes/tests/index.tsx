import AdminLayout from '~/components/layouts/AdminLayout'
import { getUserId, requireUserId } from '~/session.server'
import { redirect } from '@remix-run/node'
import type { LoaderFunction, ActionFunction } from '@remix-run/node'
import TestList from '~/components/tests/TestList'
import { getAllTests } from '~/models/tests.server'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { deleteTestById } from '~/models/tests.server'
import { toast } from 'react-toastify'
import type { Test } from '~/interface/Interface'
import { createCandidate } from '~/models/candidate.server'
import { routes } from '~/constants/route.constants'
import { useTranslation } from 'react-i18next'

type LoaderData = {
  tests: Awaited<ReturnType<typeof getAllTests>>
  status?: string | undefined
}
export type ActionData = {
  errors?: {
    status?: string
    check?: Date
  }
  resp?: {
    status?: string
    message?: string
    check?: Date
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  if (!userId) return redirect(routes.signIn)

  let tests: Array<Test> = []
  let status: string = ''

  const filter = Object.fromEntries(new URL(request.url).searchParams.entries())
    .data
    ? JSON.parse(
        Object.fromEntries(new URL(request.url).searchParams.entries()).data
      )
    : {}

  await getAllTests(filter)
    .then((res) => {
      tests = res as Test[]
      status = 'statusCheck.success'
    })
    .catch((err) => {
      status = err
    })
  return json<LoaderData>({ tests, status })
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
          { resp: { status: '200', message: 'statusCheck.deletedSuccess' } },
          { status: 200 }
        )
      })
      .catch((err) => {
        deleteHandle = json<ActionData>(
          { errors: { status: err, check: new Date() } },
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
  if (t(data.status as string) != t('statusCheck.success')) {
    toast.warn(t('statusCheck.commonError'))
  }
  return (
    <AdminLayout>
      <TestList tests={data.tests as Test[]} status={data.status} />
    </AdminLayout>
  )
}
