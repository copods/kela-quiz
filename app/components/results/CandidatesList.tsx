import { useLoaderData } from '@remix-run/react'
import {
  commonConstants,
  members,
  resultConstants,
  testsConstants,
} from '~/constants/common.constants'
import type { Candidate, CandidateResult, User } from '~/interface/Interface'
import AttendedCandidateListItem from './AttendedCandidateListItem'

const CandidatesList = () => {
  const { candidatesOfTest, params } = useLoaderData()
  const testData = candidatesOfTest?.candidateTest

  const getCandidateResult = () => {
    let resultData = []
    for (let i = 0; i < testData.length; i++) {
      for (let j = 0; j < testData[i].candidateResult.length; j++) {
        resultData.push({
          candidateId: testData[i].candidateResult[j].candidateTestId,
          candidatePercent: parseInt(
            (
              (testData[i].candidateResult[j].correctQuestion /
                testData[i].candidateResult[j].totalQuestion) *
              100
            ).toFixed(2)
          ),
        })
      }
    }
    return resultData
  }

  return (
    <div className="bg-gray-50 pb-4">
      <div className="bg-tableHeader rounded-lg border border-solid border-gray-200 shadow-base">
        <div className="grid grid-cols-12 gap-3 py-4 px-12">
          <span className="col-span-1 text-sm font-semibold text-gray-500">
            {resultConstants.srNo}
          </span>
          <span className="col-span-3 text-sm font-semibold text-gray-500">
            {members.name}
          </span>
          <span className="col-span-4 text-sm font-semibold text-gray-500">
            {commonConstants.email}
          </span>
          <span className="col-span-2 text-sm font-semibold text-gray-500">
            {resultConstants.invitedBy}
          </span>
          <span className="col-span-1 text-sm font-semibold text-gray-500">
            {resultConstants.result}
          </span>
          <span className="col-span-1 text-sm font-semibold text-gray-500">
            {resultConstants.status}
          </span>
        </div>
        {testData?.map(
          (
            candidate: CandidateResult & {
              candidate: Candidate & {
                createdBy: User
              }
              candidateResult: Array<CandidateResult>
            },
            i: number
          ) => {
            const getCandidatePercent = () => {
              for (const el of getCandidateResult()) {
                if (el.candidateId === candidate?.id) {
                  return el.candidatePercent
                }
              }
            }

            return (
              <div
                key={candidate.id}
                className="memberRow col-span-10 grid rounded-lg"
              >
                <AttendedCandidateListItem
                  id={candidate?.id}
                  testId={params.testId}
                  candidateResultId={candidate?.candidateResult[0]?.id}
                  email={candidate?.candidate?.email}
                  invitedBy={`${candidate?.candidate?.createdBy?.firstName} ${candidate?.candidate?.createdBy?.lastName}`}
                  name={`${
                    candidate?.candidate?.firstName
                      ? candidate?.candidate?.firstName
                      : ''
                  } ${
                    candidate?.candidate?.lastName
                      ? candidate?.candidate?.lastName
                      : ''
                  }`}
                  result={getCandidatePercent() as number}
                  review={candidate?.isQualified}
                  index={i + 1}
                  endAt={candidate?.endAt}
                />
              </div>
            )
          }
        )}
        {testData.length === 0 && (
          <div className="flex justify-center rounded-b-lg bg-white p-7">
            {testsConstants.noCandidateForTest}
          </div>
        )}
      </div>
    </div>
  )
}

export default CandidatesList
