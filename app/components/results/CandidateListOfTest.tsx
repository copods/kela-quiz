import { NavLink } from '@remix-run/react'
import { Icon } from '@iconify/react'
import { useLoaderData } from '@remix-run/react'
import { routes } from '~/constants/route.constants'
import CandidatesList from './CandidatesList'

const CandidateListOfTest = () => {
  const { candidatesOfTest } = useLoaderData()

  return (
    <div id="test-details" className="h-full">
      <header className="mb-8">
        <div className="border-b border-solid border-slate-300 ">
          <div className="flex gap-2 pb-6">
            <NavLink
              to={routes.resultGroupTest}
              className="flex items-center gap-4 "
            >
              <Icon
                className="text-3xl font-semibold leading-9 text-gray-900"
                id="back-button"
                icon="mdi:arrow-left"
              />
            </NavLink>
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
