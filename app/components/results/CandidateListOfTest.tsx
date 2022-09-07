import { NavLink, Outlet } from '@remix-run/react'
import { Icon } from '@iconify/react'
import ResultTab from './ResultTab'
import { useLoaderData } from '@remix-run/react'
import { routes } from '~/constants/route.constants'

const CandidateListOfTest = () => {
  const tabs = [
    {
      id: 0,
      title: 'Exam Pending',
      route: 'exam-pending',
    },
    {
      id: 1,
      title: 'Attempted',
      route: 'attempted',
    },
    {
      id: 2,
      title: 'Completed',
      route: 'completed',
    },
  ]
  const { testPreview, params } = useLoaderData()
  return (
    <div id="test-details" className=" h-full ">
      <header className="mb-8">
        <div className="border-b border-solid border-slate-300 ">
          <div className="flex gap-2 pb-6">
            <NavLink
              to={routes.resultGroupTest}
              className="flex items-center gap-4 "
            >
              <Icon
                className="text-3xl font-semibold text-gray-900"
                id="back-button"
                icon="mdi:arrow-left"
              />
            </NavLink>
            <span className="text-3xl font-semibold text-gray-900" id="title">
              {testPreview?.name}
            </span>
          </div>
        </div>
      </header>
      <div id="results-test-candidate-list-tab" className="pb-5">
        <ResultTab tabs={tabs} testId={params.testId} />
      </div>
      <Outlet />
    </div>
  )
}

export default CandidateListOfTest
