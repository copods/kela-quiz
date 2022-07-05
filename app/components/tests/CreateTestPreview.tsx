import type { TestSections } from "../Interface";

const TestPreview = ({ sections, name, description }: { sections: Array<TestSections>, name: string, description: string }) => {

  return (
    <div className="p-6 rounded-lg bg-white flex flex-col gap-9">
      <div className="flex flex-col gap-6">
        <h1 className="text-xl font-semibold">Test Details</h1>
        <div className="text-base flex flex-col gap-4">
          <div className="flex">
            <div className="w-50 min-w-[200px] text-gray-500 font-semibold">Name</div>
            <div className="flex-1 text-gray-700 font-normal">{name}</div>
          </div>
          <div className="flex">
            <div className="w-50 min-w-[200px] text-gray-500 font-semibold">Description</div>
            <div className="flex-1 text-gray-700 font-normal">{description}</div>
          </div>
          <div className="flex">
            <div className="w-50 min-w-[200px] text-gray-500 font-semibold">Total Time</div>
            <div className="flex-1 text-gray-700 font-normal">{sections.length}</div>
          </div>
          <div className="flex">
            <div className="w-50 min-w-[200px] text-gray-500 font-semibold">Total Sections</div>
            <div className="flex-1 text-gray-700 font-normal">{sections.length}</div>
          </div>
        </div>
        <h3>{description}</h3>
      </div>
      {sections
        .filter(section => {
          return section.isSelected
        })
        .map(section => {
          return (
            <div key={section.id}>
              <h1>{section.name}</h1>
              <p>{section.totalQuestions}</p>
              <p>{section.time}</p>
            </div>
          )
        })}
    </div>
  )
}

export default TestPreview