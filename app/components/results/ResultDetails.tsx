import { useLoaderData, useSubmit } from '@remix-run/react'

import { Icon } from '@iconify/react'
import { NavLink } from '@remix-run/react'
import { useState } from 'react'
import DropdownField from '../form/Dropdown'

const ResultDetailsComponent = () => {
  const { candidateResult, params } = useLoaderData()
  console.log('candidateResult', candidateResult)

  const dropdownData = [
    {
      name: 'Pending',
      value: false,
    },
    {
      name: 'Completed',
      value: true,
    },
  ]

  const [candidateStatus, updateCandidateStatus] = useState(false)

  const submit = useSubmit()

  const updateCandidateStatusToDB = () => {
    submit(
      {
        candidateStatus: candidateStatus.toString(),
        resultId: params?.candidateResultId,
      },
      { method: 'post' }
    )
  }

  return (
    <div id="test-details" className=" h-full ">
      <header className="mb-8">
        <div className="border-b border-solid border-slate-300 ">
          <div className="flex gap-2 pb-6">
            <NavLink
              to={`/results/groupByTests/${params?.testId}/completed`}
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
              {candidateResult?.candidate?.firstName}{' '}
              {candidateResult?.candidate?.lastName}
            </span>
          </div>
        </div>
      </header>
      <div id="results-test-candidate-list-tab" className="pb-5"></div>
      <div className="flex gap-4">
        <DropdownField
          data={dropdownData}
          displayKey={'name'}
          valueKey={'value'}
          value={candidateStatus}
          setValue={updateCandidateStatus}
        />
        <button
          className="rounded-md bg-primary py-2 px-8 text-sm text-white"
          onClick={updateCandidateStatusToDB}
        >
          Submit
        </button>
      </div>
    </div>
  )
}
export default ResultDetailsComponent
