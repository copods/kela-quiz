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
      test = res
    })
    .catch((err) => {
      test = err
    })
  return json<any>({ test }, { status: 202 })
}

const AddTest = () => {
  const { t } = useTranslation()

  const testData = useLoaderData() as unknown as LoaderData
  const actionData = useActionData() as any
  const navigate = useNavigate()
  useEffect(() => {
    if (actionData?.test.id) {
      toast.success(t('statusCheck.testAddedSuccessFully'))
      navigate(routes.tests)
    } else if (actionData) {
      if (actionData?.test.code == 'P2002') {
        toast.error(t('statusCheck.testAlreadyExist'))
      } else {
        toast.error(t('statusCheck.commonError'))
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
