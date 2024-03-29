import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime"
import { redirect, json } from "@remix-run/server-runtime"
import invariant from "tiny-invariant"

import ResultDetailsComponent from "~/components/results/ResultDetails"
import { routes } from "~/constants/route.constants"
import type {
  CandidateTest,
  Candidate,
  CandidateResult,
} from "~/interface/Interface"
import { getAssessmentIdFromCandidateIdAndTestId } from "~/models/assessment.server"
import { getGeneratePdfReport } from "~/services/report.service"
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
    const { sections, candidate, candidateResult } =
      (await getSectionWiseResultsOFIndividualCandidate({
        testId: params?.testId as string,
        candidateId: params?.candidateId as string,
        workspaceId: currentWorkspaceId,
        userId: userId!,
      })) ||
      ({} as CandidateTest & { candidate: Candidate } & {
        candidateResult: CandidateResult
      })
    if (!sections || !candidate) {
      throw new Response("Not Found", { status: 404 })
    }
    return json({
      params,
      sections,
      candidate,
      workspaces,
      currentWorkspaceId,
      candidateResult,
    })
  } catch (error: any) {
    if (error.status === 403) {
      return redirect(routes.unauthorized)
    }
  }
}

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await getUserId(request)
  const currentWorkspaceId = params.workspaceId as string
  const formData = await request.formData()
  const candidateStatus = formData.get("candidateStatus")
  const resultId = formData.get("resultId")
  const report = formData.get("generateReport")
  if (resultId && userId && currentWorkspaceId && candidateStatus) {
    try {
      const updateStatus = await updateCandidateSTATUS({
        id: resultId as string,
        candidateStatus: candidateStatus as string,
        currentWorkspaceId,
        userId: userId!,
      })
      return { updateStatus }
    } catch (error: any) {
      if (error.status === 403) {
        return redirect(routes.unauthorized)
      }
    }
  } else if (report && userId) {
    try {
      const assessmentId = await getAssessmentIdFromCandidateIdAndTestId(
        params?.candidateId as string,
        params?.testId as string
      )

      const report = await getGeneratePdfReport(assessmentId?.id as string)

      return { report }
    } catch (error) {
      throw error
    }
  }
}

const ResultDetails = () => {
  return <ResultDetailsComponent />
}
export default ResultDetails
