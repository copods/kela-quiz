import { useSubmit, useTransition } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import type { TestSection } from '~/interface/Interface'
import BreadCrumb from '../BreadCrumb'
import SelectSections from './CreateSelectSections'
import TestDetails from './CreateTestDetails'
import TestPreview from './CreateTestPreview'
import StepsTabComponent from './StepsTab'
import { commonConstants, testsConstants, toastConstants } from '~/constants/common.constants'
import { routes } from '~/constants/route.constants'
const AddTestComponent = ({ sections }: { sections: Array<TestSection> }) => {
  const transition = useTransition()
  const submit = useSubmit()
  const [sectionsCopy, setSectionsCopy] = useState(sections)

  useEffect(() => {
    setSectionsCopy(sections)
  }, [sections])

  const breadCrumbData = [
    {
      tabName: testsConstants.testListColumnLabel,
      route: routes.tests,
    },
    {
      tabName: testsConstants.addTestbutton,
      route: routes.addTest,
    },
  ]

  const tabs = [
    {
      id: 0,
      name: 'Step 1',
      description: 'Test Details',
    },
    {
      id: 1,
      name: 'Step 2',
      description: 'Select Sections',
    },
    {
      id: 2,
      name: 'Step 3',
      description: 'Preview',
    },
  ]

  const [currentTab, setCurrentTab] = useState(0) // testDetails  ||  selectSections  ||  preview
  const [name, onNameChange] = useState('')
  const [description, onDescriptionChange] = useState('')
  const [selectedSections, onSelectedSectionChange] = useState<TestSection[]>(
    []
  )

  const updateSection = (data: Array<TestSection>, i: number) => {
    setSectionsCopy((sec) => {
      sec[i] = { ...sec[i], ...data }
      onSelectedSectionChange(
        sec.filter((s) => {
          return s.isSelected
        })
      )
      return [...sec]
    })
  }

  const submitAddTest = () => {
    if (typeof name !== 'string' || name.length === 0) {
      toast.error(toastConstants.addTest)
      return
    }
    if (typeof description !== 'string' || description.length === 0) {
      toast.error(toastConstants.enterDescription)
      return
    }
    if (selectedSections.length === 0) {
      toast.error(toastConstants.addSection)
      return
    }
    var sendData: {
      name: string
      description: string
      sections: Array<{
        sectionId: string
        totalQuestions: number
        timeInSeconds: number
        order: number
      }>
    } = {
      name,
      description,
      sections: [],
    }
    selectedSections.forEach((section, index) => {
      sendData.sections.push({
        sectionId: section.id,
        totalQuestions: section.totalQuestions as number,
        timeInSeconds: (section.time as number) * 60,
        order: index + 1,
      })
    })

    submit({ data: JSON.stringify(sendData) }, { method: 'post' })
    // fetcher.submit({ data: JSON.stringify(sendData) }, { method: "post" });
  }

  useEffect(() => {
    if (!name || !description) {
      setCurrentTab(0)
    }
  }, [currentTab, setCurrentTab, name, description])

  return (
    <div className="flex h-full flex-col gap-6 overflow-hidden">
      {/* header */}
      <header className="flex items-center justify-between">
        <h2
          role={testsConstants.addTestbutton}
          tabIndex={0}
          title={testsConstants.addTestbutton}
          className="text-3xl font-bold text-black"
        >
          {testsConstants.addTestbutton}
        </h2>
      </header>
      <BreadCrumb data={breadCrumbData} />
      <StepsTabComponent
        tabs={tabs}
        isDisabled={!name || !description}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />

      {/* Components according to current step */}
      {currentTab === tabs[0].id ? (
        <TestDetails
          name={name}
          onNameChange={onNameChange}
          description={description}
          onDescriptionChange={onDescriptionChange}
        />
      ) : currentTab === tabs[1].id ? (
        <SelectSections
          sections={sectionsCopy}
          setSections={(e, i) => {
            updateSection(e, i)
          }}
          updateSectionsList={setSectionsCopy}
        />
      ) : currentTab === tabs[2].id ? (
        <TestPreview
          selectedSections={selectedSections}
          onSelectedSectionChange={onSelectedSectionChange}
          name={name}
          description={description}
          isPreviewEditable
        />
      ) : (
        ''
      )}
      {/* Buttons */}
      <div className="flex w-full items-center justify-between">
        <Link tabIndex={0} to={routes.tests}>
          <button
            tabIndex={0}
            aria-label={commonConstants.cancel}
            title={commonConstants.cancelAddTest}
            className={`h-9 rounded-lg px-7 text-xs text-white ${
              currentTab !== tabs[0].id
                ? 'bg-red-500'
                : 'bg-gray-6000 bg-red-500'
            }`}
          >
            {commonConstants.cancel}
          </button>
        </Link>
        <div className="flex gap-4">
          <button
            tabIndex={0}
            title={commonConstants.previousTab}
            id="backButton"
            className={`h-9 rounded-lg px-7 text-xs text-white ${
              currentTab != tabs[0].id
                ? 'bg-primary'
                : 'cursor-not-allowed bg-gray-600'
            }`}
            onClick={() => setCurrentTab(currentTab - 1)}
            disabled={currentTab === tabs[0].id}
            aria-label={commonConstants.backButton}
          >
            {commonConstants.backButton}
          </button>
          {currentTab != 2 ? (
            <button
              tabIndex={0}
              title={commonConstants.nextTab}
              id="next-button"
              className={`h-9 rounded-lg px-7 text-xs text-white ${
                !(name && description) || currentTab == 2
                  ? 'cursor-not-allowed bg-gray-600'
                  : 'bg-primary'
              }`}
              onClick={() => setCurrentTab(currentTab + 1)}
              disabled={!(name && description) || currentTab === 2}
              aria-label={commonConstants.nextButton}
            >
              {commonConstants.nextButton}
            </button>
          ) : (
            <button
              tabIndex={0}
              title={commonConstants.nextTab}
              id="submit-button"
              className={`h-9 rounded-lg px-7 text-xs text-white ${
                currentTab == 2
                  ? 'bg-primary'
                  : 'cursor-not-allowed bg-gray-600'
              }`}
              onClick={() => submitAddTest()}
              disabled={currentTab !== 2}
              aria-label={commonConstants.nextButton}
            >
              {transition.state === 'submitting' ? commonConstants.createTest : commonConstants.submit}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
export default AddTestComponent
