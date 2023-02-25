import { useEffect } from "react"

import type { LoaderFunction, ActionFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useActionData, useLoaderData, useNavigate } from "@remix-run/react"
import { t } from "i18next"
import { toast } from "react-toastify"

import { routes } from "../../../constants/route.constants"

import Workspace from "~/components/settings/Workspace"
import {
  getActiveOwnerWorkspaces,
  getActiveWorkspaceOwner,
  leaveActiveWorkspace,
  updateCurrentUserWorkspace,
} from "~/services/workspace.service"
import { getUserId } from "~/session.server"

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

const actionConstants = {
  leaveWorksapce: "leaveWorkspace",
  updateWorkspace: "updateWorkspace",
  updateUserWorkspace: "updateUserWorkspace",
}

export const action: ActionFunction = async ({ request, params }) => {
  const workspaceId = params.workspaceId as string
  const userId = (await getUserId(request)) as string
  const formData = await request.formData()

  const action =
    formData.get(actionConstants.updateWorkspace) ||
    formData.get(actionConstants.leaveWorksapce)

  if (action === actionConstants.updateUserWorkspace) {
    const name = formData.get("name") as string
    const workspaceId = formData.get("workspaceId") as string
    const updateWorkspace = await updateCurrentUserWorkspace(workspaceId, name)
    return updateWorkspace
  } else if (action === actionConstants.leaveWorksapce) {
    const response = await leaveActiveWorkspace(workspaceId, userId)
    return response
  }
}
const WorkspaceSetting = () => {
  const actionData = useActionData()
  const workspaceLoaderData = useLoaderData()
  const navigate = useNavigate()

  useEffect(() => {
    if (
      actionData?.resp?.status === 200 &&
      actionData?.resp?.title === "settings.workspaceUpdated"
    ) {
      toast.success(t(actionData?.resp?.title))
    } else if (actionData?.resp?.status === 200) {
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
