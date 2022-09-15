import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { useActionData, useLoaderData } from '@remix-run/react'
import CandidateHeader from '~/components/assessment/CandidateHeader'

import {
  checkIfTestLinkIsValidAndRedirect,
  getCandidateEmailByCandidateId,
  resendOtpCode,
  updateNextStep,
  verifyCandidateOtp,
} from '~/utils/assessment.utils'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { statusCheck } from '~/constants/common.constants'
import CandidateOtp from '~/components/assessment/CandidateOtpVerification'

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
  let status = null
  if (resendOtp) {
    await resendOtpCode({
      assesmentId: params.assessmentId as string,
    })
      .then((res) => {
        status = res
        return status
      })
      .catch((err) => {
        status = err
        return status
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
  return status
}
const Verification = () => {
  const loaderData = useLoaderData() as any
  const action = useActionData() as any
  useEffect(() => {
    if (action === 'Done') {
      toast.error(statusCheck.erroSendingOtp)
    } else {
      toast.success(statusCheck.otpSent)
    }
  }, [action])
  return (
    <div className="flex h-full flex-col">
      <CandidateHeader />
      <CandidateOtp email={loaderData?.candidate?.email} />
    </div>
  )
}
export default Verification
