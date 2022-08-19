import { Outlet, useSubmit } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { candidateExam } from '~/constants/common.constants'
import { getTimeLeftInSeconds } from '~/utils'

export default function SectionQuestionPage({
  section,
  params,
  candidateTest,
}: {
  section: any
  params: any
  candidateTest: any
}) {
  const [time, setTimer] = useState(-1)
  // const [timer, setTimer2] = useState<any>(null)

  // find currest section in candidateTest
  let candidateSection: any = {}
  for (let sec of candidateTest?.sections) {
    if (section?.section?.id == sec?.section?.id) {
      candidateSection = sec
      break
    }
  }
  const submit = useSubmit()
  let timer: any = null
  useEffect(() => {
    if (candidateSection?.startedAt) {
      if (!timer) {
        console.log('tnslasdas', section?.timeInSeconds)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        timer = setInterval(() => {
          let timeLeft = getTimeLeftInSeconds({
            totalTimeInSeconds: section?.timeInSeconds,
            startTime: candidateSection?.startedAt,
          })
          console.log('tl', timeLeft)
          setTimer(timeLeft)
          if (timeLeft == 0) {
            submit({ order: section.order }, { method: 'post' })
            // setTimer2(null)
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
    <div className="flex h-full flex-col gap-9">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">
          {section.section.name}
        </h1>
        {/* {params?.questionId && ( */}
        <div className="flex items-center gap-4 text-lg font-medium text-gray-800">
          <span className="text-sm font-medium text-gray-500">
            {candidateExam.timeRemaining}
          </span>{' '}
          <span className="flex w-36 justify-center rounded-lg bg-blue-100 px-4 py-1 text-lg font-bold text-gray-800">
            {getFormattedTime(time)} mins
          </span>
        </div>
        {/* )} */}
      </div>
      <div className="h-full flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}
