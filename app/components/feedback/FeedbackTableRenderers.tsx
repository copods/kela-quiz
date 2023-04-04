import moment from "moment"

import { Icon } from "@iconify/react"

import Chip from "../common-components/Chip"

type tableData = {
  test_name: string
  candidate_name: string
  candidate_email: string
  feedback_type: string
  given_on: string
  action: string
}

export const TestNameRenderer = (data: tableData, index: number) => {
  return (
    <div
      key={index}
      title={data.test_name}
      className="truncate text-base font-semibold text-primary"
    >
      {data.test_name}
    </div>
  )
}

export const FeedbackTypeRenderer = (data: tableData, index: number) => {
  return (
    <Chip
      text={data.feedback_type}
      variant={
        data.feedback_type === "Positive"
          ? "success"
          : data.feedback_type === "Negative"
          ? "error"
          : data.feedback_type === "Neutral"
          ? "warning"
          : "default"
      }
    />
  )
}

export const GivenOnRenderer = (data: tableData) => {
  return <span>{moment(data?.given_on).format("DD MMMM YYYY")}</span>
}

export const CandidateNameRenderer = (data: tableData) => {
  return <span>{data.candidate_name}</span>
}

export const CandidateEmailRenderer = (data: tableData) => {
  return <span>{data.candidate_email}</span>
}

export const ActionRenderer = (data: tableData) => {
  return (
    <div className="flex gap-4">
      <Icon
        icon="material-symbols:mail-outline"
        className="bg-light-200 gray-800 cursor-pointer text-2xl focus:outline-dotted focus:outline-2"
      />
    </div>
  )
}
