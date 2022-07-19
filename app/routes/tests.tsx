import AdminLayout from '~/components/layouts/AdminLayout'
import { getUserId } from '~/session.server'
import { redirect } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'
import TestList from '~/components/tests/TestList'
import { getAllTests } from '~/models/tests.server'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { toast } from 'react-toastify'
import type { Test } from '~/interface/Interface'

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
      tests = res
      status = 'Success'
    })
    .catch((err) => {
      status = err
    })
  return json<LoaderData>({ tests, status })
}

export default function Results() {
  const data = useLoaderData() as LoaderData
  if (data.status != 'Success') {
    toast.success('Something went wrong..!')
  }
  return (
    <AdminLayout>
      <TestList tests={data.tests} />
    </AdminLayout>
  )
}
