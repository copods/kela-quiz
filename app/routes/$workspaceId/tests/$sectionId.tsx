import type { LoaderFunction, ActionFunction } from '@remix-run/server-runtime'
import { json } from '@remix-run/node'
import { getSectionById } from '~/models/sections.server'
import invariant from 'tiny-invariant'
import SectionDetails from '~/components/sections/SectionDetails'
import { deleteQuestionById } from '~/models/sections.server'
import { useActionData } from '@remix-run/react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { actions } from '~/constants/action.constants'

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.sectionId, 'sectionId not found')
  const sectionDetails = await getSectionById({ id: params.sectionId })
  if (!sectionDetails) {
    throw new Response('Not Found', { status: 404 })
  }
  const currentWorkspaceId = params.workspaceId
  return json({ sectionDetails, currentWorkspaceId })
}
export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData()
  const action = await formData.get('action')
  const id = formData.get('id') as string
  if (action === actions.deleteQuestion) {
    const deleteQuestion = await deleteQuestionById(id)
    return deleteQuestion
  }

  return null
}
export default function Section() {
  const { t } = useTranslation()
  const section = useActionData()

  useEffect(() => {
    if (section) {
      toast.success(t('statusCheck.deletedSuccess'))
    } else if (section === false) {
      toast.error(t('sectionsConstants.questionNotDeleted'), {
        toastId: 'sectionsConstants.questionNotDeleted',
      })
    }
  }, [section, t])
  return <SectionDetails />
}
