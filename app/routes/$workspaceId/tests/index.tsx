import { json } from "@remix-run/node"
import type { LoaderFunction } from "@remix-run/server-runtime"

import { getAllSections } from "~/models/sections.server"
import { getAllUsers } from "~/models/user.server"
import { getUserWorkspaces } from "~/models/workspace.server"
import { getUserId } from "~/session.server"

type LoaderData = {
  sections: Awaited<ReturnType<typeof getAllSections>>
  users: Awaited<ReturnType<typeof getAllUsers>>
  workspaces: Awaited<ReturnType<typeof getUserWorkspaces>>
  currentWorkspaceId: string
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUserId(request)
  const currentWorkspaceId = params.workspaceId as string
  const workspaces = await getUserWorkspaces(userId as string)
  const sections = await getAllSections("", "", currentWorkspaceId as string)
  const users = await getAllUsers({ currentWorkspaceId })
  return json<LoaderData>({ sections, users, workspaces, currentWorkspaceId })
}

export default function Section() {
  return (
    <div className="flex h-full w-full flex-col gap-6 overflow-auto rounded-lg border border-gray-200 bg-white px-9 py-6">
      Select any section to see its details....
    </div>
  )
}
