import { useLoaderData, useSubmit } from '@remix-run/react'
import {
  candidateExamConstants,
  routeFiles,
  sectionsConstants,
} from '~/constants/common.constants'
import type { SectionInTest, TestSection } from '~/interface/Interface'
import Button from '../form/Button'
// import sanitizeHtml from 'sanitize-html'
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
    // <div className="h-full flex-col overflow-y-auto">
    //   <div>
    //     <div
    //       className="pb-9 text-base text-gray-700"
    //       dangerouslySetInnerHTML={{
    //         __html: sanitizeHtml(instructions?.test?.description),
    //       }}
    //     />
    //   </div>
    //   <div>
    //     <h1 className="pb-4 text-2xl font-semibold text-gray-800">
    //       {routeFiles.sections}
    //     </h1>
    //     {/* Sections */}
    //     <div className="flex flex-col gap-4">
    //       {candidateSections.map((section: SectionInTest, index: number) => {
    //         return (
    //           <div
    //             key={section?.id}
    //             className="flex max-w-2xl flex-1 items-center justify-between gap-6 rounded-lg border border-gray-300	py-3 px-4 text-gray-700"
    //           >
    //             <div className="text-base font-semibold text-gray-700">
    //               {section.order}. {section.section.name}
    //             </div>
    //             <div className="flex gap-6 text-sm text-gray-700">
    //               <span>
    //                 {section.totalQuestions} {candidateExamConstants.questions}
    //               </span>
    //               <span>
    //                 {section.timeInSeconds / 60}{' '}
    //                 {candidateExamConstants.minutes}
    //               </span>
    //             </div>
    //           </div>
    //         )
    //       })}
    //     </div>
    //     {/* Instruction */}
    //     <div className="flex flex-col gap-4">
    //       <h1 className="mt-8 text-2xl font-semibold text-gray-800">
    //         {candidateExamConstants.instructions}
    //       </h1>
    //       <ul className="list-disc">
    //         <li>You cannot traverse the sections.</li>
    //         <li>You can traverse the questions in particular section</li>
    //       </ul>
    //       <div className="flex">
    //         <Button
    //           className="mt-8 h-12 w-52"
    //           varient="primary-solid"
    //           title={candidateExamConstants.beginAssesment}
    //           buttonText={candidateExamConstants.beginAssesment}
    //           onClick={startTestForCandidate}
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="flex flex-col items-center justify-center gap-16 pt-12">
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
        <div className="flex min-w-109 flex-col gap-10 rounded-lg border border-gray-50 bg-white p-10 pb-28 shadow-sm">
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
                  <div className="flex items-center gap-4">
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
        <div className="flex min-w-109 flex-col gap-10 rounded-lg border border-gray-50 bg-white p-10 pb-28 shadow-sm">
          <h3 className="text-center text-2xl font-bold text-gray-900">
            {candidateExamConstants.instructions}
          </h3>
          <div className="flex flex-col gap-6">
            {' '}
            <div className="flex items-center gap-4">
              <img src={checkIcon} alt="" className="h-6" />
              <span className="text-base font-normal text-gray-900">
                The duration of this exam is  30 minutes.
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
