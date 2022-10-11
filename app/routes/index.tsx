import type { LoaderFunction } from '@remix-run/node'
import { getUserId } from '~/session.server'
import { redirect } from '@remix-run/node'
import Logo from '~/components/Logo'
import { Link } from 'react-router-dom'
import { routes } from '~/constants/route.constants'

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  if (userId) return redirect(routes.members)
  return redirect(routes.signIn)
}

export default function Index() {
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <Link tabIndex={0} to={routes.members}>
        <Logo width="192" height="192" />
      </Link>
    </main>
  )
}
