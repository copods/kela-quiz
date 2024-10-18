import { useLoaderData } from "@remix-run/react"
import { useTranslation } from "react-i18next"

import Button from "../common-components/Button"
// import CandidateQuestionStepper from './CandidateQuestionStepper'

const CandidateQuestionFooter = () => {
  const { t } = useTranslation()

  const { question, section, lastSection } = useLoaderData()
  return (
    <div className="flex h-16 items-center justify-between gap-6 border-t bg-white px-6 py-4">
      <div>
        {question?.order !== section?.totalQuestions && (
          <Button
            className="max-w-max border-none bg-inherit px-0 py-0 text-base font-bold text-black underline shadow-none hover:bg-white"
            variant="primary-outlined"
            title={"Skip Question"}
            buttonText={"Skip Question"}
            type="submit"
            value="skip"
            name="skip"
          />
        )}
      </div>
      {/* <CandidateQuestionStepper /> */}
      <div className="flex gap-6">
        <Button
          className="h-8 w-28"
          variant="primary-outlined"
          title={t("commonConstants.prevoiusButton")}
          buttonText={t("commonConstants.prevoiusButton")}
          isDisabled={question.order === 1}
          type="submit"
          value="prev"
          name="previous"
        />
        {question.order !== section.totalQuestions ? (
          <Button
            className="h-8 w-28"
            variant="primary-solid"
            title={t("commonConstants.nextButton")}
            buttonText={t("commonConstants.nextButton")}
            isDisabled={question.order === section.totalQuestions}
            type="submit"
            value="next"
            name="next"
          />
        ) : lastSection ? (
          <Button
            className="h-8 w-28"
            variant="primary-solid"
            title={t("candidateExamConstants.endTest")}
            buttonText={t("candidateExamConstants.endTest")}
            isDisabled={question.order !== section.totalQuestions}
            type="submit"
            value={section.order}
            name="endExam"
          />
        ) : (
          <Button
            className="h-8 w-28"
            variant="primary-solid"
            title={t("candidateExamConstants.nextSection")}
            buttonText={"Finish"}
            isDisabled={question.order !== section.totalQuestions}
            type="submit"
            value={section.order}
            name="nextSection"
          />
        )}
      </div>
    </div>
  )
}

export default CandidateQuestionFooter
