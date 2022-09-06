import type { LoaderFunction } from '@remix-run/server-runtime'
import { json } from '@remix-run/node'
import { getSectionById } from '~/models/sections.server'
import invariant from 'tiny-invariant'
import SectionDetails from '~/components/sections/SectionDetails'
import { statusCheck } from '~/constants/common.constants'

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.sectionId, 'sectionId not found')
  const sectionDetails = await getSectionById({ id: params.sectionId })
  if (!sectionDetails) {
    throw new Response(statusCheck.notFound, { status: 404 })
  }
  return json({ sectionDetails })
}
export default function Section() {
  return <SectionDetails />
}
