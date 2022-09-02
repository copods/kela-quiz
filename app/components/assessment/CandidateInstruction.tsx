import { useLoaderData, useSubmit } from '@remix-run/react'
import {
  candidateExamConstants,
  routeFiles,
} from '~/constants/common.constants'
import type { SectionInTest, TestSection } from '~/interface/Interface'
import Button from '../form/Button'

const CandidateInstruction = () => {
  const { firstSection, instructions } = useLoaderData()

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
    <div className="h-full flex-col overflow-y-auto">
      <div>
        <div
          className="pb-9 text-base text-gray-700"
          dangerouslySetInnerHTML={{
            __html: instructions?.test?.description,
          }}
        />
      </div>
      <div>
        <h1 className=" pb-4 text-2xl font-semibold leading-8 text-gray-800">
          {routeFiles.sections}
        </h1>
        {/* Sections */}
        <div className="flex flex-col gap-4">
          {candidateSections.map((section: SectionInTest, index: number) => {
            return (
              <div
                key={section?.id}
                className="flex max-w-2xl flex-1 items-center justify-between gap-6 rounded-lg border border-gray-300	py-3 px-4 text-gray-700"
              >
                <div className="text-base font-semibold text-gray-700">
                  {section.order}. {section.section.name}
                </div>
                <div className="flex gap-6 text-sm text-gray-700">
                  <span>
                    {section.totalQuestions} {candidateExamConstants.questions}
                  </span>
                  <span>
                    {section.timeInSeconds / 60}{' '}
                    {candidateExamConstants.minutes}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
        {/* Instruction */}
        <div className="flex flex-col gap-4">
          <h1 className="mt-8 text-2xl font-semibold leading-8 text-gray-800">
            {candidateExamConstants.instructions}
          </h1>
          <ul className="list-disc">
            <li>You cannot traverse the sections.</li>
            <li>You can traverse the questions in particular section</li>
          </ul>
          <div className="flex">
            <Button 
            className='h-12 w-52 mt-8'
            varient='primary-solid'
            buttonText={candidateExamConstants.beginAssesment}
            onClick={startTestForCandidate}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandidateInstruction
