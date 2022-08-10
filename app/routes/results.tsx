import AdminLayout from '~/components/layouts/AdminLayout'
import { getUserId } from '~/session.server'
import { redirect } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'
import { Outlet } from '@remix-run/react'

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  if (!userId) return redirect('/sign-in')
  return null
}

export default function Results() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  )
}
