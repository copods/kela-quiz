import { ClientOnly } from "remix-utils"
import QuillEditor from "../QuillEditor.client"

const TestDetails = ({ name, onNameChange, description, onDescriptionChange }: { name: string, onNameChange: (e: string) => void, description: string, onDescriptionChange: (e: string) => void }) => {
  return (
    <div className="w-full bg-white shadow p-6 rounded-lg flex flex-col gap-6 flex-1 overflow-auto">
      <div>
        <label htmlFor="name" className="text-base font-medium text-gray-800">Name</label>
        <input type="text" id="name" name="name" value={name} onChange={(e) => onNameChange(e.target.value)} className="w-full h-11 rounded-lg border border-gray-200 test-base px-3 mt-1" placeholder="Critical Thinking" />
      </div>
      <div className="flex-1">
        <label htmlFor="description" className="text-base font-medium text-gray-800">Description</label>
        {/* <textarea name="description" id="description" rows={10} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded-lg border border-gray-200 test-base p-3 mt-1" placeholder="Description" /> */}
        <div className="pt-2 pb-4 h-full">
          <ClientOnly fallback={<div ></div>}>
            {() => <QuillEditor onTextChange={(e) => { onDescriptionChange(e) }} />}
          </ClientOnly>
        </div>
      </div>
    </div>
  )
}

export default TestDetails