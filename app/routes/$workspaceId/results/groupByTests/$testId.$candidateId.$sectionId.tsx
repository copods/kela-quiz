import { redirect, json } from "@remix-run/node"
import type { LoaderFunction } from "@remix-run/server-runtime"

import ResultDetailBySections from "~/components/results/ResultDetailBySections"
import { routes } from "~/constants/route.constants"
import { HTTP_CODE } from "~/interface/Interface"
import { getResultDetailBySection } from "~/models/result.server"
import { getUserId } from "~/session.server"

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
  const userId = await getUserId(request)
  const currentWorkspaceId = params.workspaceId as string
  try {
    const sectionDetail = await getResultDetailBySection(
      params?.sectionId!,
      userId!,
      currentWorkspaceId
    )
    return json<LoaderData>({ params, sectionDetail })
  } catch (error: any) {
    if (error.status === HTTP_CODE.ACCESS_DENIED) {
      return redirect(routes.members)
    }
  }
}
const ResultDetail = () => {
  return (
    <>
      <ResultDetailBySections />
    </>
  )
}
export default ResultDetail
