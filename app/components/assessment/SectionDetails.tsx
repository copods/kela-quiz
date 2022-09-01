import { Icon } from '@iconify/react'
import { useLoaderData, useSubmit } from '@remix-run/react'
import { candidateExam, candidateExamConstants } from '~/constants/common.constants'
import Button from '../form/Button'

const SectionDetails = () => {
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
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="text-base text-gray-700">
          {section.section.description}
        </div>
        <div className="flex flex-row items-center gap-4">
          <div className="flex gap-2 text-lg text-gray-600">
            {candidateExamConstants.noOfQuestions}:
            <span className="font-medium">{section.totalQuestions}</span>
          </div>
          <Icon icon="ci:line-m" className="text-2xl text-gray-600" />
          <div className="flex gap-2 text-lg text-gray-600">
            {candidateExamConstants.total} {candidateExamConstants.time}:
            <span className="font-medium">
              {section.timeInSeconds / 60} Mins
            </span>
          </div>
        </div>
      </div>

      <Button 
      className='px-11'
      onClick={startSection}
      buttonText={candidateExam.startSection}
      varient='primary-solid'
      />
    </div>
  )
}

export default SectionDetails
