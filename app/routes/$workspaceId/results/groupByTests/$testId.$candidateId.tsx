import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime"
import { json } from "@remix-run/server-runtime"
import invariant from "tiny-invariant"
import ResultDetailsComponent from "~/components/results/ResultDetails"
import {
  getSectionWiseResultsOFIndividualCandidate,
  getUsersId,
  getWorkspaces,
  updateCandidateSTATUS,
} from "~/components/services/results.service"
import type { CandidateTest, Candidate } from "~/interface/Interface"

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUsersId(request)
  const currentWorkspaceId = params.workspaceId as string
  const workspaces = await getWorkspaces(userId as string)
  invariant(params.testId, "resultId not found")
  const { sections, candidate } =
    (await getSectionWiseResultsOFIndividualCandidate({
      testId: params?.testId as string,
      candidateId: params?.candidateId as string,
    })) || ({} as CandidateTest & { candidate: Candidate })
  if (!sections || !candidate) {
    throw new Response("Not Found", { status: 404 })
  }
  return json({
    params,
    sections,
    candidate,
    workspaces,
    currentWorkspaceId,
  })
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const candidateStatus = formData.get("candidateStatus")
  const resultId = formData.get("resultId")
  const updateStatus = await updateCandidateSTATUS({
    id: resultId as string,
    candidateStatus: candidateStatus as string,
  })
  return { updateStatus }
  // const section = await createSection({ name, description, createdById })
  //   .then((res) => {
  //    Data>(
  //       { errors: { title, status: 400 } },
  //       { status: 400 }
  //     )
  //   })
  // return section
}

const ResultDetails = () => {
  return <ResultDetailsComponent />
}
export default ResultDetails
