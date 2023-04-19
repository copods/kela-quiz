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

import { version } from "package.json"
import Tabs from "~/components/common-components/Tabs"
import Header from "~/components/header/Header"
import { actions } from "~/constants/action.constants"
import { routes } from "~/constants/route.constants"
import {
  getUserWorkspaceService,
  createWorkspace,
} from "~/services/workspace.service"
import { createUserSession, getUserId } from "~/session.server"

export type LoaderData = {
  workspaces: Awaited<ReturnType<typeof getUserWorkspaceService>>
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
  const workspaces = await getUserWorkspaceService(userId as string)
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
    let addHandle
    const workspaceName = formData.get("workspaceName") as string
    const userId = (await getUserId(request)) as string
    if (typeof workspaceName !== "string" || workspaceName.length === 0) {
      return json<ActionData>(
        {
          errors: {
            title: "commonConstants.workspaceNameIsRequired",
            status: 400,
          },
        },
        { status: 400 }
      )
    }
    addHandle = await createWorkspace(workspaceName, userId)
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
    if (location.pathname === routes.settings)
      return navigate(routes.workspaceSetting)
  }, [navigate, location.pathname])
  useEffect(() => {
    const heading = document.getElementById("settings-heading")
    heading?.focus()
  }, [])

  const VersionOfApplication = () => {
    const splitVersionText = version.split("-development")
    return (
      <span className="text-base font-normal text-gray-600">
        {`${t("settings.version")} ${splitVersionText[0]}`}
      </span>
    )
  }

  const settingsTabs = [
    // {
    //   name: t("tabs.general"),
    //   action: () => navigate(`/${currentWorkspaceId}/settings/general`),
    //   active: location.pathname.includes("/settings/general"),
    // },
    {
      name: t("tabs.workspaces"),
      action: () => navigate(`/${currentWorkspaceId}/settings/workspace`),
      active: location.pathname.includes("/settings/workspace"),
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <Header
        id="settings-heading"
        heading={t("commonConstants.settings")}
        rightChildren={<VersionOfApplication />}
      />
      <div className="flex flex-col gap-5">
        <Tabs tabs={settingsTabs} />
        <Outlet />
      </div>
    </div>
  )
}
