import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'

export const loader: LoaderFunction = async ({ params }) => {
  console.log(params)
  return redirect(`/results/groupByTests/${params.resultsId}/exam-pending`)
}
