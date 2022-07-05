import { ClientOnly } from 'remix-utils'
import QuillEditor from '../../QuillEditor.client'
import type { QuestionType } from '@prisma/client'
import DropdownField from '~/components/form/Dropdown'

export default function QuestionEditor({ questionTypeList, selectedTypeOfQuestion, setSelectedTypeOfQuestion }: { questionTypeList: QuestionType[], selectedTypeOfQuestion: string, setSelectedTypeOfQuestion: (e: string) => void }) {
  function setQuestion(e: string) {

  }
  return (
    <div className='flex-1 flex flex-col'>
      <div className='flex mb-6'>
        {/* <select className="border-gray-200 border rounded-lg h-11 w-48 flex items-center justify-between pl-4" onChange={(e) => setSelectedTypeOfQuestion(e.target.value)}>
          {questionTypeList.map((quesType) => { return <option key={quesType.id} value={quesType.id} className='text-gray-600'>{quesType.displayName}</option> })}
        </select> */}
        <DropdownField selected={selectedTypeOfQuestion} setSelected={setSelectedTypeOfQuestion} data={questionTypeList} />
      </div>

      <div className='flex-1'>
        <ClientOnly fallback={<div></div>}>
          {() => <QuillEditor setData={(e) => { setQuestion(e) }} />}
        </ClientOnly>
      </div>
    </div>
  )
}