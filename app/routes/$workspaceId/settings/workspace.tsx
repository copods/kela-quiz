import { useEffect } from "react"

import type { LoaderFunction, ActionFunction } from "@remix-run/node"
import { redirect, json } from "@remix-run/node"
import { useActionData, useLoaderData, useNavigate } from "@remix-run/react"
import { t } from "i18next"
import { toast } from "react-toastify"

import { routes } from "../../../constants/route.constants"

import Workspace from "~/components/settings/Workspace"
import { checkUserFeatureAuthorization } from "~/models/authorization.server"
import {
  getActiveOwnerWorkspaces,
  getActiveWorkspaceOwner,
  getAllCurrentWorkspaceAdmins,
  getUserWorkspaceService,
  leaveActiveWorkspace,
  updateCurrentUserWorkspace,
  updateCurrentWorkspaceOwner,
} from "~/services/workspace.service"
import { getUserId } from "~/session.server"

interface LoaderData {
  workspaceOwner: Awaited<ReturnType<typeof getActiveWorkspaceOwner>>
  ownersWorkspaces: Awaited<ReturnType<typeof getActiveOwnerWorkspaces>>
  currentWorkspaceId: string
  userWorkspaces: Awaited<ReturnType<typeof getUserWorkspaceService>>
  permission: { [key: string]: { [key: string]: boolean } }
  allAdmins: { fullName: string; email: string }[]
}

export const loader: LoaderFunction = async ({ request, params }) => {
  try {
    const userId = (await getUserId(request)) as string
    const currentWorkspaceId = params.workspaceId as string

    const permission = await checkUserFeatureAuthorization(
      userId,
      currentWorkspaceId
    )
    if (!permission.workspace.read) {
      return redirect(routes.unauthorized)
    }

    const workspaceOwner = await getActiveWorkspaceOwner(currentWorkspaceId)
    const ownersWorkspaces = await getActiveOwnerWorkspaces(userId)
    const userWorkspaces = await getUserWorkspaceService(
      userId,
      currentWorkspaceId
    )
    const allAdmins = (
      await getAllCurrentWorkspaceAdmins(currentWorkspaceId, userId)
    ).map(({ user }) => ({
      fullName: `${user.firstName} ${user.lastName}`,
      email: user.email,
      id: user.id,
    }))

    return json<LoaderData>({
      workspaceOwner,
      ownersWorkspaces,
      currentWorkspaceId,
      userWorkspaces,
      permission,
      allAdmins,
    })
  } catch (error: any) {
    if (error.status === 403) {
      return redirect(routes.unauthorized)
    }
  }
}

const actionConstants = {
  leaveWorksapce: "leaveWorkspace",
  updateWorkspace: "updateWorkspace",
  updateUserWorkspace: "updateUserWorkspace",
  updateOwner: "updateOwner",
}

export const action: ActionFunction = async ({ request, params }) => {
  const workspaceId = params.workspaceId as string
  const currentWorkspaceId = params.workspaceId as string
  const userId = (await getUserId(request)) as string
  const formData = await request.formData()

  const action =
    formData.get(actionConstants.updateWorkspace) ||
    formData.get(actionConstants.leaveWorksapce) ||
    formData.get(actionConstants.updateOwner)

  if (action === actionConstants.updateUserWorkspace) {
    const name = formData.get("name") as string
    const workspaceId = formData.get("workspaceId") as string
    try {
      const updateWorkspace = await updateCurrentUserWorkspace(
        workspaceId,
        name,
        userId
      )
      return updateWorkspace
    } catch (error: any) {
      if (error.status === 403) {
        return redirect(routes.unauthorized)
      }
    }
  } else if (action === actionConstants.updateOwner) {
    const newOwnerId = formData.get("newOwner") as string
    return await updateCurrentWorkspaceOwner(
      userId,
      currentWorkspaceId,
      newOwnerId
    )
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
      actionData !== undefined &&
      actionData?.resp?.status === 200 &&
      actionData?.resp?.title === "settings.workspaceUpdated"
    ) {
      toast.success(t(actionData?.resp?.title))
    } else if (actionData?.resp?.status === 200) {
      toast.success(t(actionData?.resp?.title))
      navigate(`/${workspaceLoaderData?.ownersWorkspace?.id}${routes.members}`)
    } else if (actionData?.resp?.status === 400) {
      toast.error(t(actionData?.resp?.title))
    } else if (actionData?.errors?.status === 400) {
      toast.error(t("toastConstants.ownerTransferOwnerShip"))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData])
  return (
    <div>
      <Workspace />
    </div>
  )
}
export default WorkspaceSetting
