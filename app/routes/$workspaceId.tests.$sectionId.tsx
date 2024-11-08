import { useEffect } from "react"

import { json } from "@remix-run/node"
import { useActionData, useNavigate } from "@remix-run/react"
import type { LoaderFunction, ActionFunction } from "@remix-run/server-runtime"
import { redirect } from "@remix-run/server-runtime"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"
import invariant from "tiny-invariant"

import SectionDetails from "~/components/sections/SectionDetails"
import { routes } from "~/constants/route.constants"
import { deleteQuestionStatus } from "~/interface/Interface"
import { checkUserFeatureAuthorization } from "~/models/authorization.server"
import {
  addQuestionByCSV,
  deleteTestQuestionById,
  getQuestionTypeFromTests,
  getSectionDataById,
} from "~/services/tests.service"
import { getUserId } from "~/session.server"

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.sectionId, "sectionId not found")
  try {
    const userId = await getUserId(request)
    const currentWorkspaceId = params.workspaceId as string
    const questionTypes = await getQuestionTypeFromTests()
    const permission = await checkUserFeatureAuthorization(
      userId!,
      currentWorkspaceId
    )

    if (!permission.questions.read) {
      return redirect(routes.unauthorized)
    }
    const sectionDetails = await getSectionDataById({
      id: params.sectionId,
      userId,
      workspaceId: currentWorkspaceId,
    })
    if (!sectionDetails) {
      throw new Response("Not Found", { status: 404 })
    }
    return json({
      sectionDetails,
      currentWorkspaceId,
      permission,
      questionTypes,
    })
  } catch (error: any) {
    if (error.status === 403) {
      return redirect(routes.unauthorized)
    }
  }
}
export const action: ActionFunction = async ({ request, params }) => {
  try {
    const formData = await request.formData()
    const id = formData.get("id") as string
    const userId = await getUserId(request)
    const currentWorkspaceId = params.workspaceId as string

    const questions = formData.get("questionsData")
    const action = formData.get("action")

    if (action === "add-question-by-csv") {
      await addQuestionByCSV(
        JSON.parse(questions as any),
        userId!,
        currentWorkspaceId
      )
      return { msg: "success" }
    }
    if (action === "deleteQuestion") {
      return await deleteTestQuestionById(id, userId!, currentWorkspaceId)
    }
    return { msg: "success" }
  } catch (error: any) {
    if (error.status === 403) {
      return redirect(routes.unauthorized)
    }
  }
}
export default function Section() {
  const { t } = useTranslation()
  const section = useActionData<typeof action>()
  const navigate = useNavigate()

  useEffect(() => {
    if (section?.errors?.status === 403) {
      navigate(routes.unauthorized)
    } else if (section?.resp?.title === deleteQuestionStatus.deleted) {
      toast.success(t("statusCheck.deletedSuccess"))
    } else if (section?.resp?.title === deleteQuestionStatus.notDeleted) {
      toast.error(t("sectionsConstants.questionNotDeleted"), {
        toastId: "question-not-deleted",
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section, t])
  return <SectionDetails />
}
