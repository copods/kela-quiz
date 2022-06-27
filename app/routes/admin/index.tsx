import { redirect } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'
import { getUserId } from '~/session.server'
import { useUser } from '~/utils'

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  if (userId) return redirect('/admin/dashboard')

  return redirect('/login')
}

export default function AdminHome() {
   //const user = useUser();
  return (
    <div className="flex items-center justify-center h-screen text-xl">
      Hello Admin
    </div>
  )
}
