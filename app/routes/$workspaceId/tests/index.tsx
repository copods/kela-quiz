import { json } from "@remix-run/node"
import type { LoaderFunction } from "@remix-run/server-runtime"
import {
  getALLSections,
  getALLUsers,
  getWorkspaces,
} from "~/services/tests.service"
import { getUserId } from "~/session.server"

type LoaderData = {
  sections: Awaited<ReturnType<typeof getALLSections>>
  users: Awaited<ReturnType<typeof getALLUsers>>
  workspaces: Awaited<ReturnType<typeof getWorkspaces>>
  currentWorkspaceId: string
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUserId(request)
  const currentWorkspaceId = params.workspaceId as string
  const workspaces = await getWorkspaces(userId as string)
  const sections = await getALLSections(currentWorkspaceId as string)
  const users = await getALLUsers(currentWorkspaceId)
  return json<LoaderData>({ sections, users, workspaces, currentWorkspaceId })
}

export default function Section() {
  return (
    <div className="flex h-full w-full flex-col gap-6 overflow-auto rounded-lg border border-gray-200 bg-white px-9 py-6">
      Select any section to see its details....
    </div>
  )
}
