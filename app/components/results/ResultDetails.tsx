import { useLoaderData, useNavigate, useSubmit } from '@remix-run/react'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import DropdownField from '../form/Dropdown'
import SectionCardForResultDetail from './SectionCardForResultDetail'
import Divider from '../divider'
import BarGraph from '../barGraph/barGraph'
import { commonConstants } from '~/constants/common.constants'
import Button from '../form/Button'
import type { SectionWiseResults } from '~/interface/Interface'
import { routes } from '~/constants/route.constants'

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
  let navigate = useNavigate()
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
          <div
            onClick={() =>
              navigate(`${routes.resultGroupTest}/${params?.testId}`)
            }
            className="flex items-center gap-4 "
            role={'button'}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter')
                navigate(
                  `${routes.resultGroupTest}/${params?.testId}/completed`
                )
            }}
          >
            <Icon
              className="text-3xl font-semibold text-gray-900"
              id="backButton"
              icon="mdi:arrow-left"
            ></Icon>
          </div>
          <span className="text-3xl font-semibold text-gray-900" id="title">
            {candidateResult?.candidate?.firstName}&nbsp;
            {candidateResult?.candidate?.lastName}
          </span>
        </div>
      </header>
      <Divider height="1px" />
      <BarGraph sectionWiseResult={sectionWiseResult} />
      <Divider height="1px" />
      <div id="results-test-candidate-list-tab" className="flex flex-col gap-6">
        {sectionWiseResult.map((section: SectionWiseResults) => {
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
      <div className="flex gap-4 pb-5">
        <DropdownField
          data={dropdownData}
          displayKey={'name'}
          valueKey={'value'}
          value={candidateStatus}
          setValue={updateCandidateStatus}
        />
        <Button
          varient="primary-solid"
          className="px-6"
          onClick={updateCandidateStatusToDB}
          title={commonConstants.submit}
          buttonText={commonConstants.submit}
        />
      </div>
    </div>
  )
}
export default ResultDetailsComponent
