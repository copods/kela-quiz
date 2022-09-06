import AdminLayout from '~/components/layouts/AdminLayout'
import { getUserId } from '~/session.server'
import { redirect } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'
import { routes } from '~/constants/route.constants'

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  if (!userId) return redirect(routes.signIn)
  return null
}

export default function Dashboard() {
  return (
    <AdminLayout>
      <div>
        <div>Hey Dashboard</div>
      </div>
    </AdminLayout>
  )
}
