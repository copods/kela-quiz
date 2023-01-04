import Workspace from '~/components/settings/Workspace'
import type { LoaderFunction, ActionFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { getUserId } from '~/session.server'
import {
  getCurrentWorkspaceOwner,
  getOwnersWorkspaces,
  leaveWorkspace,
} from '~/models/workspace.server'
import { useActionData, useLoaderData, useNavigate } from '@remix-run/react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { t } from 'i18next'
import { routes } from '../../../constants/route.constants'
interface LoaderData {
  workspaceOwner: Awaited<ReturnType<typeof getCurrentWorkspaceOwner>>
  ownersWorkspaces: Awaited<ReturnType<typeof getOwnersWorkspaces>>
  currentWorkspaceId: string
}
export type ActionData = {
  errors?: {
    title: string
    status: number
  }
  resp?: {
    title: string
    status: number
  }
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const currentWorkspaceId = params.workspaceId as string
  const userId = (await getUserId(request)) as string
  const workspaceOwner = await getCurrentWorkspaceOwner(currentWorkspaceId)
  const ownersWorkspaces = await getOwnersWorkspaces(userId)
  return json<LoaderData>({
    workspaceOwner,
    ownersWorkspaces,
    currentWorkspaceId,
  })
}
export const action: ActionFunction = async ({ request, params }) => {
  const workspaceId = params.workspaceId as string
  const userId = (await getUserId(request)) as string
  const response = await leaveWorkspace(workspaceId, userId)
    .then((res) => {
      return json<ActionData>(
        {
          resp: {
            title: 'members.workspaceLeft',
            status: 200,
          },
        },
        { status: 200 }
      )
    })
    .catch((err) => {
      let title = 'statusCheck.commonError'
      return json<ActionData>(
        {
          errors: {
            title,
            status: 400,
          },
        },
        { status: 400 }
      )
    })
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
