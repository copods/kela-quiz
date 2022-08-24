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
import { commonConstants, testsConstants } from '~/constants/common.constants'
import Button from '../form/Button'
const AddTestComponent = ({ sections }: { sections: Array<TestSection> }) => {
  const transition = useTransition()
  const submit = useSubmit()
  const [sectionsCopy, setSectionsCopy] = useState(sections)

  useEffect(() => {
    setSectionsCopy(sections)
  }, [sections])

  const breadCrumbData = [
    {
      tabName: 'Test',
      route: '/tests',
    },
    {
      tabName: 'Add Test',
      route: '/tests/add-test',
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
      toast.error('Enter Name to add test')
      return
    }
    if (typeof description !== 'string' || description.length === 0) {
      toast.error('Enter description to add test')
      return
    }
    if (selectedSections.length === 0) {
      toast.error('Add sections to add test')
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
        <h2 title="Add Test" className="text-3xl font-bold text-black">
          {testsConstants.addTestbutton}
        </h2>
      </header>
      <div>
        <BreadCrumb data={breadCrumbData} />
      </div>
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
        <div>
          <Link to={'/tests'}>
            <Button 
              tabIndex={0}
              title='Cancel Add Test' 
              className='h-9 px-7' 
              varient='secondary-solid'
              buttonText={commonConstants.cancel} />
          </Link>
        </div>
        <div className="flex gap-4">
          <Button 
            tabIndex={0}
            title='Previous Tab' 
            className='h-9 px-7' 
            varient='primary-solid'
            buttonText={commonConstants.backButton} 
            isDisabled={currentTab === tabs[0].id}
            onClick={() => setCurrentTab(currentTab - 1)} />
          {currentTab != 2 ? (
            <Button 
              tabIndex={0}
              title='Next Tab' 
              className='h-9 px-7' 
              varient='primary-solid'
              buttonText={commonConstants.nextButton} 
              isDisabled={!(name && description) || currentTab == 2}
              onClick={() => setCurrentTab(currentTab + 1)} />
          ) : (
            <Button 
              tabIndex={0}
              title='Next Tab' 
              id='submitButton'
              className='h-9 px-7' 
              varient='primary-solid'
              buttonText={transition.state === 'submitting' ? 'Creating Test' : 'Submit'} 
              isDisabled={currentTab != 2}
              onClick={() => submitAddTest()} />
          )}
        </div>
      </div>
    </div>
  )
}
export default AddTestComponent
