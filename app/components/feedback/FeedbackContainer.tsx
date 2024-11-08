import { useEffect, useState } from "react"

import { useLoaderData, useLocation, useNavigate } from "@remix-run/react"
import { t } from "i18next"

import negativeFeedbackIcon from "../../../public/assets/negativeFeedback.svg"
import neutralFeedbackIcon from "../../../public/assets/neutralFeedback.svg"
import positiveFeedbackIcon from "../../../public/assets/positiveFeedback.svg"
import totalFeedbackIcon from "../../../public/assets/totalFeedback.svg"
import EmptyStateComponent from "../common-components/EmptyStateComponent"
import Table from "../common-components/TableComponent"
import Header from "../header/Header"

import { FeedbackCard } from "./FeedbackCard"
import { FeedbackTableHeader } from "./FeedbackTableHeader"
import {
  ActionRenderer,
  CandidateEmailRenderer,
  CandidateNameRenderer,
  FeedbackTypeRenderer,
  GivenOnRenderer,
  TestNameRenderer,
} from "./FeedbackTableRenderers"

import type { CandidateFeedbacks, tableColumnType } from "~/interface/Interface"
import type { loader } from "~/routes/$workspaceId.feedback._index"

export const FeedbackContainer = () => {
  const candidatesFeedbackData = useLoaderData<typeof loader>()

  const [feedbackCurrentPage, setFeedbackCurrentPage] = useState(
    candidatesFeedbackData.feedbackCurrentPage
  )
  const [feedbackPageSize, setFeedbackPageSize] = useState(10)

  const [feedbackTypeFilter, setFeedbackTypeFilter] = useState(
    candidatesFeedbackData.feedbackType
  )
  const [testFilter, setTestFilter] = useState("all_tests")
  const [sortFilter, setSortFilter] = useState(candidatesFeedbackData.sortBy)
  const location = useLocation()

  const navigate = useNavigate()
  candidatesFeedbackData.allTests.splice(0, 0, {
    id: "all_tests",
    name: "All Tests",
  })
  const feedBackCardDetails = [
    {
      id: "totalFeedback",
      title: t("feedback.totalFeedback"),
      value:
        candidatesFeedbackData.totalFeedbackCounts.positive +
        candidatesFeedbackData.totalFeedbackCounts.negative +
        candidatesFeedbackData.totalFeedbackCounts.neutral,
      icon: totalFeedbackIcon,
    },
    {
      id: "positiveFeedback",
      title: t("feedback.positiveFeedback"),
      value: candidatesFeedbackData.totalFeedbackCounts.positive,
      icon: positiveFeedbackIcon,
    },
    {
      id: "negativeFeedback",
      title: t("feedback.negativeFeedback"),
      value: candidatesFeedbackData.totalFeedbackCounts.negative,
      icon: negativeFeedbackIcon,
    },
    {
      id: "neutralFeedback",
      title: t("feedback.neutralFeedback"),
      value: candidatesFeedbackData.totalFeedbackCounts.neutral,
      icon: neutralFeedbackIcon,
    },
  ]

  const testColumns: tableColumnType[] = [
    {
      title: "Test Name",
      field: "test_name",
      render: TestNameRenderer,
      width: "30%",
    },
    {
      title: "Candidate Name",
      field: "candidate_name",
      render: CandidateNameRenderer,
      width: "15%",
    },
    {
      title: "Candidate Email",
      field: "candidate_email",
      render: CandidateEmailRenderer,
      width: "20%",
    },
    {
      title: "Feedback Type",
      field: "feedback_type",
      render: FeedbackTypeRenderer,
      width: "10%",
    },
    {
      title: "Given On",
      field: "given_on",
      render: GivenOnRenderer,
      width: "15%",
    },
    {
      title: "Action",
      field: "action",
      render: ActionRenderer,
      width: "10%",
    },
  ]

  const tableData = candidatesFeedbackData.userFeedback.map(
    (feedback: CandidateFeedbacks) => {
      return {
        test_name: feedback.candidateTest.test.name,
        candidate_name:
          feedback.candidate.firstName + " " + feedback.candidate.lastName,
        candidate_email: feedback.candidate.email,
        feedback_type: feedback.feedbackType,
        given_on: feedback.createdAt,
        action: feedback.userFeedbackQuestion,
      }
    }
  )

  useEffect(() => {
    navigate(
      `?page=${1}&limit=${feedbackPageSize}&feedbackType=${feedbackTypeFilter}&testId=${testFilter}&sortBy=${sortFilter}`,
      { replace: true }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedbackTypeFilter])

  useEffect(() => {
    navigate(
      `?page=${feedbackCurrentPage}&limit=${feedbackPageSize}&feedbackType=${feedbackTypeFilter}&testId=${testFilter}&sortBy=${sortFilter}`,
      {
        replace: true,
      }
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    feedbackPageSize,
    feedbackCurrentPage,
    feedbackTypeFilter,
    testFilter,
    sortFilter,
    location.search,
  ])

  useEffect(() => {
    navigate(
      `?page=${1}&limit=${feedbackPageSize}&feedbackType=${feedbackTypeFilter}&testId=${testFilter}&sortBy=${sortFilter}`,
      {
        replace: true,
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedbackTypeFilter, testFilter, sortFilter])

  useEffect(() => {
    setFeedbackCurrentPage(candidatesFeedbackData.feedbackCurrentPage)
  }, [candidatesFeedbackData.feedbackCurrentPage])

  return (
    <div className="flex h-full flex-col gap-10">
      <Header heading={t("commonConstants.feedback")} id="feedback" />
      {candidatesFeedbackData.totalFeedbackCounts.positive +
        candidatesFeedbackData.totalFeedbackCounts.negative +
        candidatesFeedbackData.totalFeedbackCounts.neutral >
      0 ? (
        <div className="flex h-full w-full flex-col gap-8">
          <div
            className="grid grid-cols-4 gap-5"
            data-cy="feedback-card-container"
          >
            {feedBackCardDetails.map((cardData, index) => (
              <FeedbackCard
                key={index}
                id={cardData.id}
                title={cardData.title}
                value={cardData.value}
                icon={cardData.icon}
              />
            ))}
          </div>
          <div className="flex h-full flex-col gap-5">
            <FeedbackTableHeader
              feedbackTypeFilter={feedbackTypeFilter}
              setFeedbackTypeFilter={(e: string) => {
                setFeedbackTypeFilter(e)
              }}
              testFilter={testFilter}
              setTestFilter={(e: string) => setTestFilter(e)}
              totalTests={candidatesFeedbackData.allTests}
              sortFilter={sortFilter}
              setSortFilter={(e: string) => setSortFilter(e)}
            />
            <Table
              data={tableData}
              columns={testColumns}
              paginationEnabled={tableData.length > 0 && true}
              pageSize={feedbackPageSize}
              setPageSize={setFeedbackPageSize}
              currentPage={feedbackCurrentPage}
              onPageChange={setFeedbackCurrentPage}
              totalItems={candidatesFeedbackData.allCandidatesFeedbackCount}
            />
          </div>
        </div>
      ) : (
        <EmptyStateComponent text={t("emptyStateConstants.noFeedbackState")} />
      )}
    </div>
  )
}
