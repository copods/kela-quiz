import { useFetcher, useSubmit, useTransition } from "@remix-run/react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import BreadCrumb from "../BreadCrumb"
import type { TestSection } from "../Interface"
import SelectSections from "./CreateSelectSections"
import TestDetails from "./CreateTestDetails"
import TestPreview from "./CreateTestPreview"
import StepsTabComponent from "./StepsTab"

const AddTestComponent = ({ sections }: { sections: Array<TestSection> }) => {

  const transition = useTransition();
  const fetcher = useFetcher();
  const submit2 = useSubmit();
  const [sectionsCopy, setSectionsCopy] = useState(sections)

  useEffect(() => {
    setSectionsCopy(sections)
  }, [sections])

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
  const [name, onNameChange] = useState('')
  const [description, onDescriptionChange] = useState('')
  const [selectedSections, onSelectedSectionChange] = useState<TestSection[]>([])

  const updateSection = (data: any, i: number) => {
    setSectionsCopy(sec => {
      sec[i] = { ...sec[i], ...data }
      onSelectedSectionChange(sec.filter(s => { return s.isSelected }))
      return [...sec]
    })
  }

  const submit = () => {
    if (typeof name !== 'string' || name.length === 0) {
      toast.error("Enter Name to add test")
      return
    }
    if (typeof description !== 'string' || description.length === 0) {
      toast.error("Enter description to add test")
      return
    }
    if (selectedSections.length === 0) {
      toast.error("Add sections to add test")
      return
    }
    var sendData: { name: string, description: string, sections: Array<{ sectionId: string, totalQuestions: number, timeInSeconds: number, order: number }> } = {
      name,
      description,
      sections: []
    }
    selectedSections
      .map((section, index) => { sendData.sections.push({ sectionId: section.id, totalQuestions: section.totalQuestions as number, timeInSeconds: section.time as number, order: index + 1 }) })

    submit2({ data: JSON.stringify(sendData) }, { method: "post" });
    // fetcher.submit({ data: JSON.stringify(sendData) }, { method: "post" });
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
        currentTab === tabs[0].id ? <TestDetails name={name} onNameChange={onNameChange} description={description} onDescriptionChange={onDescriptionChange} />
          :
          currentTab === tabs[1].id ? <SelectSections sections={sectionsCopy} setSections={(e, i) => { updateSection(e, i) }} updateSectionsList={setSectionsCopy} />
            :
            currentTab === tabs[2].id ? <TestPreview selectedSections={selectedSections} onSelectedSectionChange={onSelectedSectionChange} sections={sectionsCopy} name={name} description={description} />
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
          <button title="Previous Tab" id="backButton" className={`text-white text-xs px-7 h-9 rounded-lg ${currentTab != tabs[0].id ? 'bg-primary' : 'bg-gray-600'}`} onClick={() => setCurrentTab(currentTab - 1)} disabled={currentTab === tabs[0].id}>Back</button>
          {
            currentTab != 2
              ?
              <button title="Next Tab" id="nextButton" className={`text-white text-xs px-7 h-9 rounded-lg ${(!(name && description) || currentTab == 2) ? 'bg-gray-600' : 'bg-primary'}`} onClick={() => setCurrentTab(currentTab + 1)} disabled={(!(name && description) || currentTab == 2)}>Next</button>
              :
              <button title="Next Tab" id="submitButton" className={`text-white text-xs px-7 h-9 rounded-lg ${(currentTab == 2) ? 'bg-primary' : 'bg-gray-600'}`} onClick={() => submit()} disabled={(currentTab != 2)}>
                {transition.state === "submitting" ? "Creating Test" : "Submit"}
              </button>
          }
        </div>
      </div>
    </div >
  )
}

export default AddTestComponent