import { Icon } from '@iconify/react'
import { useLoaderData, useSubmit } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import Button from '../form/Button'

const SectionDetails = () => {
  const { t } = useTranslation()

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
            {t('candidateExamConstants.noOfQuestions')}:
            <span className="font-medium">{section.totalQuestions}</span>
          </div>
          <Icon icon="ci:line-m" className="text-2xl text-gray-600" />
          <div className="flex gap-2 text-lg text-gray-600">
            {t('candidateExamConstants.total')}{' '}
            {t('candidateExamConstants.time')}:
            <span className="font-medium">
              {section.timeInSeconds / 60} Mins
            </span>
          </div>
        </div>
      </div>
      <Button
        className="w-36 px-6"
        onClick={startSection}
        title={t('candidateExamConstants.startSection')}
        buttonText={t('candidateExamConstants.startSection')}
        varient="primary-solid"
      />
    </div>
  )
}

export default SectionDetails
