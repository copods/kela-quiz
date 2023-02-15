import { useEffect } from "react"

import type { ActionFunction, LoaderFunction } from "@remix-run/node"
import { redirect } from "@remix-run/node"
import { useActionData, useLoaderData } from "@remix-run/react"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"

import CandidateOtp from "~/components/assessment/CandidateOtpVerification"
import Header from "~/components/assessment/Header"
import {
  checkIfTestLinkIsValidAndRedirect,
  getCandidateEmailByCandidateId,
  resendOtpCode,
  updateNextStep,
  verifyCandidateOtp,
} from "~/services/assessment.service"

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
    "verification"
  )
  if (typeof candidateNextRoute === "string") {
    return redirect(candidateNextRoute)
  } else if (candidateNextRoute === null) {
    throw new Response("Not Found", { status: 404 })
  }
  return await getCandidateEmailByCandidateId(params.assessmentId as string)
}

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData()
  const resendOtp = formData.get("resendOTP") as string
  const proceed = formData.get("Verify") as string
  let checkStatus = null
  if (resendOtp) {
    await resendOtpCode({
      assessmentId: params.assessmentId as string,
    })
      .then((res) => {
        checkStatus = { value: "success", timestamp: new Date().getSeconds() }
      })
      .catch((err) => {
        checkStatus = {
          value: "commonError",
          timestamp: new Date().getSeconds(),
        }
      })
  }
  if (proceed) {
    const field1 = formData.get("field-1") as string
    const field2 = formData.get("field-2") as string
    const field3 = formData.get("field-3") as string
    const field4 = formData.get("field-4") as string
    const otp = field1 + field2 + field3 + field4
    const verify = await verifyCandidateOtp({
      assessmentId: params.assessmentId as string,
      otp,
    })
    if (verify) {
      await updateNextStep({
        assessmentId: params.assessmentId as string,
        nextRoute: "instructions",
        isSection: false,
      })
      return redirect(`/assessment/${params.assessmentId}/instructions`)
    } else {
      return { value: false, timestamp: new Date().getSeconds() }
    }
  }
  return checkStatus
}
const Verification = () => {
  const { t } = useTranslation()
  const loaderData = useLoaderData()
  const action = useActionData()
  useEffect(() => {
    if (action?.value === "success") {
      toast.success(t("statusCheck.otpSent"))
    } else if (action?.value === "commonError") {
      toast.error(t("statusCheck.erroSendingOtp"))
    } else if (action?.value === false) {
      toast.error(t("statusCheck.correctOtp"))
    }
  }, [action?.timestamp, action?.value, t])
  return (
    <div className="flex h-full flex-col">
      <Header />
      <CandidateOtp email={loaderData?.candidate?.email} />
    </div>
  )
}
export default Verification
