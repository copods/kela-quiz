import { useLoaderData, useSubmit } from '@remix-run/react'

function SectionDetails() {
  const { section, candidateSection } = useLoaderData()

  const submit = useSubmit()
  const startSection = async () => {
    submit({ candidateSectionId: candidateSection.id }, { method: 'post' })
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
