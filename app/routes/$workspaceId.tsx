import { useEffect } from "react"

import type { ActionFunction, LoaderFunction } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"
import { Outlet } from "@remix-run/react"
import { useLoaderData } from "@remix-run/react"

import AdminLayout from "~/components/layouts/AdminLayout"
import { routes } from "~/constants/route.constants"
import { useCommonContext } from "~/context/Common.context"
import { checkUserFeatureAuthorization } from "~/models/authorization.server"
import {
  getDefaultWorkspaceIdForUserQuery,
  getUserWorkspaces,
  verifyWorkspaceId,
} from "~/models/workspace.server"
import { getUserId, getWorkspaceId } from "~/session.server"

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUserId(request)
  if (!userId) return redirect(routes.signIn)

  let currentWorkspaceId = params.workspaceId as string
  const featureAuthorization = await checkUserFeatureAuthorization(
    userId,
    currentWorkspaceId
  )

  const verfiedWorkspaceId = await verifyWorkspaceId({
    userId,
    currentWorkspaceId,
  })

  if (!verfiedWorkspaceId) {
    const lastLoginWorkspaceId = await getWorkspaceId(request)

    if (lastLoginWorkspaceId && lastLoginWorkspaceId != currentWorkspaceId) {
      return redirect(`/${lastLoginWorkspaceId}`)
    }
    const defaultWorkspace = await getDefaultWorkspaceIdForUserQuery(userId)
    currentWorkspaceId = defaultWorkspace?.workspace[0].id as string
    return redirect(`/${currentWorkspaceId}`)
  }

  const workspaces = await getUserWorkspaces(userId as string)

  return json({ workspaces, currentWorkspaceId, featureAuthorization })
}

export const action: ActionFunction = async ({ request }) => {
  return null
}

const WorkspaceWrapper = () => {
  const { featureAuthorization, currentWorkspaceId } = useLoaderData()
  const { setCustomStorage } = useCommonContext()

  useEffect(() => {
    setCustomStorage("authorizationValidations", featureAuthorization)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [featureAuthorization, currentWorkspaceId])

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  )
}

export default WorkspaceWrapper
