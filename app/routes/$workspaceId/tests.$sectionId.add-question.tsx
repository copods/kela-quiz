import { useEffect, useState } from "react"
import { json } from "@remix-run/node"
import { useActionData, useLoaderData, useNavigate } from "@remix-run/react"
import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"
import invariant from "tiny-invariant"
import AddQuestionInSection from "~/components/sections/add-question/AddQuestionInSection"
import { routes } from "~/constants/route.constants"
import { getUserId, requireUserId } from "~/session.server"
import {
  getAddQuestion,
  getQuestionTypeFromTests,
  getTestById,
  getWorkspaces,
} from "~/services/tests.service"

type LoaderData = {
  sectionDetails: Awaited<ReturnType<typeof getTestById>>
  questionTypes: Awaited<ReturnType<typeof getQuestionTypeFromTests>>
  workspaces: Awaited<ReturnType<typeof getWorkspaces>>
  currentWorkspaceId: string
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const questionTypes = await getQuestionTypeFromTests()
  const userId = await getUserId(request)
  const currentWorkspaceId = params.workspaceId as string
  const workspaces = await getWorkspaces(userId as string)

  invariant(params.sectionId, "sectionId not found")

  const sectionDetails = await getTestById(params.sectionId)

  if (!sectionDetails) {
    throw new Response("Not Found", { status: 404 })
  }
  return json<LoaderData>({
    sectionDetails,
    questionTypes,
    workspaces,
    currentWorkspaceId,
  })
}

export const action: ActionFunction = async ({ request }) => {
  const createdById = await requireUserId(request)
  const formData = await request.formData()
  const question = JSON.parse(formData.get("quesData") as string)
  const response = await getAddQuestion(
    question.question.replace(
      /<p><br[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|]?><[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|]?p>/g,
      ""
    ),
    question.options,
    question.correctAnswer,
    question.questionTypeId,
    question.sectionId,
    createdById,
    question.checkOrder,
    question?.addMoreQuestion
  )

  return response
}

export default function AddQuestion() {
  const { t } = useTranslation()
  const sectionDetail = useLoaderData() as unknown as LoaderData
  const actionData = useActionData()
  const navigate = useNavigate()
  const [addQuestionKey, setAddQuestionKey] = useState(0)
  useEffect(() => {
    if (actionData?.success) {
      toast.success(t(actionData?.success?.data), {
        toastId: actionData?.success?.data,
      })
      if (actionData.success.addMoreQuestion) {
        setAddQuestionKey((prev) => (prev += 1))
      } else {
        navigate(
          `/${sectionDetail.currentWorkspaceId}${routes.tests}/${sectionDetail.sectionDetails?.id}`
        )
      }
    } else if (actionData?.error) {
      toast.error(t(actionData?.data))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData, navigate, sectionDetail.sectionDetails?.id, t])
  return <AddQuestionInSection key={addQuestionKey} />
}
