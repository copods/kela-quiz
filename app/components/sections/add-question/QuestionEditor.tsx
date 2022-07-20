import { ClientOnly } from 'remix-utils'
import QuillEditor from '../../QuillEditor.client'
import type { QuestionType } from '~/components/Interface'
import DropdownField from '~/components/form/Dropdown'

export default function QuestionEditor({
  questionTypeList,
  selectedTypeOfQuestion,
  onQuestionTypeChange,
  question,
  setQuestion,
}: {
  questionTypeList: QuestionType[]
  selectedTypeOfQuestion: string
  onQuestionTypeChange: (e: string) => void
  question: string
  setQuestion: (e: string) => void
}) {
  function setEditorQuestion(e: string) {
    setQuestion(e)
  }
  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-6 flex">
        <DropdownField
          value={selectedTypeOfQuestion}
          setValue={onQuestionTypeChange}
          data={questionTypeList}
          displayKey={'displayName'}
          valueKey={'id'}
        />
      </div>

      <div className="flex-1" id="questionEditor">
        <ClientOnly fallback={<div></div>}>
          {() => (
            <QuillEditor
              id="99"
              quillPlaceholder={'question'}
              fullAccess={true}
              onTextChange={(e) => {
                setEditorQuestion(e)
              }}
            />
          )}
        </ClientOnly>
      </div>
    </div>
  )
}
