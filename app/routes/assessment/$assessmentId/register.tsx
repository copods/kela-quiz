import { LoaderFunction, ActionFunction, json } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import CandidateRegister from '~/components/assessment/CandidateRegister'
import {
  checkIfTestLinkIsValidAndRedirect,
  getCandidateIDFromAssessmentId,
  updateCandidateDetail,
  updateNextStep,
} from '~/utils/assessment.utils'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useActionData } from '@remix-run/react'
import { useEffect } from 'react'

export type ActionData = {
  errors?: {
    title: string
    status: number
  }
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const candidateNextRoute = await checkIfTestLinkIsValidAndRedirect(
    params.assessmentId as string,
    'register'
  )
  if (typeof candidateNextRoute === 'string') {
    return redirect(candidateNextRoute)
  } else if (candidateNextRoute === null) {
    throw new Response('Not Found', { status: 404 })
  }
  return null
}

export const action: ActionFunction = async ({ params, request }) => {
  const formData = await request.formData()
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const candidateID = await getCandidateIDFromAssessmentId(
    params.assessmentId as string
  )
  try {
    if (candidateID?.candidateId) {
      const updatedCandidate = await updateCandidateDetail({
        candidateId: candidateID?.candidateId,
        firstName,
        lastName,
      })

      if (updatedCandidate) {
        await updateNextStep({
          assessmentId: params.assessmentId as string,
          nextRoute: 'verification',
          isSection: false,
        })
        return redirect(`/assessment/${params.assessmentId}/verification`)
      }
    }
  } catch (err) {
    let title = 'statusCheck.sendGridError'
    let errResponse = json<ActionData>(
      {
        errors: {
          title,
          status: 400,
        },
      },
      { status: 400 }
    )

    return errResponse
  }
}

const CandidateOnboard = () => {
  const action = useActionData()
  const { t } = useTranslation()
  useEffect(() => {
    if (action) {
      if (action.errors?.status === 400) {
        toast.error(t(action.errors?.title), {
          toastId: action.errors?.title,
        })
      }
    }
  }, [action, t])

  return (
    <div className="flex min-h-full items-center justify-center bg-gray-50">
      <CandidateRegister />
    </div>
  )
}

export default CandidateOnboard
