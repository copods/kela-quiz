import { Icon } from "@iconify/react";
import type { QuestionType } from "@prisma/client";
import { useState } from "react";


export default function OptionForQuestion({ questionTypeList, selectedTypeOfQuestion }: { questionTypeList: QuestionType[], selectedTypeOfQuestion: string }) {

  const [addOptionArray, setAddOptionArray] = useState([{
    option: '',
    isCorrectOption: false
  }]);

  const addOptionArea = () => {
    setAddOptionArray([...addOptionArray, {
      option: '',
      isCorrectOption: false
    }])
  }

  const deleteOption = (i: number) => {
    setAddOptionArray(e => {
      e.splice(i, 1)
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
          {addOptionArray.map((option, index) => {
            return (
              <div className='flex items-center gap-2.5' key={index}>
                {getQuestionType(selectedTypeOfQuestion) === 'MULTIPLE_CHOICE'
                  ? <input type="checkbox" />
                  :  getQuestionType(selectedTypeOfQuestion) === 'SINGLE_CHOICE' && <input type="radio" />}
                <textarea className='h-40  rounded-lg bg-slate-300 w-full'></textarea>
                {addOptionArray.length > 1 && <span onClick={() => deleteOption(index)}><Icon
                  icon="ic:outline-delete-outline"
                  className="h-6 w-6 text-red-500 "
                ></Icon></span>}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}