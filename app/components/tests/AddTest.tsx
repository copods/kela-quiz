import { useFetcher } from "@remix-run/react"
import { useState } from "react"
import { Link } from "react-router-dom"
import BreadCrumb from "../BreadCrumb"
import type { TestSections } from "../Interface"
import SelectSections from "./CreateSelectSections"
import TestDetails from "./CreateTestDetails"
import TestPreview from "./CreateTestPreview"
import StepsTabComponent from "./StepsTab"

const AddTestComponent = ({ sections }: { sections: Array<TestSections> }) => {

  const fetcher = useFetcher();
  const [sectionsCopy, setSectionsCopy] = useState(sections)

  const breadCrumbData = [
    {
      tabName: 'Test',
      route: '/tests'
    },
    {
      tabName: 'Add Test',
      route: '/tests/add-test'
    }
  ]

  const tabs = [
    {
      id: 0,
      name: 'Step 1',
      description: 'Test Details'
    },
    {
      id: 1,
      name: 'Step 2',
      description: 'Select Sections'
    },
    {
      id: 2,
      name: 'Step 3',
      description: 'Preview'
    }
  ]

  const [currentTab, setCurrentTab] = useState(0)     // testDetails  ||  selectSections  ||  preview
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const updateSection = (data: any, i: number) => {
    setSectionsCopy(sec => {
      sec[i] = { ...sec[i], ...data }
      return [...sec]
    })
  }

  const submit = () => {
    var sendData: { name: string, description: string, sections: Array<{ sectionId: string, totalQuestions: number, timeInSeconds: number }> } = {
      name,
      description,
      sections: []
    }
    sectionsCopy
      .filter(section => {
        return section.isSelected
      })
      .map(section => { sendData.sections.push({ sectionId: section.id, totalQuestions: section.totalQuestions as number, timeInSeconds: section.time as number }) })

    fetcher.submit({ data: JSON.stringify(sendData) }, { method: "post" });
  }


  return (
    <div className="flex flex-col gap-6 h-full overflow-hidden">
      {/* header */}
      <header className="flex justify-between items-center">
        <h2 title="Add Test" className="text-3xl font-bold text-black">Add Test</h2>
      </header>
      <div>
        <BreadCrumb data={breadCrumbData} />
      </div>
      <StepsTabComponent tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Components according to current step */}
      {
        currentTab === tabs[0].id ? <TestDetails name={name} setName={setName} description={description} setDescription={setDescription} />
          :
          currentTab === tabs[1].id ? <SelectSections sections={sectionsCopy} setSections={(e, i) => { updateSection(e, i) }} />
            :
            currentTab === tabs[2].id ? <TestPreview sections={sectionsCopy} name={name} description={description} />
              : ''
      }

      {/* Buttons */}
      <div className="flex justify-between items-center w-full">
        <div>
          <Link to={'/tests'}>
            <button title="Cancel Add Test" className={`text-white text-xs px-7 h-9 rounded-lg ${currentTab != tabs[0].id ? 'bg-red-500' : 'bg-gray-6000 bg-red-500'}`}>Cancel</button>
          </Link>
        </div>
        <div className="flex gap-4">
          <button title="Previous Tab" className={`text-white text-xs px-7 h-9 rounded-lg ${currentTab != tabs[0].id ? 'bg-primary' : 'bg-gray-600'}`} onClick={() => setCurrentTab(currentTab - 1)} disabled={currentTab === tabs[0].id}>Back</button>
          {
            currentTab != 2
              ?
              // <button title="Next Tab" className={`text-white text-xs px-7 h-9 rounded-lg ${(!(name && description) || currentTab == 2 || (currentTab == 1 && selectedSections.length == 0)) ? 'bg-gray-600' : 'bg-primary'}`} onClick={() => setCurrentTab(currentTab + 1)} disabled={(!(name && description) || currentTab == 2)}>Next</button>
              <button title="Next Tab" className={`text-white text-xs px-7 h-9 rounded-lg ${(!(name && description) || currentTab == 2) ? 'bg-gray-600' : 'bg-primary'}`} onClick={() => setCurrentTab(currentTab + 1)} disabled={(!(name && description) || currentTab == 2)}>Next</button>
              :
              <button title="Next Tab" className={`text-white text-xs px-7 h-9 rounded-lg ${(currentTab == 2) ? 'bg-primary' : 'bg-gray-600'}`} onClick={() => submit()} disabled={(currentTab != 2)}>Submit</button>
          }
        </div>
      </div>
    </div >
  )
}

export default AddTestComponent