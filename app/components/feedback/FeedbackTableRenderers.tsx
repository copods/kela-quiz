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
    <span key={index} className="text-base font-semibold text-primary">
      {data.test_name}
    </span>
  )
}

export const FeedbackTypeRenderer = (data: tableData, index: number) => {}
