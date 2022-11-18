import { useNavigate, useSubmit, useTransition } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { sortByOrder } from '~/interface/Interface'
import type { TestSection } from '~/interface/Interface'
import BreadCrumb from '../BreadCrumb'
import SelectSections from './CreateSelectSections'
import TestDetails from './CreateTestDetails'
import TestPreview from './CreateTestPreview'
import StepsTabComponent from './StepsTab'
import Button from '../form/Button'
import { routes } from '~/constants/route.constants'
import { useTranslation } from 'react-i18next'

const AddTestComponent = ({ sections }: { sections: Array<TestSection> }) => {
  const { t } = useTranslation()

  const transition = useTransition()
  const submit = useSubmit()
  const [sectionsCopy, setSectionsCopy] = useState(sections)
  useEffect(() => {
    setSectionsCopy(sections)
  }, [sections])
  const breadCrumbData = [
    {
      tabName: 'testsConstants.assessment',
      route: routes.assessments,
    },
    {
      tabName: 'testsConstants.addTestbutton',
      route: routes.addAssessment,
    },
  ]
  const tabs = [
    {
      id: 0,
      name: 'Step 1',
      description: 'Assessment Details',
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
  const [description, setDescription] = useState('')
  const [selectedSections, onSelectedSectionChange] = useState<TestSection[]>(
    []
  )
  const navigate = useNavigate()
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
      toast.error(t('toastConstants.addAssessment'))
      return
    }
    if (typeof description !== 'string' || description.length === 0) {
      toast.error(t('toastConstants.enterDescription'))
      return
    }
    if (selectedSections.length === 0) {
      toast.error(t('toastConstants.addSection'))
      return
    }
    let sendData: {
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
  function isQuillEmpty(value: string) {
    if (
      value.replace(/<(.|\n)*?>/g, '').trim().length === 0 &&
      !value.includes('<img')
    ) {
      return true
    }
    return false
  }
  return (
    <div className="flex h-full flex-col gap-6 overflow-hidden">
      {/* header */}
      <header className="flex items-center justify-between">
        <h2
          role={t('testsConstants.addTestbutton')}
          tabIndex={0}
          title={t('testsConstants.addTestbutton')}
          className="text-3xl font-bold text-black"
        >
          {t('testsConstants.addTestbutton')}
        </h2>
      </header>
      <BreadCrumb data={breadCrumbData} />
      <StepsTabComponent
        tabs={tabs}
        disabledTabs={[
          false,
          !name || isQuillEmpty(description),
          selectedSections.length < 1,
        ]}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      {/* Components according to current step */}
      {currentTab === tabs[0].id ? (
        <TestDetails
          name={name}
          onNameChange={onNameChange}
          description={description}
          onDescriptionChange={setDescription}
        />
      ) : currentTab === tabs[1].id ? (
        <SelectSections
          sections={sectionsCopy}
          setSections={(e, i) => {
            updateSection(e, i)
          }}
          updateSectionsList={setSectionsCopy}
        />
      ) : (
        currentTab === tabs[2].id && (
          <TestPreview
            selectedSections={selectedSections}
            onSelectedSectionChange={onSelectedSectionChange}
            name={name}
            description={description}
            isPreviewEditable
          />
        )
      )}
      {/* Buttons */}
      <div className="flex w-full items-center justify-between">
        <Button
          tabIndex={0}
          onClick={() => navigate(routes.assessments)}
          className="h-9 px-7"
          varient="secondary-solid"
          title={t('commonConstants.cancelAddTest')}
          buttonText={t('commonConstants.cancel')}
        />
        <div className="flex gap-4">
          <Button
            tabIndex={0}
            title={t('commonConstants.previousTab')}
            className="h-9 px-7"
            varient="primary-solid"
            id="back-button"
            buttonText={t('commonConstants.backButton')}
            isDisabled={currentTab === tabs[0].id}
            onClick={() => setCurrentTab(currentTab - 1)}
          />
          {currentTab !== 2 ? (
            <Button
              tabIndex={0}
              title={t('commonConstants.nextTab')}
              className="h-9 px-7"
              varient="primary-solid"
              id="next-button"
              buttonText={t('commonConstants.nextButton')}
              isDisabled={
                !name ||
                isQuillEmpty(description) ||
                currentTab == 2 ||
                (selectedSections.length < 1 && currentTab == 1)
              }
              onClick={() => setCurrentTab(currentTab + 1)}
            />
          ) : (
            <Button
              tabIndex={0}
              title={t('commonConstants.nextTab')}
              id="submit-button"
              className="h-9 px-7"
              varient="primary-solid"
              buttonText={
                transition.state === 'submitting'
                  ? sortByOrder.creatingAssessment
                  : sortByOrder.submit
              }
              isDisabled={currentTab != 2}
              onClick={() => submitAddTest()}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default AddTestComponent
