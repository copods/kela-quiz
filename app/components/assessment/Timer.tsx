import { useSubmit } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { candidateExam } from '~/constants/common.constants'
import type {
  SectionInCandidateTest,
  SectionInTest,
} from '~/interface/Interface'
import { getTimeLeftInSeconds } from '~/utils/assessment.utils'

const TimerComponent = ({
  candidateSection,
  section,
}: {
  candidateSection: SectionInCandidateTest
  section: SectionInTest
}) => {
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
            submit({ order: section.order.toString() }, { method: 'post' })
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
    <div className="flex items-center gap-4 text-lg font-medium text-gray-800">
      <span
        className={`w-38justify-center flex rounded-lg px-4 py-1 text-lg font-bold text-gray-800 ${
          time > 120 ? 'bg-blue-100' : 'bg-red-100'
        }`}
      >
        {getFormattedTime(time)} mins
      </span>
      <span className="text-sm font-medium text-gray-500">
        {candidateExam.timeRemaining}
      </span>
    </div>
  )
}

export default TimerComponent
