import { Icon } from '@iconify/react'
import type { QuestionType } from '~/components/Interface'
import cuid from 'cuid'
import QuillEditor from '~/components/QuillEditor.client'
import { ClientOnly } from 'remix-utils'
import Toggle from '~/components/form/Toggle'
import type { SetStateAction } from 'react'

interface x {
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
  const addOptionArea = () => {
    setOptions([...options, { option: '', isCorrect: false, id: cuid() }])
  }

  const deleteOption = (index: number) => {
    if (options.length === 1) return
    setOptions(
      (e: Array<{ option: string; isCorrect: boolean; id: string }>) => {
        e.splice(index, 1)
        return [...e]
      }
    )
  }
  const getQuestionType = (id: string) => {
    for (let qtd of questionTypeList) {
      if (id === qtd.id) {
        return qtd.value
      }
    }
  }

  const updateOption = (opt: string, index: number) => {
    // setOptions(
    //   (e: Array<{ option: string; isCorrect: boolean; id: string }>) => {
    //     e[index].option = opt
    //     return [...e]
    //   }
    // )
    options[index].option = opt
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
    setTextCorrectAnswer((e: x[]) => {
      e[index].answer = textAns
      return [...e]
    })
  }

  getQuestionType(selectedTypeOfQuestion)

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-row items-center justify-between">
        {getQuestionType(selectedTypeOfQuestion) === 'MULTIPLE_CHOICE' ||
        getQuestionType(selectedTypeOfQuestion) === 'SINGLE_CHOICE' ? (
          <div className="text-base font-medium leading-6 text-gray-600">
            Select Correct Option
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-base font-medium leading-6 text-gray-600">
            Check Order
            <span>
              <Toggle toggle={checkOrder} onToggleChange={setCheckOrder} />
            </span>
          </div>
        )}

        <button
          className="flex h-9 items-center  rounded-lg bg-primary px-5 text-xs text-white"
          onClick={addOptionArea}
        >
          <Icon icon="fluent:add-16-filled"></Icon>
          <span>Add Options</span>
        </button>
      </div>

      <div className="flex h-full flex-1 flex-col gap-4  overflow-auto">
        {(getQuestionType(selectedTypeOfQuestion) === 'MULTIPLE_CHOICE' ||
          getQuestionType(selectedTypeOfQuestion) === 'SINGLE_CHOICE') &&
          options.map((option, index) => {
            return (
              <div className="flex items-center gap-2.5" key={option.id}>
                {getQuestionType(selectedTypeOfQuestion) ===
                'MULTIPLE_CHOICE' ? (
                  <input
                    id="checkBox"
                    type="checkbox"
                    value={option.id}
                    onChange={() => {
                      checkBoxToggle(index)
                    }}
                    checked={option.isCorrect}
                  />
                ) : (
                  getQuestionType(selectedTypeOfQuestion) ===
                    'SINGLE_CHOICE' && (
                    <input
                      id="radioButton"
                      type="radio"
                      name="radioChoice"
                      value={option.id}
                      onChange={(e) => setSingleChoiceAnswer(e.target.value)}
                    />
                  )
                )}
                <div className="h-32 flex-1" id="optionEditor">
                  {
                    <ClientOnly fallback={<div></div>}>
                      {() => (
                        <QuillEditor
                          id={index + ''}
                          quillPlaceholder={'option'}
                          fullAccess={false}
                          onTextChange={(e) => {
                            updateOption(e, index)
                          }}
                        />
                      )}
                    </ClientOnly>
                  }
                </div>
                <Icon
                  onClick={() => deleteOption(index)}
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

        {getQuestionType(selectedTypeOfQuestion) === 'TEXT' &&
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
                      options.length < 2
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
