import Workspace from '~/components/settings/Workspace'
import type { LoaderFunction, ActionFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { getUserId } from '~/session.server'
import {
  getCurrentWorkspaceOwner,
  getOwnersWorkspace,
  leaveWorkspace,
} from '~/models/workspace.server'
import { useActionData, useLoaderData, useNavigate } from '@remix-run/react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { t } from 'i18next'
import { routes } from '../../../constants/route.constants'
interface LoaderData {
  workspaceOwner: Awaited<ReturnType<typeof getCurrentWorkspaceOwner>>
  ownersWorkspace: Awaited<ReturnType<typeof getOwnersWorkspace>>
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
  const ownersWorkspace = await getOwnersWorkspace(userId)
  return json<LoaderData>({
    workspaceOwner,
    ownersWorkspace,
    currentWorkspaceId,
  })
}
export const action: ActionFunction = async ({ request, params }) => {
  const workspaceId = params.workspaceId as string
  const userId = (await getUserId(request)) as string
  let response = null
  await leaveWorkspace(workspaceId, userId)
    .then((res) => {
      response = json<ActionData>(
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
      response = json<ActionData>(
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
