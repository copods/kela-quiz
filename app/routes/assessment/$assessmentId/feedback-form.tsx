import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime"
import { redirect } from "@remix-run/server-runtime"
import { json } from "remix-utils"

import FeedbackForm from "~/components/assessment/Feedback"
import {
  checkIfFeedbackAlreadySubmitted,
  getAssessmentName,
} from "~/models/assessment.server"
import {
  setCandidateFeedbackDetails,
  checkIfTestLinkIsValidAndRedirect,
} from "~/services/assessment.service"

export const loader: LoaderFunction = async ({ params, request }) => {
  const candidateNextRoute = await checkIfTestLinkIsValidAndRedirect(
    params.assessmentId as string,
    "feedback-form"
  )
  const assessmentName = await getAssessmentName(params.assessmentId as string)

  const feedbackSubmittedAlready = await checkIfFeedbackAlreadySubmitted(
    params.assessmentId as string
  )

  if (typeof candidateNextRoute === "string") {
    return redirect(candidateNextRoute)
  } else if (candidateNextRoute === null) {
    throw new Response("Not Found", { status: 404 })
  }

  return json({ feedbackSubmittedAlready, assessmentName })
}

export const action: ActionFunction = async ({ params, request }) => {
  try {
    const formData = await request.formData()
    const details = JSON.parse(formData.get("details") as string)
    const assessmentId = params.assessmentId as string
    const feedbackSubmitted = await setCandidateFeedbackDetails(
      assessmentId,
      details.data
    )
    return feedbackSubmitted
  } catch (err) {
    console.log(err)
  }
  return null
}

const Feedback = () => {
  return <FeedbackForm />
}

export default Feedback
