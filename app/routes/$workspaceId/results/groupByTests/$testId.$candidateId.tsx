import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime"
import { redirect, json } from "@remix-run/server-runtime"
import invariant from "tiny-invariant"

import ResultDetailsComponent from "~/components/results/ResultDetails"
import { routes } from "~/constants/route.constants"
import type { CandidateTest, Candidate } from "~/interface/Interface"
import { HTTP_CODE } from "~/interface/Interface"
import {
  getSectionWiseResultsOFIndividualCandidate,
  getWorkspaces,
  updateCandidateSTATUS,
} from "~/services/results.service"
import { getUserId } from "~/session.server"

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUserId(request)
  const currentWorkspaceId = params.workspaceId as string
  const workspaces = await getWorkspaces(userId as string)
  invariant(params.testId, "resultId not found")
  try {
    const { sections, candidate } =
      (await getSectionWiseResultsOFIndividualCandidate({
        testId: params?.testId as string,
        candidateId: params?.candidateId as string,
        workspaceId: currentWorkspaceId,
        userId: userId!,
      })) || ({} as CandidateTest & { candidate: Candidate })
    if (!sections || !candidate) {
      throw new Response("Not Found", { status: 404 })
    }
    return json({
      params,
      sections,
      candidate,
      workspaces,
      currentWorkspaceId,
    })
  } catch (error: any) {
    if (error.status === HTTP_CODE.ACCESS_DENIED) {
      return redirect(routes.members)
    }
  }
}

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await getUserId(request)
  const currentWorkspaceId = params.workspaceId as string
  const formData = await request.formData()
  const candidateStatus = formData.get("candidateStatus")
  const resultId = formData.get("resultId")
  try {
    const updateStatus = await updateCandidateSTATUS({
      id: resultId as string,
      candidateStatus: candidateStatus as string,
      currentWorkspaceId,
      userId: userId!,
    })
    return { updateStatus }
  } catch (error: any) {
    if (error.status === HTTP_CODE.ACCESS_DENIED) {
      return redirect(routes.members)
    }
  }
}

const ResultDetails = () => {
  return <ResultDetailsComponent />
}
export default ResultDetails
