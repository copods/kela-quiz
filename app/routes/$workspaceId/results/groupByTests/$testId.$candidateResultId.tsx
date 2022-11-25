import type { ActionFunction, LoaderFunction } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import invariant from 'tiny-invariant'
import {
  getResultsOfIndividualCandidates,
  getSectionWiseResultsOfIndividualCandidate,
  updateCandidateStatus,
} from '~/models/result.server'
import ResultDetailsComponent from '~/components/results/ResultDetails'
import { getUserWorkspaces } from '~/models/workspace.server'
import { getUserId, getWorkspaceId } from '~/session.server'

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUserId(request)
  const currentWorkspaceId = await getWorkspaceId(request)
  const workspaces = await getUserWorkspaces(userId as string)
  invariant(params.testId, 'resultId not found')
  const candidateResult = await getResultsOfIndividualCandidates({
    id: params.candidateResultId as string,
  })
  const sectionWiseResult = await getSectionWiseResultsOfIndividualCandidate({
    testId: candidateResult?.testId as string,
    candidateTestId: candidateResult?.candidateTestId as string,
  })
  if (!candidateResult) {
    throw new Response('Not Found', { status: 404 })
  }

  return json({
    candidateResult,
    params,
    sectionWiseResult,
    workspaces,
    currentWorkspaceId,
  })
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const candidateStatus = formData.get('candidateStatus')
  const resultId = formData.get('resultId')
  const updateStatus = await updateCandidateStatus({
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
