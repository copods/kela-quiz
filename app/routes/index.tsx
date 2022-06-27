import type { LoaderFunction } from '@remix-run/node'
import { getUserId } from '~/session.server'
import { redirect } from '@remix-run/node'

import { useOptionalUser } from '~/utils'

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  if (userId) return redirect('/dashboard')
  return redirect('/sign-in')
}

export default function Index() {
  const user = useOptionalUser()
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      Hello {user?.firstName}
    </main>
  )
}
