import { useState } from "react"

import { t } from "i18next"

import negativeFeedbackIcon from "../../../public/assets/negativeFeedback.svg"
import neutralFeedbackIcon from "../../../public/assets/neutralFeedback.svg"
import positiveFeedbackIcon from "../../../public/assets/positiveFeedback.svg"
import totalFeedbackIcon from "../../../public/assets/totalFeedback.svg"
import Table from "../common-components/TableComponent"
import Header from "../header/Header"

import { FeedbackCard } from "./FeedbackCard"
import { FeedbackTableHeader } from "./FeedbackTableHeader"
import {
  FeedbackTypeRenderer,
  TestNameRenderer,
} from "./FeedbackTableRenderers"

import type { tableColumnType } from "~/interface/Interface"

export const FeedbackContainer = () => {
  const [tablePageSize, setTablePageSize] = useState(5)
  const [tablePageNumber, setTablePageNumber] = useState(1)

  const feedBackCardDetails = [
    {
      id: "totalFeedback",
      title: t("feedback.totalFeedback"),
      value: 2109,
      icon: totalFeedbackIcon,
    },
    {
      id: "positiveFeedback",
      title: t("feedback.positiveFeedback"),
      value: 1754,
      icon: positiveFeedbackIcon,
    },
    {
      id: "negativeFeedback",
      title: t("feedback.negativeFeedback"),
      value: 98,
      icon: negativeFeedbackIcon,
    },
    {
      id: "neutralFeedback",
      title: t("feedback.neutralFeedback"),
      value: 256,
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
      // render: "Candidate Name",
      width: "15%",
    },
    {
      title: "Candidate Email",
      field: "candidate_email",
      // render: "Candidate Email",
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
      // render: "Given On",
      width: "15%",
    },
    {
      title: "Action",
      field: "action",
      // render: "action",
      width: "10%",
    },
  ]

  const tableData = [
    {
      test_name: "Fresher’s Pre Interview Assesment",
      candidate_name: "Anurag Patel",
      candidate_email: "anuragpatel@kquiz.com",
      feedback_type: "Positive",
      given_on: "21 June 2022",
      action: "Action",
    },
    {
      test_name: "Fresher’s Pre Interview Assesment",
      candidate_name: "Anurag Patel",
      candidate_email: "anuragpatel@kquiz.com",
      feedback_type: "Positive",
      given_on: "21 June 2022",
      action: "Action",
    },
    {
      test_name: "Fresher’s Pre Interview Assesment",
      candidate_name: "Anurag Patel",
      candidate_email: "anuragpatel@kquiz.com",
      feedback_type: "Negative",
      given_on: "21 June 2022",
      action: "Action",
    },
    {
      test_name: "Fresher’s Pre Interview Assesment",
      candidate_name: "Anurag Patel",
      candidate_email: "anuragpatel@kquiz.com",
      feedback_type: "Neutral",
      given_on: "21 June 2022",
      action: "Action",
    },
    {
      test_name: "Fresher’s Pre Interview Assesment",
      candidate_name: "Anurag Patel",
      candidate_email: "anuragpatel@kquiz.com",
      feedback_type: "Positive",
      given_on: "21 June 2022",
      action: "Action",
    },
  ]

  return (
    <div className="flex h-full flex-col gap-10">
      <Header heading={t("commonConstants.feedback")} id="feedback" />
      <div className="flex h-full w-full flex-col gap-8">
        <div className="flex w-full gap-5">
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
          <FeedbackTableHeader />
          <Table
            data={tableData}
            columns={testColumns}
            paginationEnabled={true}
            pageSize={tablePageSize}
            setPageSize={setTablePageSize}
            currentPage={tablePageNumber}
            onPageChange={setTablePageNumber}
            totalItems={tableData.length}
          />
        </div>
      </div>
    </div>
  )
}
