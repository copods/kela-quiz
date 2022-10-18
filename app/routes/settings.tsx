import AdminLayout from '~/components/layouts/AdminLayout'
import { getUserId, getWorkspaceId, switchWorkspace } from '~/session.server'
import type { ActionFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'
import { routes } from '~/constants/route.constants'
import { addWorkspace, getUserWorkspaces } from '~/models/workspace.server'
import { json } from '@remix-run/node'
import { actions } from '~/constants/action.constants'

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
    const workspaceId = formData.get('workspaceId') as string
    const userId = (await getUserId(request)) as string
    return await switchWorkspace({
      request,
      workspaceId,
      userId,
    })
  }
  if (action === actions.addWorkspace) {
    let addHandle
    const workspaceName = formData.get('workspaceName') as string
    const userId = (await getUserId(request)) as string
    if (typeof workspaceName !== 'string' || workspaceName.length === 0) {
      return json<ActionData>(
        { errors: { title: 'toastConstants.workspaceRequired', status: 400 } },
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
  return (
    <AdminLayout>
      <div>Hey Settings</div>
    </AdminLayout>
  )
}
