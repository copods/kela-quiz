import { json } from "@remix-run/server-runtime"
import type { LoaderFunction } from "@remix-run/server-runtime"

import ResultDetailBySections from "~/components/results/ResultDetailBySections"
import { getResultDetailBySection } from "~/models/result.server"

export type LoaderData = {
  sectionDetail: Awaited<ReturnType<typeof getResultDetailBySection>>
  params: {
    workspaceId?: string
    testId?: string
    candidateId?: string
    sectionId?: string
  }
}
export const loader: LoaderFunction = async ({ request, params }) => {
  const sectionDetail = await getResultDetailBySection(params?.sectionId)
  return json<LoaderData>({ params, sectionDetail })
}
const ResultDetail = () => {
  return (
    <>
      <ResultDetailBySections />
    </>
  )
}
export default ResultDetail
