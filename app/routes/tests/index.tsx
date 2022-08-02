import AdminLayout from '~/components/layouts/AdminLayout'
import { getUserId } from '~/session.server'
import { redirect } from '@remix-run/node'
import type { LoaderFunction, ActionFunction } from '@remix-run/node'
import TestList from '~/components/tests/TestList'
import { getAllTests } from '~/models/tests.server'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { deleteTestById } from '~/models/tests.server'
import { toast } from 'react-toastify'
import type { Test } from '~/interface/Interface'

type LoaderData = {
  tests: Awaited<ReturnType<typeof getAllTests>>
  status: string
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
  let deleteHandle = null
  if (action === 'testDelete') {
    console.log(formData.get('id'), 'test route')
    await deleteTestById(formData.get('id') as string)
      .then((res) => {
        console.log(res, 'res')
        deleteHandle = json<ActionData>(
          { resp: { status: 'Deleted Successfully..!' } },
          { status: 200 }
        )
      })
      .catch((err) => {
        console.log(err, 'err')
        deleteHandle = json<ActionData>(
          { errors: { status: err, check: new Date() } },
          { status: 400 }
        )
      })
    console.log(deleteHandle, 'status')
    return deleteHandle
  }

  // if (deleteHandle) {
  //   return redirect('/sections')
  // }
}

export default function Tests() {
  const data = useLoaderData() as LoaderData
  if (data.status != 'Success') {
    toast.success('Something went wrong..!')
  }
  return (
    <AdminLayout>
      <TestList tests={data.tests as Test[]} />
    </AdminLayout>
  )
}
