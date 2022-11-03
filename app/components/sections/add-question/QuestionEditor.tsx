import { ClientOnly } from 'remix-utils'
import QuillEditor from '../../QuillEditor.client'
import type { QuestionType } from '~/interface/Interface'
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
  function setEditorQuestion(question: string) {
    if (question === '<p><br></p>') {
      setQuestion('')
    } else {
      setQuestion(question)
    }
  }
  return (
    <div className="flex flex-1 flex-col gap-6 p-1" id="Question">
      <div className="flex w-48" id="dropdown-container">
        <DropdownField
          value={selectedTypeOfQuestion}
          setValue={onQuestionTypeChange}
          data={questionTypeList}
          displayKey={'displayName'}
          valueKey={'id'}
        />
      </div>
      <div className="flex-1 py-1" id="question-editor">
        <ClientOnly fallback={<div></div>}>
          {() => (
            <QuillEditor
              id="editorQuill"
              text={question}
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
