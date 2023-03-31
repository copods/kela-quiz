import { useLoaderData } from "@remix-run/react"
import type { LoaderFunction } from "@remix-run/server-runtime"

import { FeedbackContainer } from "~/components/feedback/FeedbackContainer"
import { getCandidatesFeedback } from "~/models/feedback.server"

export const loader: LoaderFunction = async ({ request, params }) => {
  const userFeedback = await getCandidatesFeedback()

  return userFeedback
}

const Feedback = () => {
  const loaderData = useLoaderData()
  console.log("loader dataa", loaderData)
  return <FeedbackContainer />
}

export default Feedback
