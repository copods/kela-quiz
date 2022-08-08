import { useLoaderData, useSubmit } from '@remix-run/react'

function SectionDetails() {
  const { section, candidateSection, candidateTest } = useLoaderData()
  const submit = useSubmit()
  const startSection = async () => {
    //getting first test of this section
    let firstQuestionId = null
    for (let sec of candidateTest.sections) {
      console.log('compare', sec, candidateSection)
      if (sec.section.id == candidateSection.section.id) {
        firstQuestionId = sec.questions[0].id
      }
    }
    console.log('firstQuestionId', firstQuestionId)

    submit(
      {
        candidateSectionId: candidateSection.id,
        firstQuestionId: firstQuestionId,
      },
      { method: 'post' }
    )
  }

  return (
    <div>
      <h1>{section.section.name}</h1>

      <br />
      <p>this id section description</p>
      <p>{section.section.description}</p>
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
