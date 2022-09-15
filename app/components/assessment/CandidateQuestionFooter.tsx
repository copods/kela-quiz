import { useLoaderData } from '@remix-run/react'
import {
  candidateExamConstants,
  commonConstants,
} from '~/constants/common.constants'
import Button from '../form/Button'
// import CandidateQuestionStepper from './CandidateQuestionStepper'

const CandidateQuestionFooter = () => {
  const { question, section, lastSection } = useLoaderData()
  return (
    <div className="flex h-16 items-center justify-between gap-6 border-t bg-white px-6 py-4">
      <div>
        <Button
          className="max-w-max border-none bg-inherit py-0 px-0 text-base font-bold text-black underline shadow-none hover:bg-white"
          varient="primary-outlined"
          title={'Skip Question'}
          buttonText={'Skip Question'}
          type="submit"
          value="next"
          name="next"
        />
      </div>
      {/* <CandidateQuestionStepper /> */}
      <div className="flex gap-6">
        <Button
          className="h-8 w-28"
          varient="primary-outlined"
          title={commonConstants.prevoiusButton}
          buttonText={commonConstants.prevoiusButton}
          isDisabled={question.order === 1}
          type="submit"
          value="prev"
          name="previous"
        />
        {question.order !== section.totalQuestions ? (
          <Button
            className="h-8 w-28"
            varient="primary-solid"
            title={commonConstants.nextButton}
            buttonText={commonConstants.nextButton}
            isDisabled={question.order === section.totalQuestions}
            type="submit"
            value="next"
            name="next"
          />
        ) : lastSection ? (
          <Button
            className="h-8 w-28"
            varient="primary-solid"
            title={candidateExamConstants.endTest}
            buttonText={candidateExamConstants.endTest}
            isDisabled={question.order !== section.totalQuestions}
            type="submit"
            value={section.order}
            name="endExam"
          />
        ) : (
          <Button
            className="h-8 w-28"
            varient="primary-solid"
            title={candidateExamConstants.nextSection}
            buttonText={'Finish'}
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
