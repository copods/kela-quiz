import { useLoaderData, useSubmit } from '@remix-run/react'
import { candidateExam } from '~/constants/common.constants'

function SectionDetails() {
  const { section, candidateSection } = useLoaderData()
  const submit = useSubmit()
  const startSection = async () => {
    //getting first test of this section

    submit(
      {
        candidateSectionId: candidateSection.id,
      },
      { method: 'post' }
    )
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row">
          <div className="w-52 font-semibold">{candidateExam.description}</div>
          <div className="flex-1">{section.section.description}</div>
        </div>
        <div className="flex flex-row">
          <div className="w-52 font-semibold">{`${candidateExam.total} ${candidateExam.time}`}</div>
          <div className="flex-1">{section.timeInSeconds / 60} Mins</div>
        </div>
        <div className="flex flex-row">
          <div className="w-52 font-semibold">{`${candidateExam.total} ${candidateExam.questions}`}</div>
          <div className="flex-1">{section.totalQuestions}</div>
        </div>
      </div>
      <br />

      <button
        className="rounded-full bg-primary py-2 px-5 text-white"
        onClick={() => startSection()}
      >
        Start Section
      </button>
    </div>
  )
}

export default SectionDetails
