import Workspace from '~/components/settings/Workspace'
import { getUserId } from '~/session.server'
import {
  getActiveOwnerWorkspaces,
  getActiveWorkspaceOwner,
  leaveActiveWorkspace,
} from '~/services/workspace.service'
import type { LoaderFunction, ActionFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useActionData, useLoaderData, useNavigate } from '@remix-run/react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { t } from 'i18next'
import { routes } from '../../../constants/route.constants'

interface LoaderData {
  workspaceOwner: Awaited<ReturnType<typeof getActiveWorkspaceOwner>>
  ownersWorkspaces: Awaited<ReturnType<typeof getActiveOwnerWorkspaces>>
  currentWorkspaceId: string
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const currentWorkspaceId = params.workspaceId as string
  const userId = (await getUserId(request)) as string
  const workspaceOwner = await getActiveWorkspaceOwner(currentWorkspaceId)
  const ownersWorkspaces = await getActiveOwnerWorkspaces(userId)
  return json<LoaderData>({
    workspaceOwner,
    ownersWorkspaces,
    currentWorkspaceId,
  })
}
export const action: ActionFunction = async ({ request, params }) => {
  const workspaceId = params.workspaceId as string
  const userId = (await getUserId(request)) as string
  const response = await leaveActiveWorkspace(workspaceId, userId)
  return response
}
const WorkspaceSetting = () => {
  const actionData = useActionData()
  const workspaceLoaderData = useLoaderData()
  const navigate = useNavigate()
  useEffect(() => {
    if (actionData?.resp?.status === 200) {
      toast.success(t(actionData?.resp?.title))
      navigate(`/${workspaceLoaderData?.ownersWorkspace?.id}${routes.members}`)
    } else if (actionData?.resp?.status === 400) {
      toast.error(t(actionData?.resp?.title))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData?.resp])
  return (
    <div>
      <Workspace />
    </div>
  )
}
export default WorkspaceSetting
