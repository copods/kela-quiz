import { Icon } from '@iconify/react'
import type { QuestionType } from '~/interface/Interface'
import cuid from 'cuid'
import QuillEditor from '~/components/QuillEditor.client'
import { ClientOnly } from 'remix-utils'
import Toggle from '~/components/form/Toggle'
import type { SetStateAction } from 'react'
import { addQuestion, QuestionTypes } from '~/constants/common.constants'
import { toast } from 'react-toastify'
import Button from '~/components/form/Button'
interface textAnswerType {
  id: string
  answer: string
}

export default function OptionForQuestion({
  questionTypeList,
  selectedTypeOfQuestion,
  options,
  setOptions,
  singleChoiceAnswer,
  setSingleChoiceAnswer,
  textCorrectAnswer,
  setTextCorrectAnswer,
  checkOrder,
  setCheckOrder,
}: {
  questionTypeList: QuestionType[]
  selectedTypeOfQuestion: string
  options: Array<{ option: string; isCorrect: boolean; id: string }>
  setOptions: (
    e: SetStateAction<Array<{ option: string; isCorrect: boolean; id: string }>>
  ) => void
  singleChoiceAnswer: string
  setSingleChoiceAnswer: (e: string) => void
  textCorrectAnswer: Array<{ id: string; answer: string }>
  setTextCorrectAnswer: (
    e: SetStateAction<Array<{ id: string; answer: string }>>
  ) => void
  checkOrder: boolean
  setCheckOrder: (e: boolean) => void
}) {
  const toastId = 'doNotDeleteLastOptions'

  const addOptionArea = () => {
    if (
      getQuestionType(selectedTypeOfQuestion) ===
        QuestionTypes.multipleChoice ||
      getQuestionType(selectedTypeOfQuestion) === QuestionTypes.singleChoice
    ) {
      setOptions([...options, { option: '', isCorrect: false, id: cuid() }])
    } else if (getQuestionType(selectedTypeOfQuestion) === QuestionTypes.text) {
      setTextCorrectAnswer([...textCorrectAnswer, { id: cuid(), answer: '' }])
    }
  }

  const deleteOption = (index: number, id?: string) => {
    if (
      getQuestionType(selectedTypeOfQuestion) ===
        QuestionTypes.multipleChoice ||
      getQuestionType(selectedTypeOfQuestion) === QuestionTypes.singleChoice
    ) {
      if (options.length === 2) {
        return toast.error('There should be at least two options.', { toastId })
      }
      if (id === singleChoiceAnswer) {
        setSingleChoiceAnswer('')
      }
      setOptions(
        (e: Array<{ option: string; isCorrect: boolean; id: string }>) => {
          e.splice(index, 1)
          return [...e]
        }
      )
    } else if (getQuestionType(selectedTypeOfQuestion) === QuestionTypes.text) {
      if (textCorrectAnswer.length === 1) return
      setTextCorrectAnswer((e: Array<{ id: string; answer: string }>) => {
        e.splice(index, 1)
        return [...e]
      })
    }
  }
  const getQuestionType = (id: string) => {
    for (let quesType of questionTypeList) {
      if (id === quesType.id) {
        return quesType.value
      }
    }
  }

  const updateOption = (opt: string, id: string) => {
    const optionIndex = options.findIndex((o) => o.id === id)
    if (opt === '<p><br></p>') {
      options[optionIndex].option = ''
    } else {
      options[optionIndex].option = opt
    }
  }

  const checkBoxToggle = (index: number) => {
    setOptions(
      (e: Array<{ option: string; isCorrect: boolean; id: string }>) => {
        e[index].isCorrect = !e[index].isCorrect
        return [...e]
      }
    )
  }

  const updateTextAnswer = (textAns: string, index: number) => {
    setTextCorrectAnswer((e: textAnswerType[]) => {
      e[index].answer = textAns
      return [...e]
    })
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="mb-2 flex h-11 flex-row items-end justify-between">
        {getQuestionType(selectedTypeOfQuestion) ===
          QuestionTypes.multipleChoice ||
        getQuestionType(selectedTypeOfQuestion) ===
          QuestionTypes.singleChoice ? (
          <div className="ml-7 text-base font-medium leading-6 text-gray-600">
            {addQuestion.createOptions}
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-base font-medium leading-6 text-gray-600">
            {addQuestion.checkOrder}
            <span>
              <Toggle toggle={checkOrder} onToggleChange={setCheckOrder} />
            </span>
          </div>
        )}

        <Button 
          tabIndex={0}
          className='h-9 px-5' 
          varient='primary-solid' 
          onClick={addOptionArea} 
          buttonText={`+ ${addQuestion.addOptions}`} />
      </div>

      <div className="flex h-full flex-1 flex-col gap-5  overflow-auto">
        {(getQuestionType(selectedTypeOfQuestion) ===
          QuestionTypes.multipleChoice ||
          getQuestionType(selectedTypeOfQuestion) ===
            QuestionTypes.singleChoice) &&
          options.map((option, index) => {
            return (
              <div className="flex items-center gap-2.5" key={option.id}>
                {getQuestionType(selectedTypeOfQuestion) ===
                QuestionTypes.multipleChoice ? (
                  <input
                    id="checkBox"
                    type="checkbox"
                    value={option.id}
                    onChange={() => {
                      checkBoxToggle(index)
                    }}
                    checked={option.isCorrect}
                    className="h-5 w-5"
                  />
                ) : (
                  getQuestionType(selectedTypeOfQuestion) ===
                    QuestionTypes.singleChoice && (
                    <input
                      id="radioButton"
                      type="radio"
                      name="radioChoice"
                      value={option.id}
                      onChange={(e) => setSingleChoiceAnswer(e.target.value)}
                      className="h-5 w-5"
                    />
                  )
                )}
                <div className="h-32 flex-1" id="optionEditor">
                  {
                    <ClientOnly fallback={<div></div>}>
                      {() => (
                        <QuillEditor
                          text={option.option}
                          id={index + ''}
                          quillPlaceholder={'option'}
                          fullAccess={false}
                          onTextChange={(e) => {
                            updateOption(e, option?.id)
                          }}
                        />
                      )}
                    </ClientOnly>
                  }
                </div>
                <Icon
                  onClick={() => deleteOption(index, option?.id)}
                  tabIndex={0}
                  icon="ic:outline-delete-outline"
                  className={`h-6 w-6 ${index} ${
                    options.length < 2
                      ? 'cursor-not-allowed text-red-400'
                      : 'cursor-pointer text-red-600'
                  }`}
                ></Icon>
              </div>
            )
          })}

        {getQuestionType(selectedTypeOfQuestion) === QuestionTypes.text &&
          textCorrectAnswer.map(
            (option: { id: string; answer: string }, index: number) => {
              return (
                <div className="flex items-center gap-2.5" key={option.id}>
                  <div className="flex-1" id="optionEditor">
                    <input
                      className="h-20 w-full rounded-lg border border-gray-300 bg-white p-4"
                      value={option.answer}
                      onChange={(e) => {
                        updateTextAnswer(e.target.value, index)
                      }}
                    ></input>
                  </div>
                  <Icon
                    onClick={() => deleteOption(index)}
                    tabIndex={0}
                    icon="ic:outline-delete-outline"
                    className={`h-6 w-6 ${index} ${
                      textCorrectAnswer.length < 2
                        ? 'cursor-not-allowed text-red-400'
                        : 'cursor-pointer text-red-600'
                    }`}
                  ></Icon>
                </div>
              )
            }
          )}
      </div>
    </div>
  )
}
