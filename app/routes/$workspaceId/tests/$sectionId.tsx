import type { LoaderFunction } from '@remix-run/server-runtime'
import { json } from '@remix-run/node'
import { getSectionById } from '~/models/sections.server'
import invariant from 'tiny-invariant'
import SectionDetails from '~/components/sections/SectionDetails'

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.sectionId, 'sectionId not found')
  const sectionDetails = await getSectionById({ id: params.sectionId })
  if (!sectionDetails) {
    throw new Response('Not Found', { status: 404 })
  }
  const currentWorkspaceId = params.workspaceId
  return json({ sectionDetails, currentWorkspaceId })
}
export default function Section() {
  return <SectionDetails />
}
