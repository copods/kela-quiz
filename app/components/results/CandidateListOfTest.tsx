import { NavLink } from '@remix-run/react'
import { Icon } from '@iconify/react'
import ResultTab from './ResultTab'
import { useState } from 'react'
import CandidtateListOfTestItem from './CandidtateListOfTestItem'
import { useLoaderData } from '@remix-run/react'

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
  const { testPreview } = useLoaderData()
  const testData = testPreview?.candidateTest
  return (
    <div id="test-details" className=" h-full ">
      <header className="mb-8">
        <div className="border-b border-solid border-slate-300 ">
          <div className="flex gap-2 pb-6">
            <NavLink
              to={'/results/groupByTests'}
              className="flex items-center gap-4 "
            >
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
              {testPreview?.name}
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
      {currentTab === tabs[0].id && (
        <>
          {testData.length !== 0 ? (
            <div className="grid grid-cols-12  bg-[#F9FAFB] pb-4  ">
              <div className="col-span-full grid grid-cols-10 rounded-lg border border-solid border-[#E5E7EB] bg-tableHeader shadow-table">
                <div className="col-span-full grid grid-cols-10 py-4 px-12">
                  <span className="col-span-1 text-sm  font-semibold  text-gray-500">
                    Sr.No
                  </span>
                  <span className="col-span-3 text-sm  font-semibold  text-gray-500">
                    Email
                  </span>
                  <span className="col-span-2 text-sm  font-semibold  text-gray-500">
                    Invited By
                  </span>
                </div>
                {testData?.map((data: any, i: any) => (
                  <div
                    key={data.id}
                    className="memberRow col-span-10 grid  rounded-lg"
                  >
                    <CandidtateListOfTestItem
                      email={data?.candidate?.email}
                      invitedBy={`${data?.candidate?.createdBy?.firstName} ${data?.candidate?.createdBy?.lastName}`}
                      index={i}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>No Candidate for this Test</div>
          )}
        </>
      )}
      {currentTab === tabs[1].id && <div>attended</div>}
    </div>
  )
}

export default CandidateListOfTest
