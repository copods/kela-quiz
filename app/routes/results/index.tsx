import { getUserId } from '~/session.server'
import { redirect } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import GroupByTests from '~/components/results/GroupByTests'
import { getAllCandidateTests } from '~/models/result.server'
// export type ActionData = {
//   errors?: {
//     firstName?: string
//     lastName?: string
//     email?: string
//     roleId?: string
//     title?: string
//     status?: string
//     check?: Date
//   }
//   resp?: {
//     status?: string
//     check?: Date
//   }
// }
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
export default function ResultsIndex() {
  return <GroupByTests />
}
