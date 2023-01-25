import { useLoaderData, useActionData, useNavigate } from '@remix-run/react'
import type { ActionFunction, LoaderFunction } from '@remix-run/server-runtime'
import { json, redirect } from '@remix-run/server-runtime'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import AddTestComponent from '~/components/tests/AddTest'
import { getAllSections } from '~/models/sections.server'
import { createTest } from '~/models/tests.server'
import { getUserId, requireUserId } from '~/session.server'
import { routes } from '~/constants/route.constants'
import { useTranslation } from 'react-i18next'
import { getUserWorkspaces } from '~/models/workspace.server'
import type { Section } from '@prisma/client'

type LoaderData = {
  sections: Section[]
  status: string
  workspaces: Awaited<ReturnType<typeof getUserWorkspaces>>
  currentWorkspaceId: string
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
export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUserId(request)
  const currentWorkspaceId = params.workspaceId as string
  const workspaces = await getUserWorkspaces(userId as string)
  if (!userId) return redirect(routes.signIn)

  let sections: Array<Section> = []
  let status: string = ''
  await getAllSections('', '', currentWorkspaceId as string)
    .then((res) => {
      sections = res as Section[]
      status = 'statusCheck.success'
    })
    .catch((err) => {
      status = err
    })
  return json<LoaderData>({ sections, status, workspaces, currentWorkspaceId })
}

export const action: ActionFunction = async ({ request, params }) => {
  const createdById = await requireUserId(request)
  const workspaceId = params.workspaceId
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
  await createTest(createdById, workspaceId as string, JSON.parse(data))
    .then((res) => {
      test = json<ActionData>(
        {
          resp: {
            title: 'statusCheck.assessmentAddedSuccessFully',
            status: 200,
          },
        },
        { status: 200 }
      )
    })
    .catch((err) => {
      let title = 'statusCheck.commonError'
      if (err.code === 'P2002') {
        title = 'statusCheck.assessmentAlreadyExist'
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
  const actionData = useActionData() as ActionData
  const navigate = useNavigate()
  useEffect(() => {
    if (actionData) {
      if (actionData.resp?.status === 200) {
        navigate(`/${testData.currentWorkspaceId}${routes.assessments}`)
        toast.success(t(actionData.resp?.title))
      } else if (actionData.errors?.status === 400) {
        toast.error(t(actionData.errors?.title), {
          toastId: actionData.errors?.title,
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData, navigate, t])

  if (t(testData.status) != t('statusCheck.success')) {
    toast.success(t('statusCheck.commonError'))
  }

  return (
    <AddTestComponent
      currentWorkspaceId={testData.currentWorkspaceId}
      sections={testData.sections}
    />
  )
}

export default AddTest
