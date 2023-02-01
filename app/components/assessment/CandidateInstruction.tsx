import { useLoaderData, useSubmit } from '@remix-run/react'
import type { SectionInTest, TestSection } from '~/interface/Interface'
import Button from '../common-components/Button'
import contactSupport from '~/../public/assets/contactSupport.svg'
import checkIcon from '~/../public/assets/checkIcon.svg'
import Header from './Header'
import { useTranslation } from 'react-i18next'

const CandidateInstruction = () => {
  const { t } = useTranslation()
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

  const getTotalTimeInMin = () => {
    let time = 0
    instructions.test.sections.forEach((section: SectionInTest) => {
      time += section.timeInSeconds
    })
    return time / 60
  }

  const setOfInstructions = [
    `The duration of this exam is ${getTotalTimeInMin()} minutes`,
    `Each question is worth the same marks`,
    `After submitting the section, you won't be able to make any changes`,
  ]

  return (
    <div className="flex h-screen flex-col overflow-auto bg-gray-50">
      <Header />
      <div className="flex-1 overflow-auto">
        <div className="flex flex-col items-center justify-center gap-16 py-10">
          <div className="flex flex-col items-center justify-center gap-4">
            <h3 className="text-2xl font-bold text-gray-900">
              {t('candidateExamConstants.candidateInsWelcome')}{' '}
              {candidate.firstName}
            </h3>
            {/* <p className="text-base font-medium text-gray-500">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p> */}
          </div>
          <div className="flex gap-12">
            <div className="flex w-438 flex-col gap-10 rounded-lg border border-gray-50 bg-white p-10 shadow-sm">
              <h3
                className="text-center text-2xl font-bold text-gray-900"
                data-cy="testSectionHeading"
              >
                {t('routeFiles.tests')}
              </h3>
              <div className="flex flex-col gap-6" data-cy="testSectionContent">
                {candidateSections.map(
                  (section: SectionInTest, index: number) => {
                    return (
                      <div
                        key={section?.id}
                        className="flex flex-1 items-center justify-between gap-6 text-gray-700"
                      >
                        <div className="flex items-start gap-4">
                          <img src={contactSupport} alt="" className="h-6" />
                          <span className="text-base font-normal text-gray-900">
                            {t('testsConstants.testText')} {section.order} -
                            {section.section.name}
                          </span>
                        </div>
                      </div>
                    )
                  }
                )}
              </div>
            </div>
            <div className="flex w-438 flex-col gap-10 rounded-lg border border-gray-50 bg-white p-10 shadow-sm">
              <h3
                className="text-center text-2xl font-bold text-gray-900"
                data-cy="instructionSectionHeading"
              >
                {t('candidateExamConstants.instructions')}
              </h3>
              <div
                className="flex flex-col gap-6"
                data-cy="instructionSectionContent"
              >
                {setOfInstructions.map((instruction: string, index: number) => {
                  return (
                    <div
                      className="flex items-start gap-4"
                      key={`instruction-${index}`}
                    >
                      <img src={checkIcon} alt="checked icon" className="h-6" />
                      <span className="text-base font-normal text-gray-900">
                        {instruction}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex gap-2">
              <span>🎉 </span>
              <p
                className="text-base font-semibold text-gray-900"
                data-cy="goodLuckMessageText"
              >
                Best of Luck
              </p>
            </div>
            <Button
              tabIndex={0}
              id="start"
              className="w-356 py-3"
              variant="primary-solid"
              title={t('candidateExamConstants.beginAssessment')}
              buttonText={t('candidateExamConstants.beginAssessment')}
              onClick={startTestForCandidate}
              aria-label="start"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandidateInstruction
