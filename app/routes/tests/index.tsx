import AdminLayout from '~/components/layouts/AdminLayout'
import { getUserId, requireUserId } from '~/session.server'
import { redirect } from '@remix-run/node'
import type { LoaderFunction, ActionFunction } from '@remix-run/node'
import TestList from '~/components/tests/TestList'
import { getAllTests } from '~/models/tests.server'
import { json } from '@remix-run/node'
import { useActionData, useLoaderData } from '@remix-run/react'
import { toast } from 'react-toastify'
import type { Test } from '~/interface/Interface'
import { createCandidate } from '~/models/candidate.server'
import { useEffect } from 'react'

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

  let emails: any = []
  await formData.forEach((fd) => {
    console.log(fd)
    emails.push(fd)
  })
  const candidateInviteStatus = await createCandidate({
    emails,
    createdById,
    testId,
  })
  console.log('asadsdasda:', candidateInviteStatus)

  return json({ candidateInviteStatus })
}

export default function Results() {
  const testData = useLoaderData() as LoaderData
  const actionData = useActionData()

  useEffect(() => {
    console.log('Actiondata:', actionData)
    if (actionData?.candidateInviteStatus == 'created') {
      toast.success('Candidates Invited')
    } else {
      if (actionData?.candidateInviteStatus) {
        toast.error('Candidate Invite Error')
      }
    }
  }, [actionData])

  if (testData.status != 'Success') {
    toast.success('Something went wrong..!')
  }
  return (
    <AdminLayout>
      <TestList tests={testData.tests as Test[]} />
    </AdminLayout>
  )
}
