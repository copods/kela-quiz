import AdminLayout from '~/components/layouts/AdminLayout'
import { getUserId, requireUserId } from '~/session.server'
import { redirect } from '@remix-run/node'
import type { LoaderFunction, ActionFunction } from '@remix-run/node'
import TestList from '~/components/tests/TestList'
import { getAllTests } from '~/models/tests.server'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { toast } from 'react-toastify'
import type { Test } from '~/interface/Interface'
import { createCandidate } from '~/models/candidate.server'
// import { useEffect } from 'react'

type LoaderData = {
  tests: Awaited<ReturnType<typeof getAllTests>>
  status: string
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
  const createdById = await requireUserId(request)
  const formData = await request.formData()
  const testId = formData.get('inviteCandidates') as string
  formData.delete('inviteCandidates')

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
  return json({ candidateInviteStatus, testId })
}

export default function Tests() {
  const testData = useLoaderData() as unknown as LoaderData

  if (testData.status != 'Success') {
    toast.success('Something went wrong..!')
  }
  return (
    <AdminLayout>
      <TestList tests={testData.tests as Test[]} />
    </AdminLayout>
  )
}
