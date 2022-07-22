import { useLoaderData, useActionData, useNavigate } from '@remix-run/react'
import type { ActionFunction, LoaderFunction } from '@remix-run/server-runtime'
import { json, redirect } from '@remix-run/server-runtime'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import type { Section } from '~/interface/Interface'
import AdminLayout from '~/components/layouts/AdminLayout'
import AddTestComponent from '~/components/tests/AddTest'
import { getAllSections } from '~/models/sections.server'
import { createTest } from '~/models/tests.server'
import { getUserId, requireUserId } from '~/session.server'

type LoaderData = {
  sections: Awaited<ReturnType<typeof getAllSections>>
  status: string
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  if (!userId) return redirect('/sign-in')

  const filter = Object.fromEntries(new URL(request.url).searchParams.entries())
    .data
    ? JSON.parse(
        Object.fromEntries(new URL(request.url).searchParams.entries()).data
      )
    : {}

  let sections: Array<Section> = []
  let status: string = ''
  await getAllSections(filter)
    .then((res) => {
      sections = res
      status = 'success'
    })
    .catch((err) => {
      status = err
    })
  return json<LoaderData>({ sections, status })
}

export const action: ActionFunction = async ({ request }) => {
  const createdById = await requireUserId(request)
  const formData = await request.formData()
  const data:
    | {
        name: string
        description: string
        sections: Array<{
          sectionId: string
          totalQuestions: number
          timeInSeconds: number
        }>
      }
    | any = formData.get('data')

  let test = null
  await createTest(createdById, JSON.parse(data))
    .then((res) => {
      test = res
    })
    .catch((err) => {
      test = err
    })
  return json<any>({ test }, { status: 202 })
}

const AddTest = () => {
  const data = useLoaderData() as unknown as LoaderData
  const actionData = useActionData() as any
  const navigate = useNavigate()
  useEffect(() => {
    if (actionData?.test.id) {
      toast.success('Test added successfully..')
      navigate('/tests')
    } else if (actionData) {
      toast.error('Something went wrong..!')
    }
  }, [actionData, navigate])

  if (data.status != 'success') {
    toast.success('Something went wrong..!')
  }

  return (
    <AdminLayout>
      <AddTestComponent sections={data.sections} />
      {/* <div>hi</div>  */}
    </AdminLayout>
  )
}

export default AddTest
