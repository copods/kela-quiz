import AdminLayout from "~/components/layouts/AdminLayout";
import { getUserId } from '~/session.server'
import { redirect } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'
import { toast } from 'react-toastify';

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  if (!userId) return redirect('/sign-in')
  return null
}


export default function Dashboard() {

  const notify = () => {
    toast.warn("Wow so easy!");
    toast.error("Wow so easy!");
    toast.success("Wow so easy!");
  }
  return (
    <AdminLayout>
      <div>
        <div>Hey Dashboard</div>
        <button onClick={notify}>Hey</button>
      </div>
    </AdminLayout>
  )
}