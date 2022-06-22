import { redirect } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'
import { getUserId } from '~/session.server'

// throw redirect(`/admin/dashboard`);
export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  if (userId) return redirect('/admin/dashboard')
  return null
}

export default function AdminHome() {
  return (
    <div className="flex items-center justify-center h-screen text-xl">
      Hello Admin
    </div>
  )
}
