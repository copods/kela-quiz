// import { Icon } from '@iconify/react'
import { useLoaderData, useSubmit } from '@remix-run/react'
import Button from '../common_components/Button'
import Header from './Header'
import cooldownImage from '~/../public/assets/cooldown.svg'
import { useTranslation } from 'react-i18next'

const Cooldown = () => {
  const { t } = useTranslation()
  const { candidateSection, candidateTests } = useLoaderData()
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
  const counterString = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
  ]

  const getPreviousSectionName = () => {
    for (let sections of candidateTests.sections) {
      if (sections.order == candidateSection.order - 1) {
        return sections.section.name
      }
    }
  }

  return (
    <div className="flex h-screen w-screen flex-col bg-slate-50">
      <Header />
      <div className="py-auto flex flex-1 items-center justify-center overflow-auto">
        <div className="flex w-coolDownCard flex-col items-center justify-center gap-8 bg-white py-12">
          <span className="text-lg font-medium text-gray-500">
            {t('candidateExamConstants.takeBreak')}
          </span>
          <p className="text-2xl font-bold text-gray-900">
            Cheers! {getPreviousSectionName()} Questions Completed -{' '}
            {
              counterString[
                candidateTests.sections.length - candidateSection.order + 1
              ]
            }{' '}
            more to go
          </p>
          <img
            src={cooldownImage}
            alt={t('candidateExamConstants.cooldown')}
            className="h-cooldownSVG w-cooldownSVG"
          />
          <Button
            className="w-80 px-6"
            onClick={startSection}
            title={t('candidateExamConstants.startNewSection')}
            buttonText={t('candidateExamConstants.startNewSection')}
            varient="primary-solid"
          />
        </div>
      </div>
    </div>
  )
}

export default Cooldown
