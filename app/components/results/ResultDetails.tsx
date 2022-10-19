import { useLoaderData, useNavigate } from '@remix-run/react'
import { Icon } from '@iconify/react'
import SectionCardForResultDetail from './SectionCardForResultDetail'
import Divider from '../divider'
import BarGraph from '../barGraph/barGraph'
import type { SectionWiseResults } from '~/interface/Interface'
import { routes } from '~/constants/route.constants'
// import { useTranslation } from 'react-i18next'

const ResultDetailsComponent = () => {
  // const { t } = useTranslation()

  const { candidateResult, params, sectionWiseResult } = useLoaderData()

  let navigate = useNavigate()

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
                navigate(`${routes.resultGroupTest}/${params?.testId}`)
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
              skippedQuestions={section?.skipped}
              incorrectQuestions={section?.incorrect}
              unansweredQuestions={section?.unanswered}
            />
          )
        })}
      </div>
    </div>
  )
}
export default ResultDetailsComponent
