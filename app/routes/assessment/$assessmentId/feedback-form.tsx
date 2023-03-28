import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime"
import { redirect } from "@remix-run/server-runtime"

import FeedbackForm from "~/components/assessment/Feedback"
import {
  candidateFeedbackDetails,
  checkIfTestLinkIsValidAndRedirect,
} from "~/services/assessment.service"

export const loader: LoaderFunction = async ({ params, request }) => {
  const candidateNextRoute = await checkIfTestLinkIsValidAndRedirect(
    params.assessmentId as string,
    "feedback-form"
  )
  if (typeof candidateNextRoute === "string") {
    return redirect(candidateNextRoute)
  } else if (candidateNextRoute === null) {
    throw new Response("Not Found", { status: 404 })
  }

  return null
}

export const action: ActionFunction = async ({ params, request }) => {
  try {
    const formData = await request.formData()
    const details = JSON.parse(formData.get("details") as string)
    const assessmentId = params.assessmentId as string
    candidateFeedbackDetails(assessmentId, details.data)
  } catch (err) {
    console.log(err)
  }
  return null
}

const Feedback = () => {
  return <FeedbackForm />
}

export default Feedback
