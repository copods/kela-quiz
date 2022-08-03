import { useLoaderData, useSubmit } from '@remix-run/react'
import type { SectionInTest } from '~/interface/Interface'

export default function CandidateInstruction() {
  const candidateInstrution = useLoaderData()

  const submit = useSubmit()

  const startTestForCandidate = () => {
    submit(
      {
        proceedToTest: 'true',
        firstSectionId: candidateInstrution.test.sections[0].id,
      },
      { method: 'post' }
    )
  }
  console.log(candidateInstrution.test)
  return (
    <div className="h-full flex-col overflow-y-auto">
      <div className=" px-8">
        <div className="pb-4 text-2xl font-semibold leading-8 text-gray-800">
          Pre-Interview Assessment
        </div>
        <div
          className="pb-9 text-base font-normal leading-6 text-gray-700"
          dangerouslySetInnerHTML={{
            __html: candidateInstrution?.test?.description,
          }}
        ></div>
      </div>
      <div className="px-8">
        <h1 className=" pb-4 text-2xl font-semibold leading-8 text-gray-800">
          Sections
        </h1>
        {/* Sections */}
        <div className="flex flex-col gap-4">
          {candidateInstrution?.test?.sections.map(
            (section: SectionInTest, index: number) => {
              return (
                <div
                  key={section?.id}
                  className=" flex max-w-2xl flex-1 items-center justify-between gap-6 rounded-lg border border-gray-300	py-3 px-4 font-normal text-gray-700"
                >
                  <div className="text-base font-semibold text-gray-700">
                    {index + 1}. {section.section.name}
                  </div>
                  <div className="flex gap-6 text-sm font-normal text-gray-700">
                    <span>{section.totalQuestions} Questions</span>
                    <span>{section.timeInSeconds / 60} Mins</span>
                  </div>
                </div>
              )
            }
          )}
        </div>
        {/* Instruction */}
        <div className="flex flex-col gap-4">
          <h1 className="mt-8 text-2xl font-semibold leading-8 text-gray-800">
            Instructions
          </h1>
          <ol>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum.
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum.
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum.
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum.
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum.
            </li>
          </ol>
          <div className="flex">
            <button
              className="text-md mt-8 h-12 w-52 rounded-md bg-primary text-gray-50"
              onClick={() => startTestForCandidate()}
            >
              Begin Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
