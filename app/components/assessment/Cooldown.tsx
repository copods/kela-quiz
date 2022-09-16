// import { Icon } from '@iconify/react'
import { useLoaderData, useSubmit } from '@remix-run/react'
import { candidateExamConstants } from '~/constants/common.constants'
import Button from '../form/Button'
import Header from './Header'
import cooldownImage from '~/../public/assets/cooldown.svg'

const Cooldown = () => {
  const { candidateSection } = useLoaderData()
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
    <div className="flex h-screen w-screen flex-col bg-slate-50">
      <Header />
      <div className="py-auto flex-1 overflow-auto">
        <div className="grid h-full items-center">
          <div className="mx-auto flex w-coolDownCard flex-col items-center justify-center gap-8 bg-white py-16">
            <span className="text-lg font-medium text-gray-500">
              {candidateExamConstants.takeBreak}
            </span>
            <span className="text-2xl font-bold text-gray-900">
              {candidateExamConstants.cheers}
            </span>
            <img
              src={cooldownImage}
              alt={candidateExamConstants.cooldown}
              className="h-cooldownSVG w-cooldownSVG"
            />
            <Button
              className="w-80 px-6"
              onClick={startSection}
              title={candidateExamConstants.startNewSection}
              buttonText={candidateExamConstants.startNewSection}
              varient="primary-solid"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cooldown
