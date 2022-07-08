import type { LoaderFunction } from '@remix-run/node'
import { getUserId } from '~/session.server'
import { redirect } from '@remix-run/node'

import { useOptionalUser } from '~/utils'
import Logo from '~/components/Logo'
import { Link } from 'react-router-dom'

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  if (userId) return redirect('/dashboard')
  return redirect('/sign-in')
}

export default function Index() {
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <Link to={'/dashboard'}>
        < Logo width='192' height='192' />
      </Link>
    </main >
  )
}
