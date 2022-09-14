import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { useState } from 'react'
import Button from '~/components/form/Button'
import { useRef } from 'react'
import { useLayoutEffect } from 'react'
import usePrevious from '~/routes/usePrevious'
import { useCallback } from 'react'
import { memo } from 'react'
import { SingleOTPInputProps } from '~/interface/Interface'
// import { OTPInputProps } from '~/interface/Interface'
// import { useLoaderData } from '@remix-run/react'
// import CandidateInstruction from '~/components/assessment/CandidateInstruction'
// import CandidateLayout from '~/components/layouts/CandidateLayout'
import {
  candidateTest,
  checkIfTestLinkIsValidAndRedirect,
  getCandidateByAssessmentId,
  getSectionByOrder,
  getTestInstructions,
  startTest,
  updateNextStep,
} from '~/utils/assessment.utils'

export const loader: LoaderFunction = async ({ params, request }) => {
  const candidateNextRoute = await checkIfTestLinkIsValidAndRedirect(
    params.assessmentId as string,
    'instructions'
  )

  if (typeof candidateNextRoute === 'string') {
    return redirect(candidateNextRoute)
  } else if (candidateNextRoute === null) {
    throw new Response('Not Found', { status: 404 })
  }

  const instructions = await getTestInstructions(params.assessmentId as string)
  const firstSection = await getSectionByOrder(
    instructions?.test.id as string,
    1
  )

  const candidateTests = await candidateTest(params.assessmentId as string)

  const candidate = await getCandidateByAssessmentId(
    params.assessmentId as string
  )

  return json({ instructions, firstSection, candidateTests, candidate })
}

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData()
  const proceed = formData.get('proceedToTest')
  const firstSectionId = formData.get('firstSectionId') as string

  if (proceed) {
    await updateNextStep({
      assessmentId: params.assessmentId as string,
      nextRoute: 'instructions',
      isSection: true,
      currentSectionId: firstSectionId,
    })

    await startTest(params.assessmentId as string)

    return redirect(`/assessment/${params.assessmentId}/verification`)
  }
}

const SingleOTPInputComponent = (props: SingleOTPInputProps) => {
  const { focus, autoFocus, ...rest } = props
  const inputRef = useRef<HTMLInputElement>(null)
  const prevFocus = usePrevious(!!focus)
  useLayoutEffect(() => {
    if (inputRef.current) {
      if (focus && autoFocus) {
        inputRef.current.focus()
      }
      if (focus && autoFocus && focus !== prevFocus) {
        inputRef.current.focus()
        inputRef.current.select()
      }
    }
  }, [autoFocus, focus, prevFocus])

  return <input ref={inputRef} {...rest} />
}

const SingleOTPInput = memo(SingleOTPInputComponent)
const Verification = () => {
  const [otpValues, setOTPValues] = useState(Array<string>(4).fill(''))
  const [activeInput, setActiveInput] = useState(0)
  const handleOnFocus = useCallback(
    (index: number) => () => {
      focusInput(index)
    },
    []
  )
  const focusInput = useCallback(
    (inputIndex: number) => {
      const selectedIndex = Math.max(Math.min(length - 1, inputIndex), 0)
      setActiveInput(selectedIndex)
    },
    [length]
  )
  // const onBlur = useCallback(() => {
  //   setActiveInput(-1)
  // }, [])
  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = getRightValue(e.currentTarget.value)
      if (!val) {
        e.preventDefault()
        return
      }
      changeCodeAtFocus(val)
      focusNextInput()
    },
    []
  )
  const getRightValue = useCallback((str: string) => {
    let changedValue = str

    if (!changedValue) {
      return changedValue
    }

    return Number(changedValue) >= 0 ? changedValue : ''
  }, [])
  const changeCodeAtFocus = useCallback(
    (str: string) => {
      const updatedOTPValues = [...otpValues]
      updatedOTPValues[activeInput] = str[0] || ''
      setOTPValues(updatedOTPValues)
      handleOtpChange(updatedOTPValues)
    },
    [activeInput, otpValues]
  )
  const handleOtpChange = useCallback((otp: string[]) => {
    // const otpValue = otp.join('')
    // onChangeOTP(otpValue)
  }, [])
  const focusNextInput = useCallback(() => {
    focusInput(activeInput + 1)
  }, [activeInput, focusInput])
  const handleOnKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const pressedKey = e.key

      switch (pressedKey) {
        case 'Backspace':
        case 'Delete': {
          e.preventDefault()
          if (otpValues[activeInput]) {
            changeCodeAtFocus('')
          } else {
            focusPrevInput()
          }
          break
        }
        case 'ArrowLeft': {
          e.preventDefault()
          focusPrevInput()
          break
        }
        case 'ArrowRight': {
          e.preventDefault()
          focusNextInput()
          break
        }
        default: {
          // Ignore all special keys if it is not numeric or alphabet characters
          if (pressedKey.match(/^[^a-zA-Z0-9]$/)) {
            e.preventDefault()
          }

          break
        }
      }
    },
    [activeInput, changeCodeAtFocus, focusNextInput, otpValues]
  )
  const focusPrevInput = useCallback(() => {
    focusInput(activeInput - 1)
  }, [activeInput, focusInput])
  const handleOnPaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault()
      const pastedData = e.clipboardData
        .getData('text/plain')
        .trim()
        .slice(0, length - activeInput)
        .split('')
      if (pastedData) {
        let nextFocusIndex = 0
        const updatedOTPValues = [...otpValues]
        updatedOTPValues.forEach((val, index) => {
          if (index >= activeInput) {
            const changedValue = getRightValue(pastedData.shift() || val)
            if (changedValue) {
              updatedOTPValues[index] = changedValue
              nextFocusIndex = index
            }
          }
        })
        setOTPValues(updatedOTPValues)
        setActiveInput(Math.min(nextFocusIndex + 1, length - 1))
      }
    },
    [activeInput, getRightValue, length, otpValues]
  )

  return (
    <div className="flex h-full items-center justify-center bg-gray-50">
      <div className="flex max-w-[454px] flex-1 flex-col rounded-md border border-gray-50 bg-white text-center drop-shadow-sm drop-shadow-sm">
        <div className="flex justify-center pb-54 pt-12">
          <svg
            width="140"
            height="90"
            viewBox="0 0 140 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.5432 90.0005C39.6504 90.0005 51.0865 78.5644 51.0865 64.4573C51.0865 50.3502 39.6504 38.9141 25.5432 38.9141C11.4361 38.9141 0 50.3502 0 64.4573C0 78.5644 11.4361 90.0005 25.5432 90.0005Z"
              fill="#EDEEF4"
            />
            <path
              d="M106.732 76.9396H21.5614C20.5736 76.9396 19.7754 76.1414 19.7754 75.1536V17.372C19.7754 16.3842 20.5736 15.5859 21.5614 15.5859H106.732C107.72 15.5859 108.518 16.3842 108.518 17.372V75.1536C108.518 76.1414 107.72 76.9396 106.732 76.9396ZM23.3475 73.3775H104.946V19.158H23.3475V73.3775Z"
              fill="#0F1335"
            />
            <path
              d="M106.732 76.9396C106.273 76.9396 105.814 76.7599 105.475 76.4207L77.9461 48.8919C77.2476 48.1934 77.2476 47.0659 77.9461 46.3775C78.6445 45.679 79.772 45.679 80.4605 46.3775L104.956 70.873V20.7344L65.1545 47.7345C64.5558 48.1435 63.7576 48.1435 63.1589 47.7345L20.5636 18.8486C19.7454 18.2999 19.5359 17.1923 20.0847 16.3741C20.6334 15.556 21.741 15.3464 22.5592 15.8952L64.1368 44.1125L105.724 15.9052C106.273 15.536 106.972 15.4961 107.56 15.8054C108.139 16.1147 108.508 16.7234 108.508 17.3819V75.1635C108.508 75.8819 108.079 76.5305 107.411 76.8098C107.191 76.8996 106.962 76.9495 106.732 76.9495V76.9396Z"
              fill="#0F1335"
            />
            <path
              d="M21.5613 76.9389C21.1023 76.9389 20.6533 76.7693 20.3041 76.4201C19.6057 75.7216 19.6057 74.5941 20.3041 73.9057L47.9826 46.2172C48.6811 45.5187 49.8085 45.5187 50.497 46.2172C51.1955 46.9156 51.1955 48.0431 50.497 48.7316L22.8185 76.4201C22.4693 76.7693 22.0103 76.9389 21.5613 76.9389Z"
              fill="#0F1335"
            />
            <path
              d="M135.917 0H80.7597C78.8838 0 77.3672 1.51663 77.3672 3.39246V21.2827C77.3672 23.1585 78.8838 24.6752 80.7597 24.6752H88.4426V30.602L95.896 24.6752H135.917C137.793 24.6752 139.31 23.1585 139.31 21.2827V3.39246C139.31 1.51663 137.793 0 135.917 0Z"
              fill="#5EDDBF"
            />
            <path
              d="M89.0813 12.5618C89.0614 11.1848 90.1789 10.1172 91.5259 10.1172C92.8729 10.1172 93.9705 11.1848 93.9705 12.5318C93.9705 13.8788 92.9028 14.9764 91.5259 14.9764C90.1489 14.9764 89.0813 13.9287 89.0813 12.5618Z"
              fill="white"
            />
            <path
              d="M100.286 12.5618C100.266 11.1848 101.384 10.1172 102.731 10.1172C104.078 10.1172 105.176 11.1848 105.176 12.5318C105.176 13.8788 104.108 14.9764 102.731 14.9764C101.354 14.9764 100.286 13.9287 100.286 12.5618Z"
              fill="white"
            />
            <path
              d="M111.491 12.5618C111.472 11.1848 112.589 10.1172 113.936 10.1172C115.283 10.1172 116.381 11.1848 116.381 12.5318C116.381 13.8788 115.313 14.9764 113.936 14.9764C112.559 14.9764 111.491 13.9287 111.491 12.5618Z"
              fill="white"
            />
            <path
              d="M122.706 12.5618C122.686 11.1848 123.804 10.1172 125.151 10.1172C126.498 10.1172 127.595 11.1848 127.595 12.5318C127.595 13.8788 126.528 14.9764 125.151 14.9764C123.774 14.9764 122.706 13.9287 122.706 12.5618Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="text-2xl font-bold">OTP Verification</div>
        <div className="pt-4 pb-10  text-base text-[#6B7280]">
          Enter the OTP sent to{' '}
          <span className="font-medium text-primary">anurag12@email.com </span>
        </div>

        <div className=" flex justify-center gap-4 pb-8">
          {Array(4)
            .fill('')
            .map((_, index) => (
              <SingleOTPInput
                key={`SingleInput-${index}`}
                focus={activeInput === index}
                value={otpValues && otpValues[index]}
                // autoFocus={autoFocus}
                onFocus={handleOnFocus(index)}
                onChange={handleOnChange}
                onKeyDown={handleOnKeyDown}
                // onBlur={handleOnBlur}
                onPaste={handleOnPaste}
                className="flex h-12 w-16 justify-center rounded-md border border-[#D5DAE1] drop-shadow-sm"
                // disabled={disabled}
              />
            ))}
          {/* {otp.map((digit) => (
            <>
              <input
                type="text"
                value={digit}
                onChange={(e) => {
                  console.log(e.target.value, 'e')
                  // setOtp(e.target.value)
                }}
                className="flex h-12 w-16 justify-center rounded-md border border-[#D5DAE1] drop-shadow-sm"
              />
            </>
          ))} */}
        </div>
        <div className="pb-10 text-base text-[#6B7280]">
          Resend code in <span className="font-medium text-primary">01:34</span>
        </div>
        <div className="px-12 pb-12">
          <Button
            tabIndex={0}
            id="verify"
            varient="primary-solid"
            type="button"
            name="delete"
            className="w-full"
            title="Verify"
            buttonText="Verify"
          />
        </div>
      </div>
    </div>
  )
}
export default Verification
