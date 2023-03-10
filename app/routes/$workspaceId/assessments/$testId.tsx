import { json } from "@remix-run/node"
import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime"
import { redirect } from "@remix-run/server-runtime"
import invariant from "tiny-invariant"

import TestDetails from "~/components/tests/TestDetails"
import { routes } from "~/constants/route.constants"
import { checkUserFeatureAuthorization } from "~/models/authorization.server"
import {
  getAssessmentById,
  getCandidateByAssessmentId,
  getWorkspaces,
} from "~/services/assessments.service"
import { getUserId, requireUserId } from "~/session.server"

type LoaderData = {
  testPreview: Awaited<ReturnType<typeof getAssessmentById>>
  workspaces: Awaited<ReturnType<typeof getWorkspaces>>
  currentWorkspaceId: string
  permission: { [key: string]: { [key: string]: boolean } }
}
export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUserId(request)
  const currentWorkspaceId = params.workspaceId as string

  const permission = await checkUserFeatureAuthorization(
    userId!,
    currentWorkspaceId
  )
  if (!permission.assessments.read) {
    return redirect(routes.unauthorized)
  }

  const workspaces = await getWorkspaces(userId as string)
  invariant(params.testId, "testId not found")
  const testPreview = await getAssessmentById({ id: params.testId })
  if (!testPreview) {
    throw new Response("Not Found", { status: 404 })
  }

  return json<LoaderData>({
    testPreview,
    workspaces,
    currentWorkspaceId,
    permission,
  })
}
export const action: ActionFunction = async ({ request, params }) => {
  const userId = await getUserId(request)
  const currentWorkspaceId = params.workspaceId as string
  const formData = await request.formData()
  const createdById = await requireUserId(request)
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
    try {
      const candidateInviteStatus = await getCandidateByAssessmentId({
        emails,
        createdById,
        testId,
        userId: userId!,
        workspaceId: currentWorkspaceId,
      })

      return json({ candidateInviteStatus, testId })
    } catch (error: any) {
      if (error.status === 403) {
        return redirect(routes.unauthorized)
      }
    }
  }
}
export default function TestsDetailsRoute() {
  return <TestDetails />
}
