import { Icon } from "@iconify/react"
import { useLoaderData, useNavigate } from "@remix-run/react"

import BarGraph from "../barGraph/barGraph"
import Divider from "../common-components/divider"
import EmptyStateComponent from "../common-components/EmptyStateComponent"

import SectionCardForResultDetail from "./SectionCardForResultDetail"

import { routes } from "~/constants/route.constants"
import type { SectionInCandidateTest } from "~/interface/Interface"
// import { useTranslation } from 'react-i18next'

const ResultDetailsComponent = () => {
  // const { t } = useTranslation()

  const { params, sections, candidate, currentWorkspaceId } = useLoaderData()
  let navigate = useNavigate()
  const sortedSections = sections.sort(
    (a: SectionInCandidateTest, b: SectionInCandidateTest) => {
      return a.order - b.order
    }
  )
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
            role={"button"}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter")
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
            {candidate?.firstName} {candidate?.lastName}
          </span>
        </div>
      </header>
      <Divider height="1px" />
      {sections ? (
        <>
          <BarGraph candidateTestResult={sortedSections} />
          <Divider height="1px" />
          <div
            id="results-test-candidate-list-tab"
            className="flex flex-col gap-6"
          >
            {sortedSections.map((section: SectionInCandidateTest) => {
              return (
                <SectionCardForResultDetail
                  key={section?.id}
                  startedAt={section?.startedAt}
                  endAt={section?.endAt}
                  sectionName={section.section?.name}
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
