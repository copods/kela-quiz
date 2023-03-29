import type { LoaderFunction } from "@remix-run/node"
import { redirect } from "@remix-run/node"

import AlredySubmitted from "~/components/assessment/AlreadySubmitted"
import { checkIfFeedbackAlreadySubmitted } from "~/models/assessment.server"
import { checkIfTestLinkIsValidAndRedirect } from "~/services/assessment.service"

export const loader: LoaderFunction = async ({ params, request }) => {
  const candidateNextRoute = await checkIfTestLinkIsValidAndRedirect(
    params.assessmentId as string,
    "already-submitted"
  )
  const feedbackSubmittedAlready = await checkIfFeedbackAlreadySubmitted(
    params.assessmentId as string
  )
  if (typeof candidateNextRoute === "string") {
    return redirect(candidateNextRoute)
  } else if (candidateNextRoute === null) {
    throw new Response("Not Found", { status: 404 })
  }

  return feedbackSubmittedAlready
}
export default function AlreadySubmitted() {
  return (
    <div>
      <AlredySubmitted />
    </div>
  )
}
