import AdminLayout from '~/components/layouts/AdminLayout'
import { getUserId, getWorkspaceId } from '~/session.server'
import { redirect } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'
import { routes } from '~/constants/route.constants'
import { getUserWorkspaces } from '~/models/workspace.server'
import { json } from '@remix-run/node'
export type LoaderData = {
  workspaces: Awaited<ReturnType<typeof getUserWorkspaces>>
  currentWorkspaceId: Awaited<ReturnType<typeof getWorkspaceId>>
}
export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  if (!userId) return redirect(routes.signIn)
  const currentWorkspaceId = await getWorkspaceId(request)
  const workspaces = await getUserWorkspaces(userId as string)
  return json<LoaderData>({
    workspaces,
    currentWorkspaceId,
  })
}

export default function Settings() {
  return (
    <AdminLayout>
      <div>Hey Settings</div>
    </AdminLayout>
  )
}
