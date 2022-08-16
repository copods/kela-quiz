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
import { statusCheck } from '~/constants/common.constants'
import { createCandidate } from '~/models/candidate.server'

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
    check?: Date
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  if (!userId) return redirect('/sign-in')

  var tests: Array<Test> = []
  var status: string = ''

  const filter = Object.fromEntries(new URL(request.url).searchParams.entries())
    .data
    ? JSON.parse(
        Object.fromEntries(new URL(request.url).searchParams.entries()).data
      )
    : {}

  await getAllTests(filter)
    .then((res) => {
      tests = res as Test[]
      status = 'Success'
    })
    .catch((err) => {
      status = err
    })
  return json<LoaderData>({ tests, status })
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const action = formData.get('deleteTest')
  const createdById = await requireUserId(request)
  const testId = formData.get('inviteCandidates') as string
  formData.delete('inviteCandidates')
  let deleteHandle = null
  if (action === 'testDelete') {
    await deleteTestById(formData.get('id') as string)
      .then((res) => {
        deleteHandle = json<ActionData>(
          { resp: { status: statusCheck.deletedSuccess + '...!' } },
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

  let emails: Array<string> = []
  await formData.forEach((fd) => {
    if (fd != '') {
      emails.push(fd as string)
    }
  })
  if (emails.length == 0) {
    return json({ status: 401, message: 'No emails to invite' })
  }
  const candidateInviteStatus = await createCandidate({
    emails,
    createdById,
    testId,
  })
  return json({ candidateInviteStatus })
}

export default function Tests() {
  const data = useLoaderData() as LoaderData
  if (data.status != statusCheck.success) {
    toast.success(statusCheck.wentWrong)
  }
  return (
    <AdminLayout>
      <TestList tests={data.tests as Test[]} status={data.status} />
    </AdminLayout>
  )
}
