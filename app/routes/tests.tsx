import AdminLayout from "~/components/layouts/AdminLayout";
import { getUserId, requireUserId } from '~/session.server'
import { redirect } from '@remix-run/node'
import type { LoaderFunction, ActionFunction } from '@remix-run/node'
import TestList from "~/components/tests/TestList";
import { getAllTests } from "~/models/tests.server";
import { json } from '@remix-run/node'
import { useLoaderData } from "@remix-run/react";
import { toast } from "react-toastify";
import type { Test } from "~/components/Interface";
import { createCandidate } from "~/models/candidate.server";


type LoaderData = {
  tests: Awaited<ReturnType<typeof getAllTests>>
  status: string
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  if (!userId) return redirect('/sign-in')

  var tests: Array<(Test)> = []
  var status: string = ''

  const filter = Object.fromEntries(new URL(request.url).searchParams.entries()).data ? JSON.parse(Object.fromEntries(new URL(request.url).searchParams.entries()).data) : {}

  await getAllTests(filter)
    .then(res => {
      tests = res
      status = "Success"
    }).catch(err => {
      status = err
    })
  console.log("============================================")
  await createCandidate({
    emails: ['anurag@copods.co'],
    createdById: 'cl5hx6ju20001k0k2c1xctjti',
    testId: 'cl5hxbjsj0086mdk26t7bdxd5'
  })
  return json<LoaderData>({ tests, status })
}


export const action: ActionFunction = async ({ request }) => {
  const createdById = await requireUserId(request)
  const formData = await request.formData()
  const testId = formData.get("inviteCandidates") as string
  formData.delete('inviteCandidates')

  let emails: any = []
  await formData.forEach(fd => {
    console.log(fd);
    emails.push(fd)
  })
  await createCandidate({ emails, createdById, testId })

  return null
}


export default function Results() {
  const data = useLoaderData() as LoaderData
  if (data.status != "Success") {
    toast.success("Something went wrong..!")
  }
  return (
    <AdminLayout>
      <TestList tests={data.tests} />
    </AdminLayout>
  )
}
