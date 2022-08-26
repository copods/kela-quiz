import { ClientOnly } from 'remix-utils'
import QuillEditor from '../QuillEditor.client'
import { commonConstants, testsConstants } from '~/constants/common.constants'

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
    <div className="flex h-full w-full flex-col gap-6 rounded-lg bg-white p-6 shadow">
      <div>
        <label htmlFor="name" className="text-base font-medium text-gray-800">
          {commonConstants.name}
        </label>
        <input
          tabIndex={0}
          type="text"
          id="name"
          name="testName"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="test-base mt-1 h-11 w-full rounded-lg border border-gray-200 px-3"
          placeholder="Enter test name"
        />
      </div>
      <div className="flex-1">
        <label
          htmlFor="description"
          className="text-base font-medium text-gray-800"
        >
          {testsConstants.createTestDescription}
        </label>
        <div className="h-full pt-2 pb-4">
          <ClientOnly fallback={<div></div>}>
            {() => (
              <QuillEditor
                text={description}
                id="testDescription"
                fullAccess={true}
                quillPlaceholder="Question"
                onTextChange={(e) => {
                  if (e === '<p><br></p>') onDescriptionChange('')
                  else onDescriptionChange(e)
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
