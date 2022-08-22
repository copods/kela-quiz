import { getUserId } from '~/session.server'
import { redirect } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import GroupByTests from '~/components/results/GroupByTests'
import { getAllCandidateTests } from '~/models/result.server'
import AdminLayout from '~/components/layouts/AdminLayout'
type LoaderData = {
  candidateTest: Awaited<ReturnType<typeof getAllCandidateTests>>
  userId: Awaited<ReturnType<typeof getUserId>>
}
export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  if (!userId) return redirect('/sign-in')
  const filter = Object.fromEntries(new URL(request.url).searchParams.entries())
    .data
    ? JSON.parse(
        Object.fromEntries(new URL(request.url).searchParams.entries()).data
      )
    : {}
  const candidateTest = await getAllCandidateTests(filter)
  return json<LoaderData>({ candidateTest, userId })
}
export default function Results() {
  return (
    <AdminLayout>
      <div>
        <GroupByTests />
      </div>
    </AdminLayout>
  )
}
