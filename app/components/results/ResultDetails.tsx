import { useLoaderData, useSubmit } from '@remix-run/react'

import { Icon } from '@iconify/react'
import { NavLink } from '@remix-run/react'
import { useState } from 'react'
import DropdownField from '../form/Dropdown'
import SectionCardForResultDetail from './SectionCardForResultDetail'
import Divider from '../divider'
import BarGraph from '../barGraph/barGraph'
import { commonConstants } from '~/constants/common.constants'
import Button from '../form/Button'

const ResultDetailsComponent = () => {
  const { candidateResult, params, sectionWiseResult } = useLoaderData()
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
    <div id="test-details" className="flex h-full flex-col gap-6">
      <header>
        <div className="flex gap-2">
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
            {candidateResult?.candidate?.firstName}&nbsp;
            {candidateResult?.candidate?.lastName}
          </span>
        </div>
      </header>
      <Divider height="1px" />
      <BarGraph />
      <Divider height="1px" />
      <div id="results-test-candidate-list-tab" className="flex flex-col gap-6">
        {sectionWiseResult.map((section: any) => {
          return (
            <SectionCardForResultDetail
              key={section?.id}
              name={section?.section?.section?.name}
              totalQuestions={section?.totalQuestion}
              correctQuestions={section?.correctQuestion}
              skippedQuestions={section?.unanswered}
            />
          )
        })}
      </div>
      <Divider height="1px" />
      <div className="flex gap-4">
        <DropdownField
          data={dropdownData}
          displayKey={'name'}
          valueKey={'value'}
          value={candidateStatus}
          setValue={updateCandidateStatus}
        />
        <Button
        varient='primary-solid'
        className='px-6'
        onClick={updateCandidateStatusToDB}
        buttonText={commonConstants.submit}
        />
      </div>
    </div>
  )
}
export default ResultDetailsComponent
