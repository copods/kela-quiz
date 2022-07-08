import { Icon } from "@iconify/react";
import type { TestSections } from "../Interface";

const TestPreview = ({ sections, name, description, setSelectedSections, selectedSections }: { sections: Array<TestSections>, name: string, description: string, selectedSections: Array<TestSections>, setSelectedSections: (e: any) => void }) => {

  const moveSection = (index: number, action: string) => {
    if (action == 'up') {
      if (index == 0) {
        return
      }
      setSelectedSections((section: any) => {
        let temp = section[index]
        section[index] = section[index - 1]
        section[index - 1] = temp
        return [...section]
      })
    } else if (action == 'down') {
      if (index == selectedSections.length - 1) {
        return
      }
      setSelectedSections((section: any) => {
        let temp = section[index]
        section[index] = section[index + 1]
        section[index + 1] = temp
        return [...section]
      })
    }
  }

  const getTotalTime = () => {
    let time = 0;

    selectedSections.forEach(section => time += section?.time || 0)

    return time;
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
            <div className="flex-1 text-gray-700 font-normal">{getTotalTime()}</div>
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
                <div className="flex items-center gap-4" key={section.id}>
                  <div className="w-44 min-w-[184px] text-gray-500 font-semibold">Section {i + 1}</div>
                  <div className=" border border-gray-300 rounded-lg flex-1 flex items-center justify-between gap-6 max-w-2xl	text-gray-700 font-normal py-3 px-4">
                    <div className="font-semibold text-gray-700 text-base">
                      {section.name}
                    </div>
                    <div className="flex gap-6 font-normal text-sm text-gray-700">
                      <span>{section.totalQuestions ? section.totalQuestions : 0} Questions</span>
                      <span>{section.time ? section.time : 0} Mins</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Icon icon="fa:long-arrow-up" className="cursor-pointer" onClick={() => moveSection(i, 'up')} />
                    <Icon icon="fa:long-arrow-down" className="cursor-pointer" onClick={() => moveSection(i, 'down')} />
                  </div>
                </div>
              )
            })}
        </div>
      </div>

    </div>
  )
}

export default TestPreview