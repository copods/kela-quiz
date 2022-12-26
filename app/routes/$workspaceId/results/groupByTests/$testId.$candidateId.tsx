import type { ActionFunction, LoaderFunction } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import invariant from 'tiny-invariant'
import {
  getSectionWiseResultsOfIndividualCandidate,
  updateCandidateStatus,
} from '~/models/result.server'
import ResultDetailsComponent from '~/components/results/ResultDetails'
import { getUserWorkspaces } from '~/models/workspace.server'
import { getUserId } from '~/session.server'

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUserId(request)
  const currentWorkspaceId = params.workspaceId as string
  const workspaces = await getUserWorkspaces(userId as string)
  invariant(params.testId, 'resultId not found')

  const candidateTestWiseResult = await getSectionWiseResultsOfIndividualCandidate({
    testId: params?.testId as string,
    candidateTestId: params?.candidateTestId as string,
  })

  return json({
    params,
    candidateTestWiseResult,
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
