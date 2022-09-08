import { useNavigate } from '@remix-run/react'
import { Icon } from '@iconify/react'
import { useLoaderData } from '@remix-run/react'
import { routes } from '~/constants/route.constants'
import CandidatesList from './CandidatesList'

const CandidateListOfTest = () => {
  const { candidatesOfTest } = useLoaderData()
  let navigate = useNavigate()

  return (
    <div id="test-details" className="h-full">
      <header className="mb-8">
        <div className="border-b border-solid border-slate-300 ">
          <div className="flex gap-2 pb-6">
            <div
              onClick={() => navigate(routes.resultGroupTest)}
              role={'button'}
              tabIndex={0}
              className="flex items-center gap-4 "
              onKeyDown={(e) => {
                if (e.key === 'Enter') navigate(routes.resultGroupTest)
              }}
            >
              <Icon
                className="text-3xl font-semibold text-gray-900"
                id="back-button"
                icon="mdi:arrow-left"
              />
            </div>
            <span className="text-3xl font-semibold text-gray-900" id="title">
              {candidatesOfTest?.name}
            </span>
          </div>
        </div>
      </header>
      <CandidatesList />
    </div>
  )
}

export default CandidateListOfTest
