import type { LoaderFunction } from '@remix-run/server-runtime'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getSectionById } from '~/models/sections.server'
import invariant from 'tiny-invariant'
import SectionDetails from '~/components/sections/SectionDetails'

type LoaderData = {
  sectionDetails: Awaited<ReturnType<typeof getSectionById>>
}

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.sectionId, 'sectionId not found')
  console.log(params.sectionId)
  const sectionDetails = await getSectionById({ id: params.sectionId })
  if (!sectionDetails) {
    throw new Response('Not Found', { status: 404 })
  }
  return json<LoaderData>({ sectionDetails })
}
export default function Section() {
  const data = useLoaderData() as LoaderData

  return <SectionDetails sectionDetails={data.sectionDetails} />
}
