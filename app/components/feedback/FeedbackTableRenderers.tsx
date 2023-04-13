import { useState } from "react"

import moment from "moment"

import { Icon } from "@iconify/react"

import Chip from "../common-components/Chip"
import { DialogWrapper } from "../common-components/Dialog"
import FeedbackComponent from "../common-components/FeedbackComponent"

import type { CandidateFeedbackDetails } from "~/interface/Interface"

type tableData = {
  test_name: string
  candidate_name: string
  candidate_email: string
  feedback_type: string
  given_on: string
  action: CandidateFeedbackDetails[]
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
  const [openFeedbackDetails, setOpenFeedbackDetails] = useState(false)
  const feedbackGivenByDetails = {
    name: data.candidate_name,
    email: data.candidate_email,
  }

  const handleChange = () => {
    setOpenFeedbackDetails(false)
  }
  const emailReplyHandleChange = () => {
    sendEmail()
    setOpenFeedbackDetails(false)
  }

  const sendEmail = () => {
    let email = data.candidate_email
    let subject = "Regarding your feedback"
    let emailBody = `Hello ${data.candidate_name}%3A%0D%0A%0D%0ABest Regards%2C%0D%0A%20Copods`
    let cc = "K-Quiz@copods.co"
    document.location =
      "mailto:" +
      email +
      "?subject=" +
      subject +
      "&cc=" +
      cc +
      "&body=" +
      emailBody
  }

  return (
    <>
      <div className="flex gap-3">
        <Icon
          data-cy="feedback-details"
          icon="ic:outline-message"
          className="gray-800 cursor-pointer text-2xl focus:outline-dotted focus:outline-2"
          onClick={() => setOpenFeedbackDetails(!openFeedbackDetails)}
        />
        <Icon
          data-cy="send-email"
          icon="material-symbols:mail-outline"
          className="gray-800 cursor-pointer text-2xl focus:outline-dotted focus:outline-2"
          onClick={() => sendEmail()}
        />
      </div>
      {openFeedbackDetails && (
        <DialogWrapper
          open={openFeedbackDetails}
          setOpen={setOpenFeedbackDetails}
        >
          <FeedbackComponent
            feebackDetails={data.action}
            assessmentName={data.test_name}
            givenBy={feedbackGivenByDetails}
            readOnly={true}
            handleChange={handleChange}
            emailReplyHandleChange={emailReplyHandleChange}
          />
        </DialogWrapper>
      )}
    </>
  )
}
