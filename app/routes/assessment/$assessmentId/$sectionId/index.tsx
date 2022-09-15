import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'

export const loader: LoaderFunction = async ({ params }) => {
  return redirect(
    `/assessment/${params.assessmentId}/${params.sectionId}/cooldown`
  )
}
