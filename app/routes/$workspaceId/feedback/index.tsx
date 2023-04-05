import type { LoaderFunction } from "@remix-run/server-runtime"
import { json } from "remix-utils"

import { FeedbackContainer } from "~/components/feedback/FeedbackContainer"
import {
  getAllCandidatesFeedbackCount,
  getAllFeedbacksCounts,
  getAllTestsForFeedbackFilter,
  getCandidatesFeedback,
} from "~/models/feedback.server"

type LoaderData = {
  userFeedback: Awaited<ReturnType<typeof getCandidatesFeedback>>
  feedbackItemsPerPage: number
  feedbackCurrentPage: number
  allCandidatesFeedbackCount: Awaited<
    ReturnType<typeof getAllCandidatesFeedbackCount>
  >
  feedbackType: string
  totalFeedbackCounts: Awaited<ReturnType<typeof getAllFeedbacksCounts>>
  testId: string
  allTests: Awaited<ReturnType<typeof getAllTestsForFeedbackFilter>>
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const currentWorkspaceId = params.workspaceId as string

  const query = new URL(request.url).searchParams
  const feedbackItemsPerPage = Math.max(Number(query.get("limit") || 5), 5)
  const feedbackCurrentPage = Math.max(Number(query.get("page") || 1), 1)
  const feedbackType = query.get("feedbackType") || "all_feedbacks"
  const testId = query.get("testId") || "all_tests"

  const userFeedback = await getCandidatesFeedback(
    currentWorkspaceId,
    feedbackItemsPerPage,
    feedbackCurrentPage,
    feedbackType,
    testId
  )
  const allCandidatesFeedbackCount = await getAllCandidatesFeedbackCount(
    currentWorkspaceId
  )
  const totalFeedbackCounts = await getAllFeedbacksCounts(currentWorkspaceId)
  const allTests = await getAllTestsForFeedbackFilter(currentWorkspaceId)

  return json<LoaderData>({
    userFeedback,
    feedbackCurrentPage,
    feedbackItemsPerPage,
    allCandidatesFeedbackCount,
    feedbackType,
    totalFeedbackCounts,
    testId,
    allTests,
  })
}

const Feedback = () => {
  return <FeedbackContainer />
}

export default Feedback
