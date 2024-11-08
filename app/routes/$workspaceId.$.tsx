import { useEffect, useState } from "react"

import { json } from "@remix-run/node"
import { useActionData, useNavigate, useLocation } from "@remix-run/react"
import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime"
import { redirect } from "@remix-run/server-runtime"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"

import AddQuestionInSection from "~/components/sections/add-question/AddQuestionInSection"
import { routes } from "~/constants/route.constants"
import type { Section } from "~/interface/Interface"
import { checkUserFeatureAuthorization } from "~/models/authorization.server"
import {
  getAddQuestion,
  getQuestionTypeFromTests,
  getSectionDataById,
  getWorkspaces,
} from "~/services/tests.service"
import { getUserId, requireUserId } from "~/session.server"

type LoaderData = {
  sectionDetails: Awaited<ReturnType<typeof getSectionDataById>>
  questionTypes: Awaited<ReturnType<typeof getQuestionTypeFromTests>>
  workspaces: Awaited<ReturnType<typeof getWorkspaces>>
  currentWorkspaceId: string
  permission: { [key: string]: { [key: string]: boolean } }
}
export type ActionData = {
  errors?: {
    title?: string
    body?: string
    status?: number
    check?: Date
    name?: string
    description?: string
    email?: string
    password?: string
  }
  error?:
    | {
        data?: string
        status?: number
      }
    | boolean
  success?:
    | {
        data?: string
        addMoreQuestion?: boolean
        status?: number
        redirectTo?: string
      }
    | boolean
  createSectionFieldError?: {
    title?: string
    description?: string
    duplicateTitle?: string
  }
  resp?: {
    status?: string | number
    check?: Date
    title?: string
    data?: Section
    id?: string
  }
  redirectTo?: string
  data?: string
}

function extractSectionIdFromPath(path: string): string | null {
  const matches = path.match(/\/tests\/([^/]+)\/add-question$/)
  return matches ? matches[1] : null
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const path = new URL(request.url).pathname

  if (!path.includes("/tests/") || !path.endsWith("/add-question")) {
    throw new Response("Not Found", { status: 404 })
  }

  const sectionId = extractSectionIdFromPath(path)
  if (!sectionId) {
    throw new Response("Not Found", { status: 404 })
  }

  const questionTypes = await getQuestionTypeFromTests()
  const userId = await getUserId(request)
  const currentWorkspaceId = params.workspaceId as string
  const workspaces = await getWorkspaces(userId as string)

  const permission = await checkUserFeatureAuthorization(
    userId!,
    currentWorkspaceId
  )

  if (!permission.questions.read) {
    return redirect(routes.unauthorized)
  }

  try {
    const sectionDetails = await getSectionDataById({
      id: sectionId,
      userId,
      workspaceId: currentWorkspaceId,
    })

    if (!sectionDetails) {
      throw new Response("Not Found", { status: 404 })
    }

    return json<LoaderData>({
      sectionDetails,
      questionTypes,
      workspaces,
      currentWorkspaceId,
      permission,
    })
  } catch (error: any) {
    if (error.status === 403) {
      return redirect(routes.unauthorized)
    }
    throw error
  }
}

export const action: ActionFunction = async ({ request, params }) => {
  const path = new URL(request.url).pathname

  // Ensure we're only handling add-question actions
  if (!path.includes("/tests/") || !path.endsWith("/add-question")) {
    throw new Response("Not Found", { status: 404 })
  }

  try {
    const userId = await getUserId(request)
    const currentWorkspaceId = params.workspaceId as string
    const createdById = await requireUserId(request)
    const formData = await request.formData()
    const questionData = formData.get("quesData")

    if (!questionData) {
      return json<ActionData>(
        { error: true, data: "Invalid form data" },
        { status: 400 }
      )
    }

    const question = JSON.parse(questionData as string)

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
      question?.addMoreQuestion,
      userId!,
      currentWorkspaceId
    )
    const responseData = (await response.json()) as ActionData
    if (responseData.success) {
      if (question.addMoreQuestion) {
        return json<ActionData>({ success: responseData.success })
      } else {
        return json<ActionData>({
          success: true,
          redirectTo: `/${currentWorkspaceId}${routes.tests}/${question.sectionId}`,
        })
      }
    }

    return json<ActionData>(responseData)
  } catch (error: any) {
    if (error.status === 403) {
      return redirect(routes.unauthorized)
    }
    return json({ error: true, data: error.message }, { status: 400 })
  }
}

export default function CatchAllRoute() {
  const location = useLocation()

  if (
    !location.pathname.includes("/tests/") ||
    !location.pathname.endsWith("/add-question")
  ) {
    throw new Response("Not Found", { status: 404 })
  }

  const { t } = useTranslation()
  const actionData = useActionData<typeof action>()
  const navigate = useNavigate()
  const [addQuestionKey, setAddQuestionKey] = useState(0)

  useEffect(() => {
    if (actionData?.success) {
      toast.success(t(actionData?.success?.data), {
        toastId: actionData?.success?.data,
      })
      if (actionData.success.addMoreQuestion) {
        setAddQuestionKey((prev) => prev + 1)
      } else if (actionData.redirectTo) {
        // Handle the redirect
        navigate(actionData.redirectTo)
      }
    } else if (actionData?.error?.status === 403) {
      navigate(routes.unauthorized)
    } else if (actionData?.error) {
      toast.error(t(actionData?.data))
    }
  }, [actionData, t, navigate])

  return <AddQuestionInSection key={addQuestionKey} />
}
