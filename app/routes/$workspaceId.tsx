import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import AdminLayout from '~/components/layouts/AdminLayout'
import { routes } from '~/constants/route.constants'
import {
  getDefaultWorkspaceIdForUserQuery,
  getUserWorkspaces,
  verifyWorkspaceId,
} from '~/models/workspace.server'
import { getUserId, getWorkspaceId } from '~/session.server'

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUserId(request)
  if (!userId) return redirect(routes.signIn)

  let currentWorkspaceId = params.workspaceId as string

  const verfiedWorkspaceId = await verifyWorkspaceId({
    userId,
    currentWorkspaceId,
  })

  if (!verfiedWorkspaceId) {
    const lastLoginWorkspaceId = await getWorkspaceId(request)

    if (lastLoginWorkspaceId && lastLoginWorkspaceId != currentWorkspaceId) {
      return redirect(`/${lastLoginWorkspaceId}`)
    }
    const defaultWorkspace = await getDefaultWorkspaceIdForUserQuery(userId)
    currentWorkspaceId = defaultWorkspace?.workspace[0].id as string
    return redirect(`/${currentWorkspaceId}`)
  }

  const workspaces = await getUserWorkspaces(userId as string)


  return json({ workspaces, currentWorkspaceId })
}

export const action: ActionFunction = async ({ request }) => {
  return null
}

const WorkspaceWrapper = () => {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  )
}

export default WorkspaceWrapper
