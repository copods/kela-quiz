import { getUserId, getWorkspaceId } from '~/session.server'
import { ActionFunction, redirect } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import GroupByTests from '~/components/results/GroupByTests'
import { getAllCandidateTests } from '~/models/result.server'
import AdminLayout from '~/components/layouts/AdminLayout'
import { getUserWorkspaces } from '~/models/workspace.server'
type LoaderData = {
  candidateTest: Awaited<ReturnType<typeof getAllCandidateTests>>
  userId: Awaited<ReturnType<typeof getUserId>>
  workspaces: Awaited<ReturnType<typeof getUserWorkspaces>>
  currentWorkspaceId: Awaited<ReturnType<typeof getWorkspaceId>>
}
export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  const currentWorkspaceId = await getWorkspaceId(request)
  const workspaces = await getUserWorkspaces(userId as string)
  if (!userId) return redirect('/sign-in')
  const filter = Object.fromEntries(new URL(request.url).searchParams.entries())
    .data
    ? JSON.parse(
        Object.fromEntries(new URL(request.url).searchParams.entries()).data
      )
    : {}
  const candidateTest = await getAllCandidateTests(
    filter,
    currentWorkspaceId as string
  )
  return json<LoaderData>({
    candidateTest,
    userId,
    workspaces,
    currentWorkspaceId,
  })
}
export const action: ActionFunction = async ({ request }) => {
  // const formData = await request.formData()
  return 'null'
}
export default function Results() {
  return (
    <AdminLayout>
      <GroupByTests />
    </AdminLayout>
  )
}
