import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { useActionData, useLoaderData } from '@remix-run/react'
import {
  checkIfTestLinkIsValidAndRedirect,
  getCandidateEmailByCandidateId,
  resendOtpCode,
  updateNextStep,
  verifyCandidateOtp,
} from '~/utils/assessment.utils'
import { json } from 'remix-utils'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { statusCheck } from '~/constants/common.constants'
import CandidateOtp from '~/components/assessment/CandidateOtpVerification'
import Header from '~/components/assessment/Header'

export type ActionData = {
  errors?: {
    title: string
    status: number
  }
  resp?: {
    title: string
    status: number
  }
}
export const loader: LoaderFunction = async ({ params, request }) => {
  const candidateNextRoute = await checkIfTestLinkIsValidAndRedirect(
    params.assessmentId as string,
    'verification'
  )
  if (typeof candidateNextRoute === 'string') {
    return redirect(candidateNextRoute)
  } else if (candidateNextRoute === null) {
    throw new Response('Not Found', { status: 404 })
  }
  return await getCandidateEmailByCandidateId(params.assessmentId as string)
}

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData()
  const resendOtp = formData.get('resendOTP') as string
  const proceed = formData.get('Verify') as string
  let checkStatus = null
  if (resendOtp) {
    await resendOtpCode({
      assesmentId: params.assessmentId as string,
    })
      .then((res) => {
        checkStatus = json<ActionData>(
          {
            resp: {
              title: 'ok',
              status: 200,
            },
          },
          { status: 200 }
        )
      })
      .catch((err) => {
        checkStatus = json<ActionData>(
          {
            errors: {
              title: 'err',
              status: 400,
            },
          },
          { status: 400 }
        )
      })
  }
  if (proceed) {
    const field1 = formData.get('field-1') as string
    const field2 = formData.get('field-2') as string
    const field3 = formData.get('field-3') as string
    const field4 = formData.get('field-4') as string
    const otp = field1 + field2 + field3 + field4
    const verify = await verifyCandidateOtp({
      assessmentId: params.assessmentId as string,
      otp,
    })
    if (verify) {
      await updateNextStep({
        assessmentId: params.assessmentId as string,
        nextRoute: 'instructions',
        isSection: false,
      })
      return redirect(`/assessment/${params.assessmentId}/instructions`)
    } else {
      return null
    }
  }
  return checkStatus
}
const Verification = () => {
  const loaderData = useLoaderData() as any
  const action = useActionData() as ActionData
  useEffect(() => {
    if (action === '{"resp":{"title":"ok","status":200}}') {
      toast.success(statusCheck.otpSent)
    } else if (action === '{"resp":{"title":"err","status":200}}') {
      toast.error(statusCheck.erroSendingOtp)
    } else if (action === null) {
      toast.error('Please enter correct otp')
    }
  }, [action])
  return (
    <div className="flex h-full flex-col">
      <Header />
      <CandidateOtp email={loaderData?.candidate?.email} />
    </div>
  )
}
export default Verification
