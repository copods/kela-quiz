import { NavLink } from '@remix-run/react'
import { Icon } from '@iconify/react'
import ResultTab from './ResultTab'
import { useState } from 'react'

const CandidateListOfTest = () => {
  const tabs = [
    {
      id: 0,
      title: 'Exam Pending',
    },
    {
      id: 1,
      title: 'Attended',
    },
  ]
  const [currentTab, setCurrentTab] = useState(0)
  return (
    <div id="test-details" className="h-full">
      <header className="mb-8">
        <div className="border-b border-solid border-slate-300">
          <div className="flex gap-2 pb-6">
            <NavLink to={'/results'} className="flex items-center gap-4 ">
              <Icon
                className="text-3xl font-semibold leading-9 text-gray-900"
                id="backButton"
                icon="mdi:arrow-left"
              ></Icon>
            </NavLink>
            <span
              className="text-3xl font-semibold leading-9 text-gray-900"
              id="title"
            >
              Test Name
            </span>
          </div>
        </div>
      </header>
      <div id="results-test-candidate-list-tab" className="pb-5">
        <ResultTab
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </div>
      {currentTab === tabs[0].id && <div className="">exam pending</div>}
      {currentTab === tabs[1].id && <div>attended</div>}
    </div>
  )
}

export default CandidateListOfTest
