import { useEffect } from "react"

import { json } from "@remix-run/node"
import { useActionData } from "@remix-run/react"
import type { LoaderFunction, ActionFunction } from "@remix-run/server-runtime"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"
import invariant from "tiny-invariant"

import SectionDetails from "~/components/sections/SectionDetails"
import { deleteQuestionStatus } from "~/interface/Interface"
import {
  getDeleteQuestionById,
  getSectionDataById,
} from "~/services/tests.service"

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.sectionId, "sectionId not found")
  const sectionDetails = await getSectionDataById({ id: params.sectionId })
  if (!sectionDetails) {
    throw new Response("Not Found", { status: 404 })
  }
  const currentWorkspaceId = params.workspaceId
  return json({ sectionDetails, currentWorkspaceId })
}
export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData()
  const id = formData.get("id") as string
  return await getDeleteQuestionById(id)
}
export default function Section() {
  const { t } = useTranslation()
  const section = useActionData()

  useEffect(() => {
    if (section?.resp?.title === deleteQuestionStatus.deleted) {
      toast.success(t("statusCheck.deletedSuccess"))
    } else if (section?.resp?.title === deleteQuestionStatus.notDeleted) {
      toast.error(t("sectionsConstants.questionNotDeleted"), {
        toastId: "question-not-deleted",
      })
    }
  }, [section, t])
  return <SectionDetails />
}
