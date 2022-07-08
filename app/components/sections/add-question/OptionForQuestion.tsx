import { Icon } from "@iconify/react";
import { useEffect } from "react";
import type { QuestionType } from "~/components/Interface";
import cuid from "cuid";
import QuillEditor from "~/components/QuillEditor.client";
import { ClientOnly } from "remix-utils";

export default function OptionForQuestion({ questionTypeList, selectedTypeOfQuestion, options, setOptions, singleChoiceAnswer, setSingleChoiceAnswer, textAnswer, setTextAnswer }: { questionTypeList: QuestionType[], selectedTypeOfQuestion: string, options: Array<{ option: string, isCorrect: boolean, id: string }>, setOptions: (e: any) => any, singleChoiceAnswer: string, setSingleChoiceAnswer: (e: string) => void, textAnswer: string, setTextAnswer: (e: string) => void }) {
  const addOptionArea = () => {
    setOptions([...options, { option: '', isCorrect: false, id: cuid() }])
  }

  const deleteOption = (index: number) => {
    if(options.length === 1)
    return ;
    setOptions((e: any) => {
      e.splice(index, 1)
      return [...e]
    })
  }
  const getQuestionType = (id: string): any => {
    for (let qtd of questionTypeList) {
      if (id === qtd.id) {
        return qtd.value
      }
    }
  }

  const addOption = (opt: string, index: number) => {
    // console.log(opt);
    // console.log(options)
    setOptions((e: any) => {
      e[index].option = opt
      return [...e]
    })
  }

  const checkBoxToggle = (option: any) => {
    option.isCorrect = !option.isCorrect
  }

  useEffect(() => {
  }, [singleChoiceAnswer])

  getQuestionType(selectedTypeOfQuestion)
  return (
    <div className="flex-1 flex flex-col gap-6">
      <div className='flex items-center justify-between'>
        <div className='text-gray-600 text-base leading-6 font-medium'>Select Correct Option</div>
        <button className='bg-primary text-white rounded-lg  text-xs h-9 flex items-center px-5' onClick={addOptionArea} >
          <Icon icon="fluent:add-16-filled"></Icon>
          <span>Add Options</span>
        </button>
      </div>

      <div className='flex-1  overflow-auto'>
        <div className='h-full flex flex-col gap-4'>
          {options.map((option, index) => {
            return (
              <div className='flex items-center gap-2.5' key={option.id}>
                {getQuestionType(selectedTypeOfQuestion) === 'MULTIPLE_CHOICE'
                  ? <input type="checkbox" value={option.id} onChange={() => { checkBoxToggle(option) }} />
                  : getQuestionType(selectedTypeOfQuestion) === 'SINGLE_CHOICE' && <input type="radio" name="radioChoice" value={option.id} onChange={(e) => setSingleChoiceAnswer(e.target.value)} />}
                <div className='flex-1'>
                  {
                    getQuestionType(selectedTypeOfQuestion) === 'MULTIPLE_CHOICE' || getQuestionType(selectedTypeOfQuestion) === 'SINGLE_CHOICE'
                      ?
                      <ClientOnly fallback={<div></div>}>
                        {() => <QuillEditor quillPlaceholder={"option"} fullAccess={false} onTextChange={(e) => { addOption(e, index) }} />}
                      </ClientOnly>
                      :
                      <textarea className='h-20 p-4 rounded-lg bg-white border border-gray-300 w-full' onChange={(e) => { addOption(e.target.value, index) }}></textarea>

                  }
                </div>
                <span onClick={() => deleteOption(index)}><Icon
                  icon="ic:outline-delete-outline"
                  className={`h-6 w-6  ${options.length < 2 ?'cursor-not-allowed text-red-400':'cursor-pointer text-red-600'}`}
                ></Icon></span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

