import type { LoaderFunction } from "@remix-run/node"
import { redirect } from "@remix-run/node"

import EndAssessment from "~/components/assessment/EndAssessment"
import { checkIfTestLinkIsValidAndRedirect } from "~/services/assessment.service"

export const loader: LoaderFunction = async ({ params, request }) => {
  const candidateNextRoute = await checkIfTestLinkIsValidAndRedirect(
    params.assessmentId as string,
    "end"
  )
  if (typeof candidateNextRoute === "string") {
    return redirect(candidateNextRoute)
  } else if (candidateNextRoute === null) {
    throw new Response("Not Found", { status: 404 })
  }

  return null
}

export default function EndAssesment() {
  return <EndAssessment />
}
