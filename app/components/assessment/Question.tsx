import { useLoaderData } from '@remix-run/react'
import React, { useState } from 'react'
import {
  candidateExamConstants,
  commonConstants,
} from '~/constants/common.constants'
import { QuestionTypes } from '~/interface/Interface'
import Button from '../form/Button'
import Checkbox from '../form/CheckBox'
import sanitizeHtml from 'sanitize-html'
import CandidateQuestionHeader from './CandidateQuestionHeader'
import { Step, Stepper } from 'react-form-stepper'
import { Box, StepLabel } from '@material-ui/core'

const Question = () => {
  const { question, section, lastSection } = useLoaderData()
  const questionType = question?.question?.questionType?.value
  console.log(section)
  const [userAnswer, setUserAnswer] = useState(
    questionType === QuestionTypes.singleChoice
      ? question.selectedOptions[0]?.id
      : questionType === QuestionTypes.text
      ? question?.answers
      : question.selectedOptions
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
    if (questionType === QuestionTypes.multipleChoice) {
      // setUserAnswer([...question.selectedOptions])
      console.log(event)
    }
  }
  // console.log(question.selectedOptions)
  const getChecked = (optionId: string) => {
    let flag = false
    userAnswer.forEach((opt: any) => {
      if (opt.id == optionId) {
        flag = true
      }
    })
    return flag
  }

  const steps = ['a', 'b', 'c']

  const [activeStep, setActiveStep] = useState(0)
  // const [skipped, setSkipped] = useState(new Set<number>())

  // const isStepOptional = (step: number) => {
  //   return step === 1
  // }

  // const isStepSkipped = (step: number) => {
  //   return skipped.has(step)
  // }

  // const handleNext = () => {
  //   let newSkipped = skipped
  //   if (isStepSkipped(activeStep)) {
  //     newSkipped = new Set(newSkipped.values())
  //     newSkipped.delete(activeStep)
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1)
  //   setSkipped(newSkipped)
  // }

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1)
  // }

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.")
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1)
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values())
  //     newSkipped.add(activeStep)
  //     return newSkipped
  //   })
  // }

  // const handleReset = () => {
  //   setActiveStep(0)
  // }

  return (
    <>
      <CandidateQuestionHeader />
      <div className="w-full flex-1 overflow-auto bg-questionBackground p-6">
        <form method="post" className="flex h-full flex-col rounded-lg border">
          <div className="flex h-full max-h-full flex-1 overflow-auto rounded-t-lg bg-white">
            <div className="flex h-full w-1/2 flex-col gap-8 border-r px-6 pt-6">
              <div className="flex items-center justify-between">
                <div className="flex text-xl font-medium">
                  <span>Question </span>
                </div>
              </div>
              <div className="ql-editor h-full flex-1 overflow-auto border-gray-200 bg-white p-0">
                <div
                  className="font-normal"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(question?.question?.question),
                  }}
                />
              </div>
            </div>
            <div className="flex h-full w-1/2 flex-col gap-2 pt-6">
              <div className="flex items-center justify-between px-6">
                {questionType === QuestionTypes.singleChoice && (
                  <div className="flex text-xl font-medium">
                    Select Correct Option
                  </div>
                )}
                {questionType === QuestionTypes.multipleChoice && (
                  <div className="flex text-xl font-medium">
                    Select Correct Option's
                  </div>
                )}
                {questionType === QuestionTypes.text && (
                  <div className="flex text-xl font-medium">
                    Write Correct Answer
                  </div>
                )}
              </div>
              <div className="flex h-full flex-1 flex-col overflow-auto">
                {question?.question?.options?.map(
                  (option: {
                    id: string
                    option: string
                    rightAnswer: boolean
                  }) => {
                    return (
                      <label
                        key={option.id}
                        className={`flex cursor-pointer items-start gap-4 border-b px-6 ${
                          option.id === userAnswer
                            ? 'bg-blue-50'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {questionType === QuestionTypes.singleChoice ? (
                          <input
                            type="radio"
                            name="option"
                            value={option.id}
                            checked={option.id === userAnswer}
                            onChange={() => {
                              onChangeHandle(option)
                            }}
                            className="mt-7"
                          />
                        ) : (
                          <Checkbox
                            value={option.id}
                            name="option"
                            isChecked={getChecked(option.id)}
                            className="mt-7"
                            handleChange={() => onChangeHandle(option)}
                          />
                        )}
                        <div className="ql-editor w-full bg-inherit py-6">
                          <div
                            className="cursor-pointer font-normal"
                            dangerouslySetInnerHTML={{
                              __html: sanitizeHtml(option?.option),
                            }}
                          />
                        </div>
                      </label>
                    )
                  }
                )}
                {question?.question?.correctAnswer?.map(
                  (answer: { id: string }, index: number) => {
                    return (
                      <>
                        <div key={answer.id} className="border-b px-6 py-7">
                          <textarea
                            name="answer"
                            id=""
                            value={userAnswer[index]}
                            rows={4}
                            onChange={() => onChangeHandle(event, index)}
                            className="w-full rounded-lg border border-gray-200 bg-white p-5"
                          />
                        </div>
                        <div key={answer.id} className="border-b px-6 py-7">
                          <textarea
                            name="answer"
                            id=""
                            value={userAnswer[index]}
                            rows={4}
                            onChange={() => onChangeHandle(event, index)}
                            className="w-full rounded-lg border border-gray-200 bg-white p-5"
                          />
                        </div>
                        <div key={answer.id} className="border-b px-6 py-7">
                          <textarea
                            name="answer"
                            id=""
                            value={userAnswer[index]}
                            rows={4}
                            onChange={() => onChangeHandle(event, index)}
                            className="w-full rounded-lg border border-gray-200 bg-white p-5"
                          />
                        </div>
                      </>
                    )
                  }
                )}
              </div>
            </div>
          </div>
          <div className="flex h-16 items-center justify-between gap-6 rounded-b-lg border-t bg-white px-6 py-4 drop-shadow-[0px_-2px_10px_rgba(0,0,0,0.06)]">
            <div>
              <span className="cursor-pointer font-bold underline">
                Skip Question
              </span>
            </div>
            <div className="w-32">
              <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep}>
                  {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {}
                    const labelProps: {
                      optional?: React.ReactNode
                    } = {}
                    // if (isStepSkipped(index)) {
                    //   stepProps.completed = false
                    // }
                    return (
                      <Step key={label} {...stepProps}>
                        <StepLabel
                          onClick={() => setActiveStep(index)}
                          {...labelProps}
                        />
                      </Step>
                    )
                  })}
                </Stepper>
              </Box>
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
        </form>
      </div>
    </>
  )
}

export default Question
