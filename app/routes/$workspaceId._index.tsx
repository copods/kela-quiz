import { redirect } from "@remix-run/node"
import type { LoaderFunction } from "@remix-run/node"

export const loader: LoaderFunction = async ({ request, params }) => {
    return redirect(`${params.workspaceId}/members`)
}

const WorkspaceWrapper = () => {
    return <div>Hi Workspace</div>
}

export default WorkspaceWrapper
