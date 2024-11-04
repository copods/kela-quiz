import { useEffect, useState } from "react"

import { Icon } from "@iconify/react"
import { useLoaderData, useNavigate } from "@remix-run/react"

import BarGraph from "../barGraph/barGraph"
import Divider from "../common-components/divider"
import EmptyStateComponent from "../common-components/EmptyStateComponent"

import SectionCardForResultDetail from "./SectionCardForResultDetail"

import { routes } from "~/constants/route.constants"
import type { SectionInCandidateTest } from "~/interface/Interface"
import type { loader } from "~/routes/$workspaceId.results.groupByTests.$testId.$candidateId._index"

const ResultDetailsComponent = () => {
  const { params, sections, candidate, currentWorkspaceId, candidateResult } =
    useLoaderData<typeof loader>()

  const [result, setResult] = useState(0)

  let navigate = useNavigate()
  const sortedSections = sections.sort(
    (a: SectionInCandidateTest, b: SectionInCandidateTest) => {
      return a.order - b.order
    }
  )
  useEffect(() => {
    setResult(
      Number(
        (
          (candidateResult[0]?.correctQuestion /
            candidateResult[0]?.totalQuestion) *
          100
        ).toFixed(2)
      )
    )
  }, [candidateResult])
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
          <div className="flex w-full items-center justify-between">
            <span className="text-3xl font-semibold text-gray-900" id="title">
              {candidate?.firstName} {candidate?.lastName}
            </span>
            {result ? (
              <div
                className={`text-lg ${
                  result >= 70 ? "text-green-600" : "text-red-600"
                }`}
              >
                {result >= 70 ? "Pass" : "Fail"}
                <span className="text-slate-400">&nbsp;•&nbsp;</span>
                <span className="text-base text-slate-800">{`${parseInt(
                  result.toFixed(2)
                )}%`}</span>
              </div>
            ) : null}
          </div>
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
                  sectionId={section?.id}
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
                  currentWorkspaceId={currentWorkspaceId}
                  candidateId={params.candidateId}
                  testId={params.testId}
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
