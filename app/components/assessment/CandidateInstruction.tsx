import { useLoaderData, useSubmit } from '@remix-run/react'
import {
  candidateExamConstants,
  routeFiles,
  sectionsConstants,
} from '~/constants/common.constants'
import type { SectionInTest, TestSection } from '~/interface/Interface'
import Button from '../form/Button'

import contactSupport from '~/../public/assets/contactSupport.svg'
import checkIcon from '~/../public/assets/checkIcon.svg'

const CandidateInstruction = () => {
  const { firstSection, instructions, candidate } = useLoaderData()
  const candidateSections = instructions?.test?.sections.sort(
    (a: TestSection & { order: number }, b: TestSection & { order: number }) =>
      a.order > b.order ? 1 : b.order > a.order ? -1 : 0
  )
  const submit = useSubmit()
  const startTestForCandidate = () => {
    submit(
      {
        proceedToTest: 'true',
        firstSectionId: firstSection.id,
      },
      { method: 'post' }
    )
  }

  return (
    <div className="flex flex-col items-center justify-center gap-16 py-10">
      <div className="flex flex-col items-center justify-center gap-4">
        <h3 className="text-2xl font-bold text-gray-900">
          {candidateExamConstants.candidateInsWelcome} {candidate.firstName}
        </h3>
        <p className="text-base font-medium text-gray-500">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>
      <div className="flex gap-12">
        <div className="flex w-438 flex-col gap-10 rounded-lg border border-gray-50 bg-white p-10 shadow-sm">
          <h3 className="text-center text-2xl font-bold text-gray-900">
            {routeFiles.sections}
          </h3>
          <div className="flex flex-col gap-6">
            {candidateSections.map((section: SectionInTest, index: number) => {
              return (
                <div
                  key={section?.id}
                  className="flex flex-1 items-center justify-between gap-6 text-gray-700"
                >
                  <div className="flex items-start gap-4">
                    <img src={contactSupport} alt="" className="h-6" />
                    <span className="text-base font-normal text-gray-900">
                      {sectionsConstants.sectionName} {section.order} -
                      {section.section.name}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="flex w-438 flex-col gap-10 rounded-lg border border-gray-50 bg-white p-10 shadow-sm">
          <h3 className="text-center text-2xl font-bold text-gray-900">
            {candidateExamConstants.instructions}
          </h3>
          <div className="flex flex-col gap-6">
            {' '}
            <div className="flex items-start gap-4">
              <img src={checkIcon} alt="" className="h-6" />
              <span className="text-base font-normal text-gray-900">
                The duration of this exam is  30 minutes.
              </span>
            </div>
            <div className="flex items-start gap-4">
              <img src={checkIcon} alt="" className="h-6" />
              <span className="text-base font-normal text-gray-900">
                This is a restricted open book exam.
              </span>
            </div>
            <div className="flex items-start gap-4">
              <img src={checkIcon} alt="" className="h-6" />
              <span className="text-base font-normal text-gray-900">
                There are X questions in this exam and will be presented one at
                a time.
              </span>
            </div>
            <div className="flex items-start gap-4">
              <img src={checkIcon} alt="" className="h-6" />
              <span className="text-base font-normal text-gray-900">
                Each question is worth the same and different marks.
              </span>
            </div>
            <div className="flex items-start gap-4">
              <img src={checkIcon} alt="" className="h-6" />
              <span className="text-base font-normal text-gray-900">
                During this exam you will/won’t be permitted to review previous
                questions.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex gap-2">
          <span>🎉 </span>
          <p className="text-base font-semibold text-gray-900">Best of Luck</p>
        </div>
        <Button
          tabIndex={0}
          id="start"
          className="w-356 py-3"
          varient="primary-solid"
          title={candidateExamConstants.beginAssesment}
          buttonText={candidateExamConstants.beginAssesment}
          onClick={startTestForCandidate}
          aria-label="start"
        />
      </div>
    </div>
  )
}

export default CandidateInstruction
