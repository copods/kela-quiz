import { useSubmit } from '@remix-run/react'
import React, { useEffect, useRef, useState } from 'react'
import { Form } from '@remix-run/react'
import Button from '../form/Button'
import otpImage from '~/../public/assets/otp.svg'
import { useTranslation } from 'react-i18next'

const CandidateOtp = ({ email }: { email: string }) => {
  const { t } = useTranslation()
  const [counter, setCounter] = useState(60)
  const [finalTime, setFinalTime] = useState('')
  const [OTPSegments, setOTPSegments] = useState(Array(4).fill(''))
  const [autoSubmit, setAutoSubmit] = useState(true)
  const btnRef = useRef<HTMLElement>(null)

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

  const submit = useSubmit()
  const resend = () => {
    submit({ resendOTP: 'Resend' }, { method: 'post' })
  }

  useEffect(() => {
    const blankFields = OTPSegments.some(
      (ele) => ele === '' || ele === undefined || ele === null
    )

    if (!blankFields && autoSubmit) {
      // @ts-ignore
      btnRef.current.click()
      setAutoSubmit(false)
    }
  }, [OTPSegments, autoSubmit])

  const onPaste = (event: React.ClipboardEvent) => {
    event.preventDefault()
    const pasted = event.clipboardData.getData('text/plain')
    // Checking for empty field, if the clipboard doesn't have value of length 4
    let emptyFields = 4 - pasted.length

    if (emptyFields > 0 && emptyFields <= 3) {
      setOTPSegments([
        ...pasted.split('').slice(0, OTPSegments.length),
        ...Array(emptyFields).fill(''),
      ])
    } else {
      setOTPSegments([...pasted.split('').slice(0, OTPSegments.length)])
    }

    // Focus on the submit button
    if (pasted.length === 4) {
      btnRef.current?.focus()
    }
    // Focus on the next input field
    else if (pasted.length < 4) {
      const foncusOnNextField = document.querySelector(
        `input[name=field-${pasted.length + 1}]`
      )

      // @ts-ignore
      foncusOnNextField && foncusOnNextField.focus()
    }
  }

  const updateOTP = (index: number) => {
    return (event: React.SyntheticEvent) => {
      setOTPSegments([
        ...OTPSegments.slice(0, index),
        (event.target as HTMLInputElement).value,
        ...OTPSegments.slice(index + 1),
      ])

      // Focus on the submit button
      if (index === 3) {
        btnRef.current?.focus()
      }
      // Focus on the next input field
      else if (index !== 3) {
        const foncusOnNextField = document.querySelector(
          `input[name=field-${index + 2}]`
        )
        // @ts-ignore
        foncusOnNextField && foncusOnNextField.focus()
      }
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-gray-50">
      <div className="flex max-w-454 flex-1 flex-col gap-10 rounded-md border border-gray-50 bg-white p-12 text-center drop-shadow-sm">
        <div className="flex justify-center">
          <img src={otpImage} alt={t('otpConstants.otp')} />
        </div>
        <div className="text-2xl font-bold">{t('otpConstants.header')}</div>
        <div className="gap-4 text-base text-gray-500">
          {t('otpConstants.enterOTP')}{' '}
          <span className="font-medium text-primary">{email} </span>
        </div>
        <Form method="post">
          <div className="flex justify-center gap-4 pb-4">
            {OTPSegments.map((ele, idx) => (
              <input
                type="text"
                inputMode="numeric"
                maxLength={1}
                name={`field-${idx + 1}`}
                onPaste={onPaste}
                className="flex h-12 w-16 justify-center rounded-md border border-gray-200 text-center drop-shadow-sm"
                key={idx}
                value={ele}
                onInput={updateOTP(idx)}
                tabIndex={idx + 1}
              />
            ))}
          </div>

          <div className="pb-10 text-base text-gray-500">
            {finalTime === '00:00'
              ? t('otpConstants.didntGetCode')
              : t('otpConstants.resendCodeIn')}
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
                {t('otpConstants.resend')}
              </span>
            )}
          </div>
          <div>
            <Button
              btnRef={btnRef}
              tabIndex={0}
              id={t('commonConstants.verify')}
              varient="primary-solid"
              type="submit"
              name={t('commonConstants.verify')}
              value="proceed"
              className="w-full"
              title={t('commonConstants.verify')}
              buttonText={t('commonConstants.verify')}
            />
          </div>
        </Form>
      </div>
    </div>
  )
}

export default CandidateOtp
