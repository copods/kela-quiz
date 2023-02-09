import { json } from "@remix-run/node"
import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime"
import invariant from "tiny-invariant"
import TestDetails from "~/components/tests/TestDetails"
import {
  getAssessmentById,
  getCandidateByAssessId,
  getRequiredUserId,
  getUsersId,
  getWorkspaces,
} from "~/services/assessments.service"

type LoaderData = {
  testPreview: Awaited<ReturnType<typeof getAssessmentById>>
  workspaces: Awaited<ReturnType<typeof getWorkspaces>>
  currentWorkspaceId: string
}
export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUsersId(request)
  const currentWorkspaceId = params.workspaceId as string
  const workspaces = await getWorkspaces(userId as unknown as string)
  invariant(params.testId, "testId not found")
  console.log(params.testId)
  const testPreview = await getAssessmentById(params.testId)
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
  if (testId !== null) {
    let emails: Array<string> = []
    await formData.forEach((fd) => {
      if (fd != "") {
        emails.push(fd as string)
      }
    })
    if (emails.length === 0) {
      return json({
        status: 401,
        message: "statusCheck.noEmailsInvite",
        testId,
      })
    }
    const candidateInviteStatus = await getCandidateByAssessId(
      emails,
      createdById,
      testId
    )

    return json({ candidateInviteStatus, testId })
  }
}
export default function TestsDetailsRoute() {
  return <TestDetails />
}
