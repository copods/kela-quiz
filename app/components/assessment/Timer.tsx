import { useSubmit } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type {
  SectionInCandidateTest,
  SectionInTest,
} from '~/interface/Interface'
import { getTimeLeftInSeconds } from '~/services/assessment.service'

const TimerComponent = ({
  candidateSection,
  section,
}: {
  candidateSection: SectionInCandidateTest
  section: SectionInTest
}) => {
  const { t } = useTranslation()

  const [time, setTimer] = useState(
    getTimeLeftInSeconds({
      totalTimeInSeconds: section?.timeInSeconds,
      startTime: candidateSection?.startedAt,
    })
  )

  const submit = useSubmit()
  let timer: ReturnType<typeof setTimeout>
  useEffect(() => {
    if (candidateSection?.startedAt) {
      if (!timer) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        timer = setInterval(() => {
          let timeLeft = getTimeLeftInSeconds({
            totalTimeInSeconds: section?.timeInSeconds,
            startTime: candidateSection?.startedAt,
          })
          setTimer(timeLeft)
          if (timeLeft == 0) {
            submit(
              { order: section.order.toString(), nextSection: 'nextSection' },
              { method: 'post' }
            )
            setTimer(0)
            clearInterval(timer)
          }
        }, 1000)
      }
    }
  }, [section])
  const getFormattedTime = (time: number) => {
    let min = Math.floor(time / 60)
    let seconds = time - min * 60
    return `${min > 9 ? '' : '0'}${min}:${seconds > 9 ? '' : '0'}${seconds} `
  }
  return (
    <div
      className="flex items-center gap-4 text-lg font-medium text-gray-800"
      data-cy="timeRemaining"
    >
      <span className="text-sm font-medium text-gray-500">
        {t('candidateExamConstants.timeRemaining')}
      </span>
      <span
        className={`flex w-24 justify-center rounded-md px-4 py-1 font-mono text-lg font-bold text-gray-800 ${
          time > 120 ? 'bg-blue-100' : 'bg-red-100'
        }`}
        suppressHydrationWarning
      >
        {getFormattedTime(time)}
      </span>
    </div>
  )
}

export default TimerComponent
