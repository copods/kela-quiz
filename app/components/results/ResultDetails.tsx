import { useLoaderData, useNavigate } from '@remix-run/react'
import { Icon } from '@iconify/react'
import SectionCardForResultDetail from './SectionCardForResultDetail'
import Divider from '../common-components/divider'
import BarGraph from '../barGraph/barGraph'
import { routes } from '~/constants/route.constants'
import EmptyStateComponent from '../common-components/EmptyStateComponent'
// import { useTranslation } from 'react-i18next'

const ResultDetailsComponent = () => {
  // const { t } = useTranslation()

  const { params, candidateTestWiseResult, currentWorkspaceId } =
    useLoaderData()
  let navigate = useNavigate()
  const sortSections =candidateTestWiseResult.sections.sort((a:any,b:any)=>{
  return(
    a.SectionWiseResult.length-b.SectionWiseResult.length
  ) 
  })
 

  return (
    <div id="test-details" className="flex h-full flex-col gap-6">
      <header>
        <div className="flex gap-2">
          <div
            onClick={() =>
              navigate(
                `/${currentWorkspaceId}${routes.resultGroupTest}/${params?.testId}`
              )
            }
            className="flex items-center gap-4 "
            role={'button'}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter')
                navigate(
                  `/${currentWorkspaceId}${routes.resultGroupTest}/${params?.testId}`
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
            {candidateTestWiseResult.candidate?.firstName}
            &nbsp;
            {candidateTestWiseResult.candidate?.lastName}
          </span>
        </div>
      </header>
      <Divider height="1px" />
      {candidateTestWiseResult ? (
        <>
          <BarGraph candidateTestWiseResult={candidateTestWiseResult} />
          <Divider height="1px" />
          <div
            id="results-test-candidate-list-tab"
            className="flex flex-col gap-6"
          >
            {sortSections.reverse().map((section: any) => {
              return (
                <SectionCardForResultDetail
                  key={section?.id}
                  sectionName={section.section?.name}
                  startedAt={section.SectionWiseResult[0]?.section?.startedAt}
                  correctQuestions={
                    section.SectionWiseResult[0]?.correctQuestion
                  }
                  incorrectQuestions={section.SectionWiseResult[0]?.incorrect}
                  skippedQuestions={section.SectionWiseResult[0]?.skipped}
                  totalQuestions={section.SectionWiseResult[0]?.totalQuestion}
                  unansweredQuestions={section.SectionWiseResult[0]?.unanswered}
                />
              )
            })}
          </div>
        </>
      ) : (
        <EmptyStateComponent />
      )}
    </div>
  )
}
export default ResultDetailsComponent
