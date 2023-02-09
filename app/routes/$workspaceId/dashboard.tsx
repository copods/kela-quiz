import { redirect } from "@remix-run/node"
import type { LoaderFunction } from "@remix-run/node"

import { routes } from "~/constants/route.constants"
import { getUserWorkspaces } from "~/models/workspace.server"
import { getUserId } from "~/session.server"

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUserId(request)
  const currentWorkspaceId = params.workspaceId
  if (!userId) return redirect(routes.signIn)
  const workspaces = await getUserWorkspaces(userId)
  return {
    workspaces,
    currentWorkspaceId,
    userId,
  }
}

export default function Dashboard() {
  return (
    <div>
      <div>Hey Dashboard</div>
    </div>
  )
}
