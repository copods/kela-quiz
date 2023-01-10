import { Icon } from '@iconify/react'
import Moment from 'moment'
import { toast } from 'react-toastify'
import type { TestSection } from '~/interface/Interface'
import Button from '../common-components/Button'
import { useTranslation } from 'react-i18next'

const SelectSectionCard = ({
  section,
  updateSection,
  sectionCount=0,
}: {
  section: TestSection
  updateSection:<T>(e: T) => void
  sectionCount?: number
}) => {
  const { t } = useTranslation()

  const updateThisSection = (
    target: string,
    value?: string,
    selected?: boolean
  ) => {
    if (sectionCount === 0) {
      toast.error(t('toastConstants.cannotAddTestZeroQuestion'))
      return
    }
    let tempSection = {
      isSelected: section.isSelected,
      totalQuestions: section.totalQuestions
        ? section.totalQuestions
        : sectionCount && sectionCount < 11
        ? sectionCount
        : 10,
      time: section.time
        ? section.time
        : sectionCount && sectionCount < 11
        ? sectionCount
        : 10,
    }
    switch (target) {
      case 'isSelected':
        tempSection.isSelected = selected
        break
      case 'totalQuestions':
        if (parseInt(value || '') > (sectionCount|| 0)) {
          toast.error(t('toastConstants.notAdMoreThanAvailableQuestion'),{
            toastId: t('toastConstants.notAdMoreThanAvailableQuestion'),
          })
          return
        }
        if (parseInt(value || '') == 0) {
          toast.error(t('toastConstants.cannotAddTestZeroQuestion'))
          return
        }
        tempSection.totalQuestions = parseInt(value || '')
        break
      case 'time':
        tempSection.time = parseInt(value || '')
        break
    }
    updateSection(tempSection)
  }
  return (
    <div
      id="section"
      className={`flex min-w-sectionCard flex-1 flex-col gap-2 rounded-lg border ${
        section.isSelected
          ? 'border-3 border-primary bg-white px-18 py-22'
          : 'border-gray-300 bg-gray-100 px-5 py-6'
      }`}
    >
      <div className="flex items-start justify-between">
        <h3
          title={section.name}
          className="flex-1 text-xl font-semibold text-gray-700"
        >
          {section.name}
        </h3>
        {section.isSelected ? (
          <Button
            tabIndex={0}
            className="h-7 px-4"
            varient="secondary-solid"
            onClick={() => updateThisSection('isSelected', '', false)}
            title={t('commonConstants.removeButton')}
            buttonText={t('commonConstants.removeButton')}
          />
        ) : (
          <Button
            tabIndex={0}
            className="h-7 px-4"
            onClick={() => updateThisSection('isSelected', '', true)}
            varient="primary-solid"
            title={t('commonConstants.add')}
            buttonText={t('commonConstants.add')}
          />
        )}
      </div>
      <div className="flex text-xs text-gray-400">
        <span>
          {t('commonConstants.byText')} {section?.createdBy?.firstName}{' '}
          {section?.createdBy?.lastName}
        </span>
        <span className="flex">
          <Icon className="text-base" icon={'mdi:circle-small'} />
          {Moment(section?.createdAt).format('DD MMM YY')}
        </span>
      </div>
      <div className="flex text-xs text-gray-400">
        {t('testsConstants.totalQuestionsText')}:{' '}
        <span className="count">{sectionCount}</span>
      </div>
      <hr className="h-px w-full border-0 bg-gray-300" />
      <div className="flex gap-4 pt-1">
        <div>
          <label
            htmlFor="noOfQuestion"
            className="text-xs font-medium text-gray-600"
          >
            {t('testsConstants.totalQuestionsText')}
          </label>
          <input
            tabIndex={0}
            type="number"
            id="no-of-qu"
            name="noOfQuestion"
            value={section.totalQuestions}
            onChange={(e) =>
              updateThisSection('totalQuestions', e.target.value)
            }
            className={`mt-1 h-11 w-full rounded-lg border border-gray-300 px-3 text-xs ${
              section.isSelected ? 'bg-white' : 'bg-gray-200'
            }`}
            placeholder={t('commonConstants.totalQuestion')}
            disabled={!section.isSelected}
          />
        </div>
        <div>
          <label
            htmlFor="totalTime"
            className="text-xs font-medium text-gray-600"
          >
            {t('testsConstants.totalTimeText')}
          </label>
          <input
            tabIndex={0}
            type="number"
            min={1}
            id="time"
            name="totalTime"
            value={section.time}
            onChange={(e) => {
              if (Number(e.target.value) === 0) {
                return
              }
              updateThisSection('time', e.target.value)
            }}
            className={`mt-1 h-11 w-full rounded-lg border border-gray-300 px-3 text-xs ${
              section.isSelected ? 'bg-white' : 'bg-gray-200'
            }`}
            placeholder="Time(min)"
            disabled={!section.isSelected}
          />
        </div>
      </div>
    </div>
  )
}

export default SelectSectionCard
