import { Icon } from '@iconify/react'
import { useState } from 'react'
import BreadCrumb from '../../BreadCrumb'
import QuestionEditor from './QuestionEditor'
import OptionForQuestion from './OptionForQuestion'
import cuid from 'cuid'
import {useLoaderData, useNavigate, useSubmit, useTransition } from '@remix-run/react'
import { toast } from 'react-toastify'
import Button from '~/components/form/Button'
import { routes } from '~/constants/route.constants'

import {
  addQuestion,
  QuestionTypes,
  testsConstants,
  statusCheck,
} from '~/constants/common.constants'

const AddQuestionInSection = () => {
  const { sectionDetails, questionTypes } = useLoaderData()
  const [selectedTypeOfQuestion, onQuestionTypeChange] = useState(
    questionTypes[0].id
  )
  const [question, setQuestion] = useState('')
  const [singleChoiceAnswer, setSingleChoiceAnswer] = useState('')
  const [options, setOptions] = useState([
    {
      option: '',
      isCorrect: false,
      id: cuid(),
    },
    {
      option: '',
      isCorrect: false,
      id: cuid(),
    },
    {
      option: '',
      isCorrect: false,
      id: cuid(),
    },
    {
      option: '',
      isCorrect: false,
      id: cuid(),
    },
  ])

  const [textCorrectAnswer, setTextCorrectAnswer] = useState([
    {
      id: cuid(),
      answer: '',
    },
  ])
  const [checkOrder, setCheckOrder] = useState(false)
  const transition = useTransition()
  const navigate = useNavigate()

  const breadCrumbArray = [
    {
      tabName: testsConstants.sectionText,
      route: routes.sections,
    },
    {
      tabName: addQuestion.addQuestion,
      route: `${routes.sections}/${sectionDetails?.id}${routes.addQuestion}`,
    }
  ]
  const getQuestionType = (id: string) => {
    let quesValue = ''
    for (let quesType of questionTypes) {
      if (quesType.id == id) {
        quesValue = quesType?.value as string
      }
    }
    return quesValue
  }

  const submit = useSubmit()
  const saveQuestion = (addMoreQuestion: boolean) => {
    if (question.length === 0) {
      toast.error('Enter the Question', { toastId: 'questionRequired' })
      return
    }

    if (
      getQuestionType(selectedTypeOfQuestion) ===
        QuestionTypes.multipleChoice ||
      getQuestionType(selectedTypeOfQuestion) === QuestionTypes.singleChoice
    ) {
      for (let option of options) {
        if (option.option.length === 0) {
          toast.error('Enter all the Options', { toastId: 'optionsRequired' })
          return
        }
      }

      let flag = 0
      for (let option of options) {
        if (option.isCorrect) {
          flag = 1
        }
      }
      if (
        flag === 0 &&
        getQuestionType(selectedTypeOfQuestion) === QuestionTypes.multipleChoice
      ) {
        toast.error(statusCheck.selectCorrOption, {
          toastId: 'correctOptionRequired',
        })
        return
      }
      if (
        flag === 0 &&
        getQuestionType(selectedTypeOfQuestion) ===
          QuestionTypes.singleChoice &&
        !singleChoiceAnswer
      ) {
        toast.error(statusCheck.selectCorrOption, {
          toastId: 'correctOptionsRequired',
        })
        return
      }
    }

    if (getQuestionType(selectedTypeOfQuestion) === QuestionTypes.text) {
      for (let answer of textCorrectAnswer) {
        if (answer.answer.length === 0) {
          toast.error('Enter all the Options', { toastId: 'optionsRequired' })
          return
        }
      }
    }

    let testQuestion: {
      question: string
      options: Array<{ id: string; option: string }>
      correctAnswer: Array<{ id: string; answer: string }>
      questionTypeId: string
      sectionId: string
      addMoreQuestion: boolean
      checkOrder: boolean
    } = {
      question,
      options: [],
      correctAnswer: [],
      questionTypeId: selectedTypeOfQuestion,
      sectionId: sectionDetails?.id as string,
      addMoreQuestion,
      checkOrder: false,
    }
    if (
      getQuestionType(selectedTypeOfQuestion) === QuestionTypes.multipleChoice
    ) {
      options.forEach((option) => {
        let optionForQuestion = {
          id: option.id,
          option: option.option,
          isCorrect: option.isCorrect,
        }
        testQuestion.options.push(optionForQuestion)
      })
    } else if (
      getQuestionType(selectedTypeOfQuestion) === QuestionTypes.singleChoice
    ) {
      options.forEach(
        (option: { option: string; isCorrect: boolean; id: string }) => {
          let optionForQuestion = {
            id: option.id,
            option: option.option,
            isCorrect: singleChoiceAnswer === option.id ? true : false,
          }
          testQuestion.options.push(optionForQuestion)
        }
      )
    } else if (getQuestionType(selectedTypeOfQuestion) === QuestionTypes.text) {
      testQuestion.checkOrder = checkOrder
      textCorrectAnswer.forEach((correctAnswer, index) => {
        let optionForQuestion = {
          id: correctAnswer.id,
          answer: correctAnswer.answer,
          order: index,
        }
        testQuestion.correctAnswer.push(optionForQuestion)
      })
    }
    submit({ quesData: JSON.stringify(testQuestion) }, { method: 'post' })
  }
  return (
    <div className="flex h-full flex-col gap-6">
      <BreadCrumb data={breadCrumbArray} />
      <div className="flex">
      <h1
        title={sectionDetails?.name}
        role={sectionDetails?.name}
        aria-label={sectionDetails?.name}
        tabIndex={0}
        className="text-3xl font-bold text-gray-900 inline-block"
      >
        {sectionDetails?.name} - {addQuestion.addQuestion}
      </h1>
      </div>
      <div className="flex h-40 flex-1 flex-row gap-6">
        <QuestionEditor
          question={question}
          setQuestion={setQuestion}
          questionTypeList={questionTypes}
          selectedTypeOfQuestion={selectedTypeOfQuestion}
          onQuestionTypeChange={onQuestionTypeChange}
        />
        <OptionForQuestion
          textCorrectAnswer={textCorrectAnswer}
          setTextCorrectAnswer={setTextCorrectAnswer}
          singleChoiceAnswer={singleChoiceAnswer}
          setSingleChoiceAnswer={setSingleChoiceAnswer}
          options={options}
          setOptions={setOptions}
          selectedTypeOfQuestion={selectedTypeOfQuestion}
          questionTypeList={questionTypes}
          checkOrder={checkOrder}
          setCheckOrder={setCheckOrder}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex">
          <Button 
            tabIndex={0}
            id='cancel'
            onClick={() => navigate(`/sections/${sectionDetails?.id}`)}
            isDisabled={transition.state === 'submitting'}
            className='h-9 px-5'
            buttonText={transition.state === 'submitting' ? 'Canceling...' : 'Cancel'}
            varient='secondary-solid' />
        </div>
        <div className="flex gap-2">
          <Button 
            tabIndex={0}
            id="save-and-exit"
            isDisabled={transition.state === 'submitting'}
            className='h-9 px-5'
            onClick={() => saveQuestion(false)}
            varient='primary-solid'
            buttonText={
              <>
              <Icon icon="ic:round-save" className="mr-1" />
              {transition.state === 'submitting' ? 'Saving...' : 'Save & Exit'}
              </>
            } />
          <Button 
            tabIndex={0}
            id='save-and-add-more'
            isDisabled={transition.state === 'submitting'}
            className='h-9 px-5'
            onClick={() => saveQuestion(true)}
            varient='primary-solid'
            buttonText={
              <>
              <Icon icon="ic:round-save" className="mr-1" />
              {transition.state === 'submitting' ? 'Saving...' : 'Save & Add More'}
              </>
            } />
        </div>
      </div>
    </div>
  )
}

export default AddQuestionInSection
