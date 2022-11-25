import type { LoaderFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import AdminLayout from '~/components/layouts/AdminLayout'
import { routes } from '~/constants/route.constants'
import { getUserId } from '~/session.server'

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUserId(request)
  if (!userId) return redirect(routes.signIn)

  const workspaceId = params.workspaceId

  console.log('params', workspaceId)

  return json(null)
}

const WorkspaceWrapper = () => {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  )
}

export default WorkspaceWrapper
