import { useEffect } from "react"

import type { ActionFunction } from "@remix-run/node"
import type { LoaderFunction } from "@remix-run/node"
import { redirect } from "@remix-run/node"
import { json } from "@remix-run/node"
import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from "@remix-run/react"
import { useTranslation } from "react-i18next"

import SettingsTabs from "~/components/settings/SettingTab"
import { actions } from "~/constants/action.constants"
import { routes } from "~/constants/route.constants"
import { addWorkspace, getUserWorkspaces } from "~/models/workspace.server"
import { createUserSession, getUserId } from "~/session.server"

export type LoaderData = {
  workspaces: Awaited<ReturnType<typeof getUserWorkspaces>>
  currentWorkspaceId: string
  userId: Awaited<ReturnType<typeof getUserId>>
}
export type ActionData = {
  errors?: {
    title: string
    status: number
  }
  resp?: {
    title: string
    status: number
    workspaceId: string
  }
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUserId(request)
  if (!userId) return redirect(routes.signIn)
  const currentWorkspaceId = params.workspaceId as string
  const workspaces = await getUserWorkspaces(userId as string)
  return json<LoaderData>({
    workspaces,
    currentWorkspaceId,
    userId,
  })
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const action = formData.get("action")
  if (action === actions.switchWorkspace) {
    const workspace = formData.get("workspaceId") as string
    const userId = (await getUserId(request)) as string
    return await createUserSession({
      request,
      workspace,
      userId,
      remember: false,
      redirectTo: `/${workspace}`,
    })
  }
  if (action === actions.addWorkspace) {
    let addHandle = {}
    const workspaceName = formData.get("workspaceName") as string
    const userId = (await getUserId(request)) as string
    if (typeof workspaceName !== "string" || workspaceName.length === 0) {
      return json<ActionData>(
        {
          errors: {
            title: "toastConstants.workspaceNameIsRequired",
            status: 400,
          },
        },
        { status: 400 }
      )
    }
    await addWorkspace(workspaceName, userId)
      .then((res) => {
        addHandle = json<ActionData>(
          {
            resp: {
              title: "toastConstants.workspaceAdded",
              status: 200,
              workspaceId: res.workspaceId,
            },
          },
          { status: 200 }
        )
      })
      .catch((err) => {
        let title = "toastConstants.duplicateWorkspace"
        addHandle = json<ActionData>(
          {
            errors: {
              title,
              status: 400,
            },
          },
          { status: 400 }
        )
      })
    return addHandle
  }
  return null
}

export default function Settings() {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const { currentWorkspaceId } = useLoaderData()

  useEffect(() => {
    if (location.pathname === "/settings") return navigate("/settings/general")
  }, [navigate, location.pathname])
  useEffect(() => {
    const heading = document.getElementById("settings-heading")
    heading?.focus()
  }, [])
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1
          id="settings-heading"
          tabIndex={0}
          role={t("commonConstants.settings")}
          aria-label={t("commonConstants.settings")}
          className="text-3xl font-bold"
        >
          {t("commonConstants.settings")}
        </h1>
      </div>
      <SettingsTabs currentWorkspaceId={currentWorkspaceId} />
      <Outlet />
    </div>
  )
}
