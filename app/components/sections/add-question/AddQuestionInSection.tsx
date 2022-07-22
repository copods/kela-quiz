import { Icon } from '@iconify/react'
import type { Section, QuestionType, Question } from '~/components/Interface'
import { useState } from 'react'
import BreadCrumb from '../../BreadCrumb'
import QuestionEditor from './QuestionEditor'
import OptionForQuestion from './OptionForQuestion'
import cuid from 'cuid'
import { useSubmit, useTransition } from '@remix-run/react'
import { toast } from 'react-toastify'

const AddQuestionInSection = ({
  sectionDetails,
  questionTypeList,
  error,
}: {
  sectionDetails: (Section & { questions: Question[] }) | null
  questionTypeList: QuestionType[]
  error: string
}) => {
  const [selectedTypeOfQuestion, onQuestionTypeChange] = useState(
    questionTypeList[0].id
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

  const breadCrumbArray = [
    {
      tabName: 'Section',
      route: '/sections',
    },
    {
      tabName: 'Question',
      route: `/sections/${sectionDetails?.id}`,
    },
    {
      tabName: 'AddQuestion',
      route: `/sections/${sectionDetails?.id}/add-question`,
    },
  ]
  const getQuestionType = (id: string) => {
    let quesValue = ''
    for (let quesType of questionTypeList) {
      if (quesType.id == id) {
        quesValue = quesType?.value as string
      }
    }
    return quesValue
  }

  const submit = useSubmit()
  const saveQuestion = (addMoreQuestion: boolean) => {
    if (question.length === 0) {
      toast.error('Enter the Question')
      return
    }

    if (
      getQuestionType(selectedTypeOfQuestion) === 'MULTIPLE_CHOICE' ||
      getQuestionType(selectedTypeOfQuestion) === 'SINGLE_CHOICE'
    ) {
      for (let option of options) {
        if (option.option.length === 0) {
          toast.error('Enter all the Options')
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
        flag == 0 &&
        getQuestionType(selectedTypeOfQuestion) === 'MULTIPLE_CHOICE'
      ) {
        toast.error('Select the Option')
        return
      }
      if (
        flag === 0 &&
        getQuestionType(selectedTypeOfQuestion) === 'SINGLE_CHOICE' &&
        !singleChoiceAnswer
      ) {
        toast.error('Select the Option')
        return
      }
    }
    // if (
    //   getQuestionType(selectedTypeOfQuestion) === 'TEXT' &&
    //   textAnswer.length == 0
    // ) {
    //   toast.error('Enter the Text')
    //   return
    // }

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
    if (getQuestionType(selectedTypeOfQuestion) === 'MULTIPLE_CHOICE') {
      console.log(options)
      options.forEach((option) => {
        var optionForQuestion = {
          id: option.id,
          option: option.option,
          isCorrect: option.isCorrect,
        }
        testQuestion.options.push(optionForQuestion)
      })
    } else if (getQuestionType(selectedTypeOfQuestion) === 'SINGLE_CHOICE') {
      options.forEach(
        (option: { option: string; isCorrect: boolean; id: string }) => {
          var optionForQuestion = {
            id: option.id,
            option: option.option,
            isCorrect: singleChoiceAnswer === option.id ? true : false,
          }
          testQuestion.options.push(optionForQuestion)
        }
      )
    } else if (getQuestionType(selectedTypeOfQuestion) === 'TEXT') {
      testQuestion.checkOrder = checkOrder
      textCorrectAnswer.forEach((correctAnswer, index) => {
        var optionForQuestion = {
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
      <h1
        title={sectionDetails?.name}
        className="text-3xl font-bold leading-9 text-gray-900"
      >
        {sectionDetails?.name} - Add Question
      </h1>
      {/* <BreadCrumb data={breadCrumbArray} /> */}

      <div className="flex h-40 flex-1 flex-row gap-6">
        <QuestionEditor
          question={question}
          setQuestion={setQuestion}
          questionTypeList={questionTypeList}
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
          questionTypeList={questionTypeList}
          checkOrder={checkOrder}
          setCheckOrder={setCheckOrder}
        />
      </div>
      <div className="flex-end justify flex items-center justify-between">
        <button
          id="saveAndContinue"
          disabled={transition.state === 'submitting'}
          className={`flex h-9 items-center gap-1 rounded-lg bg-primary px-5 text-xs text-white ${
            transition.state === 'submitting' && 'disabled:opacity-75'
          }`}
          onClick={() => saveQuestion(false)}
        >
          <Icon icon="ic:round-save" className="mr-1"></Icon>
          {transition.state === 'submitting' ? 'Saving...' : 'Save & Continue'}
        </button>

        <button
          id="saveAndAddMore"
          disabled={transition.state === 'submitting'}
          className={`flex h-9 items-center gap-1 rounded-lg bg-primary px-5 text-xs text-white ${
            transition.state === 'submitting' && 'disabled:opacity-75'
          }`}
          onClick={() => saveQuestion(true)}
        >
          <Icon icon="ic:round-save" className="mr-1"></Icon>
          {transition.state === 'submitting' ? 'Saving...' : 'Save & Add More'}
        </button>
      </div>
    </div>
  )
}

export default AddQuestionInSection
