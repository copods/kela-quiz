import type { LoaderFunction } from '@remix-run/server-runtime'
import { getResultDetailBySection } from '~/models/result.server'

import ResultDetailBySections from '~/components/results/ResultDetailBySections'

export const loader: LoaderFunction = async ({ request, params }) => {
 const sectionDetail=  await getResultDetailBySection(params?.sectionId)
  return { params ,sectionDetail}
}
const ResultDetail = () => {
  return(
    <div><ResultDetailBySections/></div>
    )
}
export default ResultDetail
