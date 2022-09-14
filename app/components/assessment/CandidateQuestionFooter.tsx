import { useLoaderData } from '@remix-run/react'
import {
  candidateExamConstants,
  commonConstants,
} from '~/constants/common.constants'
import Button from '../form/Button'

const CandidateQuestionFooter = () => {
  const { question, section, lastSection } = useLoaderData()
  return (
    <div className="flex h-16 items-center justify-between gap-6 rounded-b-lg border-t bg-white px-6 py-4 drop-shadow-[0px_-2px_10px_rgba(0,0,0,0.06)]">
      <div>
        <Button
          className="border-none bg-inherit text-base font-bold text-black underline shadow-none hover:bg-inherit"
          varient="primary-solid"
          title={'Skip Question'}
          buttonText={'Skip Question'}
          type="submit"
          value="next"
          name="next"
        />
      </div>
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
