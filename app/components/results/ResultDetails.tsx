import { useState } from "react"

import { Icon } from "@iconify/react"
import { useLoaderData, useNavigate } from "@remix-run/react"
import { useTranslation } from "react-i18next"

import BarGraph from "../barGraph/barGraph"
import {
  DialogContent,
  DialogHeader,
  DialogWrapper,
} from "../common-components/Dialog"
import Divider from "../common-components/divider"
import EmptyStateComponent from "../common-components/EmptyStateComponent"

import SectionCardForResultDetail from "./SectionCardForResultDetail"

import { routes } from "~/constants/route.constants"
import type { SectionInCandidateTest } from "~/interface/Interface"

const ResultDetailsComponent = () => {
  const {
    params,
    sections,
    candidate,
    currentWorkspaceId,
    // candidatePicture,
    surveillanceImages,
    // surveillanceErrors,
  } = useLoaderData()
  let navigate = useNavigate()

  const { t } = useTranslation()

  const [surveillanceDialogOpen, setSurveillanceDialogOpen] = useState(false)

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
          {surveillanceImages?.length > 0 && (
            <>
              <Divider height="1px" />
              <div className="flex h-12 min-h-2.875 w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-6">
                <div className="text-base font-semibold text-gray-700">
                  {t("resultConstants.cameraSurveillance")}
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  className="cursor-pointer text-sm text-base font-semibold text-primary"
                  onClick={() => setSurveillanceDialogOpen(true)}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") setSurveillanceDialogOpen(true)
                  }}
                >
                  {t("resultConstants.viewDetails")}
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <EmptyStateComponent />
      )}
      <DialogWrapper
        open={surveillanceDialogOpen}
        setOpen={setSurveillanceDialogOpen}
      >
        <>
          <DialogHeader
            heading={t("resultConstants.cameraSurveillance")}
            onClose={() => setSurveillanceDialogOpen(false)}
          />
          <DialogContent>
            <div className="flex flex-wrap gap-6">
              {surveillanceImages?.map((image: string, index: number) => {
                return (
                  <img
                    src={image}
                    alt="img"
                    key={index}
                    width={180}
                    height={110}
                  />
                )
              })}
            </div>
          </DialogContent>
        </>
      </DialogWrapper>
    </div>
  )
}
export default ResultDetailsComponent
