import type { LoaderFunction } from "@remix-run/node"
import { redirect } from "@remix-run/node"

import AlredySubmitted from "~/components/assessment/AlreadySubmitted"
import { checkIfTestLinkIsValidAndRedirect } from "~/utils/assessment.utils"

export const loader: LoaderFunction = async ({ params, request }) => {
  const candidateNextRoute = await checkIfTestLinkIsValidAndRedirect(
    params.assessmentId as string,
    "already-submitted"
  )
  if (typeof candidateNextRoute === "string") {
    return redirect(candidateNextRoute)
  } else if (candidateNextRoute === null) {
    throw new Response("Not Found", { status: 404 })
  }

  return null
}
export default function AlreadySubmitted() {
  return (
    <div>
      <AlredySubmitted />
    </div>
  )
}
