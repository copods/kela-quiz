import type { LoaderFunction } from "@remix-run/server-runtime"
import { json } from "remix-utils"

import { FeedbackContainer } from "~/components/feedback/FeedbackContainer"
import {
  getAllCandidatesFeedbackCount,
  getAllFeedbacksCounts,
  getCandidatesFeedback,
} from "~/models/feedback.server"

type LoaderData = {
  userFeedback: Awaited<ReturnType<typeof getCandidatesFeedback>>
  feedbackItemsPerPage: number
  feedbackCurrentPage: number
  allCandidatesFeedbackCount: Awaited<
    ReturnType<typeof getAllCandidatesFeedbackCount>
  >
  totalFeedbackCounts: Awaited<ReturnType<typeof getAllFeedbacksCounts>>
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const currentWorkspaceId = params.workspaceId as string

  const query = new URL(request.url).searchParams
  const feedbackItemsPerPage = Math.max(Number(query.get("limit") || 5), 5)
  const feedbackCurrentPage = Math.max(Number(query.get("page") || 1), 1)

  const userFeedback = await getCandidatesFeedback(
    currentWorkspaceId,
    feedbackItemsPerPage,
    feedbackCurrentPage
  )
  const allCandidatesFeedbackCount = await getAllCandidatesFeedbackCount(
    currentWorkspaceId
  )
  const totalFeedbackCounts = await getAllFeedbacksCounts(currentWorkspaceId)

  return json<LoaderData>({
    userFeedback,
    feedbackCurrentPage,
    feedbackItemsPerPage,
    allCandidatesFeedbackCount,
    totalFeedbackCounts,
  })
}

const Feedback = () => {
  return <FeedbackContainer />
}

export default Feedback
