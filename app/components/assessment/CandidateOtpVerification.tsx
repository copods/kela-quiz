import { useSubmit } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { Form } from '@remix-run/react'
import Button from '../form/Button'
import otpImage from '~/../public/assets/otp.svg'
import { commonConstants, otpConstants } from '~/constants/common.constants'
const CandidateOtp = ({ email }: { email: string }) => {
  const [counter, setCounter] = useState(60)
  const [finalTime, setFinalTime] = useState('')
  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
    var minutes = Math.floor(counter / 60)
    var seconds = counter - minutes * 60
    var hours = Math.floor(counter / 3600)
    setCounter(counter - hours * 3600)
    const timerValue = (timeUnit: any, pad: any, length: any) => {
      return (new Array(length + 1).join(pad) + timeUnit).slice(-length)
    }
    const timer: string =
      timerValue(minutes, '0', 2) + ':' + timerValue(seconds, '0', 2)
    setFinalTime(timer)
  }, [counter])

  const handleChange = (e: any) => {
    const { value, name } = e.target
    const [fieldName, fieldIndex] = name.split('-') // eslint-disable-line @typescript-eslint/no-unused-vars
    let fieldIntIndex = parseInt(fieldIndex, 10)
    if (value.length >= 1) {
      if (fieldIntIndex < 4) {
        const nextfield = document.querySelector(
          `input[name=field-${fieldIntIndex + 1}]`
        ) as HTMLElement | null
        if (nextfield !== null) {
          nextfield.focus()
        }
      }
    }
  }

  const submit = useSubmit()
  const resend = () => {
    submit({ resendOTP: 'Resend' }, { method: 'post' })
  }
  return (
    <div className="flex flex-1 items-center justify-center bg-gray-50">
      <div className="flex max-w-454 flex-1 flex-col gap-10 rounded-md border border-gray-50 bg-white text-center drop-shadow-sm">
        <div className="flex justify-center pt-12">
          <img src={otpImage} alt={otpConstants.otp} />
        </div>
        <div className="text-2xl font-bold">{otpConstants.header}</div>
        <div className="gap-4 text-base text-gray-500">
          {otpConstants.enterOTP}{' '}
          <span className="font-medium text-primary">{email} </span>
        </div>
        <Form method="post">
          <div className="flex justify-center gap-4 pb-4">
            <input
              type="text"
              inputMode="numeric"
              maxLength={1}
              name="field-1"
              onChange={(e) => handleChange(e)}
              className="flex h-12 w-16 justify-center rounded-md border border-gray-200 text-center drop-shadow-sm"
            />
            <input
              type="text"
              inputMode="numeric"
              maxLength={1}
              name="field-2"
              onChange={(e) => handleChange(e)}
              className="flex h-12 w-16 justify-center rounded-md border border-gray-200 text-center drop-shadow-sm"
            />
            <input
              type="text"
              inputMode="numeric"
              maxLength={1}
              name="field-3"
              onChange={(e) => handleChange(e)}
              className="flex h-12 w-16 justify-center rounded-md border border-gray-200 text-center drop-shadow-sm"
            />
            <input
              type="text"
              inputMode="numeric"
              maxLength={1}
              name="field-4"
              onChange={(e) => handleChange(e)}
              className="flex h-12 w-16 justify-center rounded-md border border-gray-200 text-center drop-shadow-sm"
            />
          </div>

          <div className="pb-10 text-base text-gray-500">
            {finalTime !== '00:00'
              ? otpConstants.didntGetCode
              : otpConstants.resendCodeIn}
            {finalTime !== '00:00' ? (
              <span className="font-medium text-primary"> {finalTime}</span>
            ) : (
              <span
                tabIndex={0}
                className="font-medium text-primary"
                onClick={() => {
                  resend()
                }}
                onKeyUp={() => {
                  resend()
                }}
                role="button"
              >
                {' '}
                {otpConstants.resend}
              </span>
            )}
          </div>
          <div className="px-12 pb-12">
            <Button
              tabIndex={0}
              id={commonConstants.verify}
              varient="primary-solid"
              type="submit"
              name={commonConstants.verify}
              value="proceed"
              className="w-full"
              title={commonConstants.verify}
              buttonText={commonConstants.verify}
            />
          </div>
        </Form>
      </div>
    </div>
  )
}

export default CandidateOtp
