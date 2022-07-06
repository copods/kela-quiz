import type { TestSections } from "../Interface";

const TestPreview = ({ sections, name, description, setSelectedSections, selectedSections }: { sections: Array<TestSections>, name: string, description: string, selectedSections: Array<TestSections>, setSelectedSections: (e: any) => void }) => {
  console.log(selectedSections)
  const getAllSectionTime = () => {

  }
  return (
    <div className="p-6 rounded-lg bg-white flex flex-col gap-9 overflow-auto">
      <div className="flex flex-col gap-6">
        <h1 className="text-xl font-semibold">Test Details</h1>
        <div className="text-base flex flex-col gap-4">
          <div className="flex">
            <div className="w-50 min-w-[200px] text-gray-500 font-semibold">Name</div>
            <div className="flex-1 text-gray-700 font-normal">{name}</div>
          </div>
          <div className="flex">
            <div className="w-50 min-w-[200px] text-gray-500 font-semibold">Description</div>
            <div className="flex-1 text-gray-700 font-normal" dangerouslySetInnerHTML={{ __html: description }}></div>
          </div>
          <div className="flex">
            <div className="w-50 min-w-[200px] text-gray-500 font-semibold">Total Time</div>
            <div className="flex-1 text-gray-700 font-normal">{selectedSections.length}</div>
          </div>
          <div className="flex">
            <div className="w-50 min-w-[200px] text-gray-500 font-semibold">Total Sections</div>
            <div className="flex-1 text-gray-700 font-normal">{selectedSections.length}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <h1 className="text-xl font-semibold">Selected Sections</h1>
        <div className="text-base flex flex-col gap-4">
          {selectedSections
            .map((section, i) => {
              return (
                <div className="flex" key={section.id}>
                  <div className="w-50 min-w-[200px] text-gray-500 font-semibold">Section {i + 1}</div>
                  <div className=" border border-gray-300 rounded-lg flex-1 max-w-2xl	text-gray-700 font-normal">{selectedSections.length}</div>
                </div>
              )
            })}
        </div>
      </div>

    </div>
  )
}

export default TestPreview