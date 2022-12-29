import Workspace from '~/components/settings/Workspace'
import type { LoaderFunction, ActionFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { getUserId } from '~/session.server'
import { leaveWorkspace } from '~/models/workspace.server'
export const loader: LoaderFunction = async ({ request, params }) => {
  return 1
}
export const action: ActionFunction = async ({ request, params }) => {
  console.log(params)
  const workspaceId = params.workspaceId as string
  const userId = (await getUserId(request)) as string
  console.log('90909090', userId)
  await leaveWorkspace(workspaceId, userId)
  return redirect('/')
}
const WorkspaceSetting = () => {
  return (
    <div>
      <Workspace />
    </div>
  )
}
export default WorkspaceSetting
