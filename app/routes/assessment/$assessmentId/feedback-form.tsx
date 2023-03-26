import type { LoaderFunction } from "@remix-run/server-runtime"
import { redirect } from "@remix-run/server-runtime"

import FeedbackForm from "~/components/assessment/Feedback"
import { checkIfTestLinkIsValidAndRedirect } from "~/services/assessment.service"

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

const Feedback = () => {
  return <FeedbackForm />
}

export default Feedback
