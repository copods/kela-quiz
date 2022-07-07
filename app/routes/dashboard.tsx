import AdminLayout from '~/components/layouts/AdminLayout'
import { getUserId } from '~/session.server'
import { redirect } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'
import { toast } from 'react-toastify'

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  if (!userId) return redirect('/sign-in')
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
