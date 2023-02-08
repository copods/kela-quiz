import { json } from "@remix-run/node"
import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime"
import invariant from "tiny-invariant"
import TestDetails from "~/components/tests/TestDetails"
import { getTestById } from "~/models/tests.server"
import { getUserWorkspaces } from "~/models/workspace.server"
import {
  createCandidateByAssessId,
  getRequiredUserId,
  getUsersId,
  getWorkspaces,
} from "~/services/assessments.service"

type LoaderData = {
  testPreview: Awaited<ReturnType<typeof getTestById>>
  workspaces: Awaited<ReturnType<typeof getUserWorkspaces>>
  currentWorkspaceId: string
}
export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUsersId(request)
  const currentWorkspaceId = params.workspaceId as string
  const workspaces = await getWorkspaces(userId as unknown as string)
  invariant(params.testId, "testId not found")
  const testPreview = await getTestById({ id: params.testId })
  if (!testPreview) {
    throw new Response("Not Found", { status: 404 })
  }

  return json<LoaderData>({ testPreview, workspaces, currentWorkspaceId })
}
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const createdById = await getRequiredUserId(request)
  const testId = formData.get("inviteCandidates") as string
  formData.delete("inviteCandidates")

  // creating candidate for assessment
  const response = await createCandidateByAssessId(
    testId,
    createdById,
    formData
  )
  return response
}
export default function TestsDetailsRoute() {
  return <TestDetails />
}
