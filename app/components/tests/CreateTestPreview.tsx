import { Icon } from '@iconify/react'
import type { TestSection } from '~/interface/Interface'
import { useTranslation } from 'react-i18next'

const TestPreview = ({
  name,
  description,
  onSelectedSectionChange,
  selectedSections,
  isPreviewEditable = true,
}: {
  name: string
  description: string
  selectedSections: Array<TestSection>
  onSelectedSectionChange: (e: any) => void
  isPreviewEditable: boolean
}) => {
  const { t } = useTranslation()

  const moveSection = (index: number, action: string) => {
    if (action == 'up') {
      if (index == 0) {
        return
      }
      onSelectedSectionChange((section: Array<TestSection>) => {
        let temp = section[index]
        section[index] = section[index - 1]
        section[index - 1] = temp
        return [...section]
      })
    } else if (action == 'down') {
      if (index == selectedSections.length - 1) {
        return
      }
      onSelectedSectionChange((section: Array<TestSection>) => {
        let temp = section[index]
        section[index] = section[index + 1]
        section[index + 1] = temp
        return [...section]
      })
    }
  }
  const getTotalTime = () => {
    let time = 0

    selectedSections.forEach(
      (section) =>
        (time += (section?.time ? section.time : section.timeInSeconds) || 0)
    )
    return isPreviewEditable ? time : time / 60
  }
  return (
    <div className="flex flex-1 flex-col gap-9 overflow-scroll rounded-lg bg-white p-6 shadow-base">
      <div className="flex flex-col gap-6">
        <h1 className="text-xl font-semibold">
          {t('testsConstants.testDetailsText')}
        </h1>
        <div className="flex flex-col gap-4 text-base">
          <div className="flex">
            <div
              id="name"
              className="min-w-200 text-base font-medium text-gray-500"
            >
              {t('commonConstants.name')}
            </div>
            <div className="flex-1 text-base text-gray-700">{name}</div>
          </div>
          <div className="flex">
            <div
              id="description"
              className="min-w-200 text-base font-medium text-gray-500"
            >
              {t('testsConstants.descriptionText')}
            </div>
            <div
              className="ql-editor flex-1 p-0 text-base text-gray-700"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            ></div>{' '}
          </div>
          <div className="flex">
            <div
              id="totalTime"
              className="min-w-200 text-base font-medium text-gray-500"
            >
              {t('testsConstants.totalTimeText')}
            </div>
            <div className="flex-1 text-base text-gray-700">
              {getTotalTime()}
            </div>
          </div>
          <div className="flex">
            <div
              id="totalSection"
              className="min-w-200 text-base font-medium text-gray-500"
            >
              {t('testsConstants.totalSectionsText')}
            </div>
            <div className="flex-1 text-base text-gray-700">
              {selectedSections.length}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <h1 className="text-xl font-semibold">
          {t('testsConstants.selectedSctionText')}
        </h1>
        <div className="flex flex-col gap-4 text-base">
          {selectedSections.map((section, i) => {
            return (
              <div className="flex items-center gap-4" key={section.id}>
                <div className="min-w-184 text-base text-gray-500">
                  {t('testsConstants.sectionText')} {i + 1}
                </div>
                <div className="flex max-w-2xl flex-1 items-center justify-between gap-6 rounded-lg border border-gray-300 py-3 px-4 text-gray-700">
                  <div className="text-base font-semibold text-gray-700">
                    {section.name ? section.name : section.section?.name}
                  </div>
                  <div className="flex gap-5 text-sm text-gray-700">
                    <span>
                      {section.totalQuestions ? section.totalQuestions : 0}{' '}
                      {t('testsConstants.questions')}
                    </span>
                    <span>
                      {section.time
                        ? section.time
                        : section.timeInSeconds &&
                          section.timeInSeconds / 60}{' '}
                      Min
                    </span>
                  </div>
                </div>
                {isPreviewEditable && (
                  <div className="flex gap-2">
                    <Icon
                      icon="fa:long-arrow-up"
                      className="cursor-pointer"
                      onClick={() => moveSection(i, 'up')}
                      tabIndex={0}
                      onKeyUp={(e) => {
                        if (e.key === 'Enter') moveSection(i, 'up')
                      }}
                    />
                    <Icon
                      icon="fa:long-arrow-down"
                      className="cursor-pointer"
                      onClick={() => moveSection(i, 'down')}
                      tabIndex={0}
                      onKeyUp={(e) => {
                        if (e.key === 'Enter') moveSection(i, 'up')
                      }}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TestPreview
