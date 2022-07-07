import { ClientOnly } from 'remix-utils'
import QuillEditor from '../../QuillEditor.client'
import type { QuestionType } from '~/components/Interface'
import DropdownField from '~/components/form/Dropdown'

export default function QuestionEditor({ questionTypeList, selectedTypeOfQuestion, setSelectedTypeOfQuestion, question, setQuestion }: { questionTypeList: QuestionType[], selectedTypeOfQuestion: string, setSelectedTypeOfQuestion: (e: string) => void, question: string, setQuestion: (e: string) => void }) {
  function setEditorQuestion(e: string) {
    setQuestion(e);
  }
  console.log(selectedTypeOfQuestion);
  //console.log(questionTypeList);
  return (
    <div className='flex-1 flex flex-col'>
      <div className='flex mb-6'>
        <DropdownField selected={selectedTypeOfQuestion} setSelected={setSelectedTypeOfQuestion} data={questionTypeList} />
      </div>

      <div className='flex-1'>
        <ClientOnly fallback={<div></div>}>
          {() => <QuillEditor setData={(e) => { setEditorQuestion(e) }} />}
        </ClientOnly>
      </div>
    </div>
  )
}