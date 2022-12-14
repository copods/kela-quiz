import type { LoaderFunction, ActionFunction } from '@remix-run/server-runtime'
import { json } from '@remix-run/node'
import { getSectionById } from '~/models/sections.server'
import invariant from 'tiny-invariant'
import SectionDetails from '~/components/sections/SectionDetails'
import { deleteQuestion } from '~/models/sections.server'

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
  if (action === 'deleteQuestion') {
    let deleteHandle = null
    await deleteQuestion(id)
      .then(() => {
        deleteHandle = json<ActionData>(
          { resp: { title: 'statusCheck.deletedSuccess', status: 200 } },
          { status: 200 }
        )
      })
      .catch(() => {
        deleteHandle = json<ActionData>(
          {
            errors: {
              title: 'statusCheck.commonError',
              status: 400,
            },
          },
          { status: 400 }
        )
      })

    return deleteHandle
  }

  return null
}
export default function Section() {
  return <SectionDetails />
}
