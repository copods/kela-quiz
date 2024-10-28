import type { ActionFunction, LoaderFunction } from "@remix-run/node"
import { redirect } from "@remix-run/node"

import EndAssessment from "~/components/assessment/EndAssessment"
import { routes } from "~/constants/route.constants"
import {
    checkIfTestLinkIsValidAndRedirect,
    updateNextStep,
} from "~/services/assessment.service"

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

export const action: ActionFunction = async ({ params, request }) => {
    const formData = await request.formData()
    const action = formData.get("action")
    if (action === "giveFeedback") {
        await updateNextStep({
            assessmentId: params.assessmentId as string,
            nextRoute: "feedback-form",
            isSection: false,
        })
        redirect(routes.feedbackForm)
    }
    return null
}

export default function EndAssesment() {
    return <EndAssessment />
}
