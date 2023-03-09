import type { ActionFunction, LoaderFunction } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"
import { Outlet } from "@remix-run/react"

import AdminLayout from "~/components/layouts/AdminLayout"
import { routes } from "~/constants/route.constants"
import {
  getDefaultWorkspaceIdForUserQuery,
  getUserWorkspaces,
  verifyWorkspaceId,
} from "~/models/workspace.server"
import { updateUserPassword } from "~/services/settings.service"
import { getUserId, getWorkspaceId } from "~/session.server"

export type ActionData = {
  errors?: {
    status?: number
    valid?: string
    passNotMatched?: string
    maximumPasswordLimit?: string
    passShouldNotBeSame?: string
    error?: string
  }
  resp?: {
    title: string
    status: number
  }
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUserId(request)
  if (!userId) return redirect(routes.signIn)
  let currentWorkspaceId = params.workspaceId as string

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

  return json({ workspaces, currentWorkspaceId })
}

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData() // getting formData
  // action will perform if match with specific formData
  const userId = await getUserId(request)
  const oldPassword = formData.get("oldPassword")
  const newPassword = formData.get("newPassword")
  const confirmPasword = formData.get("confirmPassword")

  if (confirmPasword !== newPassword) {
    // checking if newly entered password and confirm password is matched or not
    return json<ActionData>(
      {
        errors: {
          passNotMatched: "settings.passNotMatch",
          status: 400,
        },
      },
      { status: 400 }
    )
  }
  if (typeof newPassword !== "string" || newPassword.length < 8) {
    // checking if newly entered password is less than 8 characters then throws error
    return json<ActionData>(
      {
        errors: {
          maximumPasswordLimit: "settings.minPasswordLimit",
          status: 400,
        },
      },
      { status: 400 }
    )
  }
  if (newPassword === oldPassword) {
    // checking if current and newly entered password is same then throwing a error
    return json<ActionData>(
      {
        errors: {
          passShouldNotBeSame: "settings.passShouldNotBeSame",
          status: 400,
        },
      },
      { status: 400 }
    )
  }
  if (newPassword === confirmPasword) {
    // new password will be update if this condition is true
    const general = await updateUserPassword(
      userId as string,
      newPassword as string,
      oldPassword as string
    )
    if (general instanceof Error) {
      // if old password user entered is not correct which is handled in backend
      return json<ActionData>(
        { errors: { valid: "statusCheck.passIsInvalid" } },
        { status: 400 }
      )
    }
    return general
  }
  return null
}

const WorkspaceWrapper = () => {
  return (
    <>
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    </>
  )
}

export default WorkspaceWrapper
