import type { ActionFunction, LoaderFunction } from '@remix-run/server-runtime'
import { useActionData, useLoaderData, useNavigate } from '@remix-run/react'
import { json } from '@remix-run/node'
import invariant from 'tiny-invariant'
import AdminLayout from '~/components/layouts/AdminLayout'
import {
  getSectionById,
  getQuestionType,
  addQuestion,
} from '~/models/sections.server'
import AddQuestionInSection from '~/components/sections/add-question/AddQuestionInSection'
import { requireUserId } from '~/session.server'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { routes } from '~/constants/route.constants'
import { useTranslation } from 'react-i18next'

type LoaderData = {
  sectionDetails: Awaited<ReturnType<typeof getSectionById>>
  questionTypes: Awaited<ReturnType<typeof getQuestionType>>
}
type ActionData = {
  error?: {
    data?: string
    status?: number
  }
  success?: {
    data?: string
    addMoreQuestion?: boolean
    status?: number
  }
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const questionTypes = await getQuestionType()

  invariant(params.sectionId, 'sectionId not found')

  const sectionDetails = await getSectionById({ id: params.sectionId })

  if (!sectionDetails) {
    throw new Response('Not Found', { status: 404 })
  }
  return json<LoaderData>({ sectionDetails, questionTypes })
}

export const action: ActionFunction = async ({ request }) => {
  const createdById = await requireUserId(request)
  const formData = await request.formData()
  const question = JSON.parse(formData.get('quesData') as string)
  let ques
  await addQuestion(
    question.question.replace(
      /<p><br[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|]?><[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|]?p>/g,
      ''
    ),
    question.options,
    question.correctAnswer,
    question.questionTypeId,
    question.sectionId,
    createdById,
    question.checkOrder
  )
    .then((res) => {
      ques = json<ActionData>(
        {
          success: {
            data: 'statusCheck.questionAddedSuccess',
            addMoreQuestion: question?.addMoreQuestion,
          },
        },
        { status: 200 }
      )
    })
    .catch((err) => {
      ques = json<ActionData>(
        { error: { data: 'statusCheck.questionNotAdded' } },
        { status: 400 }
      )
    })
  return ques
}

export default function AddQuestion() {
  const { t } = useTranslation()
  const sectionDetail = useLoaderData() as unknown as LoaderData
  const actionData = useActionData()
  const navigate = useNavigate()
  const [addQuestionKey, setAddQuestionKey] = useState(0)
  useEffect(() => {
    if (actionData?.success) {
      toast.success(t(actionData?.success?.data))
      if (actionData.success.addMoreQuestion) {
        setAddQuestionKey((prev) => (prev += 1))
      } else {
        navigate(`${routes.sections}/${sectionDetail.sectionDetails?.id}`)
      }
    } else if (actionData?.error) {
      toast.error(t(actionData?.data))
    }
  }, [actionData, navigate, sectionDetail.sectionDetails?.id])
  return (
    <AdminLayout>
      <AddQuestionInSection key={addQuestionKey} />
    </AdminLayout>
  )
}
