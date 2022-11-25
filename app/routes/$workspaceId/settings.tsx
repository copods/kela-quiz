import { createUserSession, getUserId, getWorkspaceId } from '~/session.server'
import type { ActionFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'
import { routes } from '~/constants/route.constants'
import { addWorkspace, getUserWorkspaces } from '~/models/workspace.server'
import { json } from '@remix-run/node'
import { actions } from '~/constants/action.constants'
import { Outlet, useLocation, useNavigate } from '@remix-run/react'
import SettingsTabs from '~/components/settings/SettingTab'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

export type LoaderData = {
  workspaces: Awaited<ReturnType<typeof getUserWorkspaces>>
  currentWorkspaceId: Awaited<ReturnType<typeof getWorkspaceId>>
  userId: Awaited<ReturnType<typeof getWorkspaceId>>
}
export type ActionData = {
  errors?: {
    title: string
    status: number
  }
  resp?: {
    title: string
    status: number
    workspaceId: string
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  if (!userId) return redirect(routes.signIn)
  const currentWorkspaceId = await getWorkspaceId(request)
  const workspaces = await getUserWorkspaces(userId as string)
  return json<LoaderData>({
    workspaces,
    currentWorkspaceId,
    userId,
  })
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const action = formData.get('action')
  if (action === actions.switchWorkspace) {
    const workspace = formData.get('workspaceId') as string
    const userId = (await getUserId(request)) as string
    console.log('workspace', workspace)
    return await createUserSession({
      request,
      workspace,
      userId,
      remember: false,
      redirectTo: `/${workspace}`,
    })
  }
  if (action === actions.addWorkspace) {
    let addHandle = {}
    const workspaceName = formData.get('workspaceName') as string
    const userId = (await getUserId(request)) as string
    if (typeof workspaceName !== 'string' || workspaceName.length === 0) {
      return json<ActionData>(
        {
          errors: {
            title: 'toastConstants.workspaceNameIsRequired',
            status: 400,
          },
        },
        { status: 400 }
      )
    }
    await addWorkspace(workspaceName, userId)
      .then((res) => {
        addHandle = json<ActionData>(
          {
            resp: {
              title: 'toastConstants.workspaceAdded',
              status: 200,
              workspaceId: res.workspaceId,
            },
          },
          { status: 200 }
        )
      })
      .catch((err) => {
        let title = 'toastConstants.duplicateWorkspace'
        addHandle = json<ActionData>(
          {
            errors: {
              title,
              status: 400,
            },
          },
          { status: 400 }
        )
      })
    return addHandle
  }
  return null
}

export default function Settings() {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (location.pathname === '/settings') return navigate('/settings/general')
  }, [navigate, location.pathname])
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t('commonConstants.settings')}</h1>
      </div>
      <SettingsTabs />
      <Outlet />
    </div>
  )
}
