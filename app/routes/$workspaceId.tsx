import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import AdminLayout from '~/components/layouts/AdminLayout'
import { routes } from '~/constants/route.constants'
import { getUserWorkspaces } from '~/models/workspace.server'
import { getUserId } from '~/session.server'

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUserId(request)
  if (!userId) return redirect(routes.signIn)

  const currentWorkspaceId = params.workspaceId
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
