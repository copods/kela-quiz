import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { checkIfTestLinkIsValidAndRedirect } from '~/utils/assessment.utils'

export const loader: LoaderFunction = async ({ params, request }) => {
  const nextCandidateRoute = await checkIfTestLinkIsValidAndRedirect(
    params?.assessmentId!,
    '/'
  )
  if (typeof nextCandidateRoute === 'string') {
    return redirect(nextCandidateRoute)
  } else if (nextCandidateRoute === null) {
    throw new Response('Not Found', { status: 404 })
  }
  return null
}
