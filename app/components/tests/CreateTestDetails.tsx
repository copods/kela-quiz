import { ClientOnly } from 'remix-utils'
import QuillEditor from '../QuillEditor.client'

const TestDetails = ({
  name,
  onNameChange,
  description,
  onDescriptionChange,
}: {
  name: string
  onNameChange: (e: string) => void
  description: string
  onDescriptionChange: (e: string) => void
}) => {
  return (
    <div className="flex w-full flex-1 flex-col gap-6 overflow-auto rounded-lg bg-white p-6 shadow">
      <div>
        <label htmlFor="name" className="text-base font-medium text-gray-800">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="test-base mt-1 h-11 w-full rounded-lg border border-gray-200 px-3"
          placeholder="Critical Thinking"
        />
      </div>
      <div className="flex-1">
        <label
          htmlFor="description"
          className="text-base font-medium text-gray-800"
        >
          Description
        </label>
        <div className="h-full pt-2 pb-4">
          <ClientOnly fallback={<div></div>}>
            {() => (
              <QuillEditor
                id="testDescription"
                fullAccess={true}
                quillPlaceholder="Question"
                onTextChange={(e) => {
                  onDescriptionChange(e)
                }}
              />
            )}
          </ClientOnly>
        </div>
      </div>
    </div>
  )
}

export default TestDetails
