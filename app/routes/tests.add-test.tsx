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
import { routes } from '~/constants/route.constants'
import { useTranslation } from 'react-i18next'

type LoaderData = {
  sections: Awaited<ReturnType<typeof getAllSections>>
  status: string
}
export type ActionData = {
  errors?: {
    title: string
    status: number
  }
  resp?: {
    title: string
    status: number
  }
}
export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  if (!userId) return redirect(routes.signIn)

  const filter = Object.fromEntries(new URL(request.url).searchParams.entries())
    .data
    ? JSON.parse(
        Object.fromEntries(new URL(request.url).searchParams.entries()).data
      )
    : '{}'

  let sections: Array<Section> = []
  let status: string = ''
  await getAllSections(filter)
    .then((res) => {
      sections = res as Section[]
      status = 'statusCheck.success'
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
      test = json<ActionData>(
        { resp: { title: 'statusCheck.testAddedSuccessFully', status: 200 } },
        { status: 200 }
      )
    })
    .catch((err) => {
      let title = 'statusCheck.commonError'
      if (err.code === 'P2002') {
        title = 'statusCheck.testAlreadyExist'
      }
      test = json<ActionData>(
        {
          errors: {
            title,
            status: 400,
          },
        },
        { status: 400 }
      )
    })
  return test
}

const AddTest = () => {
  const { t } = useTranslation()
  const testData = useLoaderData() as unknown as LoaderData
  const actionData = useActionData() as any
  const navigate = useNavigate()
  useEffect(() => {
    if (actionData) {
      if (actionData.resp?.status === 200) {
        navigate(routes.tests)
        toast.success(t(actionData.resp?.title))
      } else if (actionData.errors?.status === 400) {
        toast.error(t(actionData.errors?.title), {
          toastId: actionData.errors?.title,
        })
      }
    }
  }, [actionData, navigate, t])

  if (t(testData.status) != t('statusCheck.success')) {
    toast.success(t('statusCheck.commonError'))
  }

  return (
    <AdminLayout>
      <AddTestComponent sections={testData.sections} />
    </AdminLayout>
  )
}

export default AddTest
