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
