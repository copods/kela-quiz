import { useLoaderData } from '@remix-run/react'
import { useState } from 'react'
import {
  candidateExamConstants,
  commonConstants,
  QuestionTypes,
  routeFiles,
} from '~/constants/common.constants'
import Button from '../form/Button'
import Checkbox from '../form/CheckBox'

const Question = () => {
  const { question, section, lastSection } = useLoaderData()

  const questionType = question?.question?.questionType?.value

  const [userAnswer, setUserAnswer] = useState(
    questionType === QuestionTypes.singleChoice
      ? question.selectedOptions[0]?.id
      : questionType === QuestionTypes.text
      ? question?.answers
      : {}
  )

  const onChangeHandle = (event: any, index?: number) => {
    if (questionType === QuestionTypes.singleChoice) {
      setUserAnswer(event.id)
    }
    if (questionType === QuestionTypes.text) {
      setUserAnswer((oldVal: Array<string>) => {
        oldVal[index || 0] = event.target.value
        return [...oldVal]
      })
    }
  }

  return (
    <form method="post" className="flex h-full flex-col gap-9">
      <div className="flex h-full max-h-full flex-1 gap-9 overflow-auto">
        <div className="flex h-full w-1/2 flex-col gap-3">
          <div className="flex h-10 items-center justify-between">
            <div className="flex gap-5 text-lg font-semibold">
              <span>Question </span>
              <span>
                {question?.order}/{section?.totalQuestions}
              </span>
            </div>
          </div>
          <div className="shadow-base h-full flex-1 overflow-auto rounded-lg border border-gray-200 bg-white p-4">
            <div
              dangerouslySetInnerHTML={{
                __html: question?.question?.question,
              }}
            />
          </div>
        </div>
        <div className="flex h-full w-1/2 flex-col gap-3">
          <div className="flex h-10 items-center justify-between">
            <div className="flex gap-5 text-lg font-semibold">
              {routeFiles.options}
            </div>
          </div>
          <div className="shadow-base flex h-full flex-1 flex-col gap-6 overflow-auto">
            {question?.question?.options?.map(
              (option: {
                id: string
                option: string
                rightAnswer: boolean
              }) => {
                return (
                  <div key={option.id} className="flex gap-4">
                    {questionType === QuestionTypes.singleChoice ? (
                      <input
                        type="radio"
                        name="option"
                        value={option.id}
                        checked={option.id === userAnswer}
                        onChange={() => {
                          onChangeHandle(option)
                        }}
                      />
                    ) : (
                      <Checkbox value={option.id} name="option" handleChange={() => onChangeHandle(option.id)} />
                    )}
                    <div className="w-full rounded-lg border border-gray-200 bg-white p-5">
                      <div
                        dangerouslySetInnerHTML={{ __html: option?.option }}
                      />
                    </div>
                  </div>
                )
              }
            )}
            {question?.question?.correctAnswer?.map(
              (answer: { id: string }, index: number) => {
                return (
                  <div key={answer.id}>
                    <textarea
                      name="answer"
                      id=""
                      value={userAnswer[index]}
                      rows={4}
                      onChange={() => onChangeHandle(event, index)}
                      className="w-full rounded-lg border border-gray-200 bg-white p-5"
                    />
                  </div>
                )
              }
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-6">
        <div className="flex gap-5">
          <Button 
          className='h-11 w-40'
          varient='primary-outlined'
          buttonText={commonConstants.prevoiusButton}
          isDisabled={question.order === 1}
          type="submit"
          value='prev'
          name='previous'
          />
          {question.order !== section.totalQuestions ? (
            <Button 
            className='h-11 w-40'
            varient='primary-solid'
            buttonText={commonConstants.nextButton}
            isDisabled={question.order === section.totalQuestions}
            type="submit"
            value='next'
            name='next'
            />
          ) : lastSection ? (
            <Button 
            className='h-11 w-40'
            varient='primary-solid'
            buttonText={candidateExamConstants.endTest}
            isDisabled={question.order !== section.totalQuestions}
            type="submit"
            value={section.order}
            name='endExam'
            />
          ) : (
            <Button 
            className='h-11 w-40'
            varient='primary-solid'
            buttonText={candidateExamConstants.nextSection}
            isDisabled={question.order !== section.totalQuestions}
            type="submit"
            value={section.order}
            name='nextSection'
            />
          )}
        </div>
      </div>
    </form>
  )
}

export default Question
