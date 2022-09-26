import AdminLayout from '~/components/layouts/AdminLayout'
import { getUserId } from '~/session.server'
import { redirect } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'
import { routes } from '~/constants/route.constants'

import { useLoaderData } from '@remix-run/react'
import {
  createWorkspace,
  getUserNameForWorkspaceCreation,
} from '~/models/user.server'

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  if (!userId) return redirect(routes.signIn)
  const users = await getUserNameForWorkspaceCreation(userId)
  await createWorkspace(users?.firstName as string)
  return users
}

export default function Settings() {
  const users = useLoaderData() as any
  console.log(users, 'settings user')
  return (
    <AdminLayout>
      <div>Hey Settings</div>
    </AdminLayout>
  )
}
