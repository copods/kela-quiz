import { ClientOnly } from 'remix-utils'
import QuillEditor from '../../QuillEditor.client'
import type { QuestionType } from '~/components/Interface'
import DropdownField from '~/components/form/Dropdown'


export default function QuestionEditor({ questionTypeList, selectedTypeOfQuestion, setSelectedTypeOfQuestion, question, setQuestion }: { questionTypeList: QuestionType[], selectedTypeOfQuestion: string, setSelectedTypeOfQuestion: (e: string) => void, question: string, setQuestion: (e: string) => void }) {
  function setEditorQuestion(e: string) {
    setQuestion(e);
  }
  return (
    <div className='flex-1 flex flex-col'>
      <div className='flex mb-6'>
        <DropdownField value={selectedTypeOfQuestion} setValue={setSelectedTypeOfQuestion} data={questionTypeList} displayKey={"displayName"} valueKey={"id"} />
      </div>

      <div className='flex-1' id="questionEditor">
        <ClientOnly fallback={<div></div>}>
          {() => <QuillEditor quillPlaceholder={"question"} fullAccess= {true} onTextChange={(e) => { setEditorQuestion(e) }} />}
        </ClientOnly>
      </div>
    </div>
  )
}