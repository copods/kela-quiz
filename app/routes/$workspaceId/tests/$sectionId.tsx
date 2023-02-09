import { useEffect } from "react"

import { json } from "@remix-run/node"
import { useActionData } from "@remix-run/react"
import type { LoaderFunction, ActionFunction } from "@remix-run/server-runtime"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"
import invariant from "tiny-invariant"

import SectionDetails from "~/components/sections/SectionDetails"
import { getDeleteQuestionById, getTestById } from "~/services/tests.service"

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
export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.sectionId, "sectionId not found")
  const sectionDetails = await getTestById({ id: params.sectionId })
  if (!sectionDetails) {
    throw new Response("Not Found", { status: 404 })
  }
  const currentWorkspaceId = params.workspaceId
  return json({ sectionDetails, currentWorkspaceId })
}
export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData()
  const id = formData.get("id") as string
  const deleteQuestion = await getDeleteQuestionById(id)
  return deleteQuestion
}
export default function Section() {
  const { t } = useTranslation()
  const section = useActionData() as ActionData
  useEffect(() => {
    if (section?.resp?.status === 200) {
      toast.success(t(section.resp?.title))
    } else if (section?.errors?.status === 400) {
      toast.error(t(section.errors?.title), {
        toastId: section.errors?.title,
      })
    }
  }, [section, t])
  return <SectionDetails />
}
