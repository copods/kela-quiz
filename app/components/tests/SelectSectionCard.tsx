import { Icon } from '@iconify/react'
import Moment from 'moment'
import type { TestSection } from '~/interface/Interface'

const SelectSectionCard = ({
  section,
  updateSection,
}: {
  section: TestSection
  updateSection: (e: any) => void
}) => {
  const updateThisSection = (
    target: string,
    value?: string,
    selected?: boolean
  ) => {
    var temp = {
      isSelected: section.isSelected,
      totalQuestions: section.totalQuestions
        ? section.totalQuestions
        : section._count && section._count?.questions < 11
        ? section._count?.questions
        : 10,
      time: section.time
        ? section.time
        : section._count && section._count?.questions < 11
        ? section._count?.questions
        : 10,
    }
    switch (target) {
      case 'isSelected':
        temp.isSelected = selected
        break
      case 'totalQuestions':
        temp.totalQuestions = parseInt(value || '')
        break
      case 'time':
        temp.time = parseInt(value || '')
        break
    }
    updateSection(temp)
  }
  return (
    <div
      id="section"
      className={`flex w-sectionCard min-w-sectionCard flex-1 flex-col gap-2 rounded-lg border ${
        section.isSelected
          ? 'border-[3px] border-primary bg-white px-[18px] py-[22px]'
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
          <button
            className="h-6 rounded bg-red-500 px-4 text-[9px] text-white"
            onClick={() => {
              updateThisSection('isSelected', '', false)
            }}
          >
            Remove
          </button>
        ) : (
          <button
            className="h-6 rounded bg-primary px-4 text-[9px] text-white"
            onClick={() => {
              updateThisSection('isSelected', '', true)
            }}
          >
            Add
          </button>
        )}
      </div>
      <div className="flex text-xs text-gray-400">
        <span>
          By {section?.createdBy?.firstName} {section?.createdBy?.lastName}
        </span>
        <span className="flex">
          <Icon className="text-base" icon={'mdi:circle-small'} />
          {Moment(section?.createdAt).format('DD MMM YY')}
        </span>
      </div>
      <div className="flex text-xs text-gray-400">
        Total Questions: {section?._count?.questions}
      </div>
      <hr className="h-px w-full border-0 bg-gray-300" />
      <div className="flex gap-4 pt-1">
        <div>
          <label
            htmlFor="noOfQuestion"
            className="text-xs font-medium text-gray-600"
          >
            Total Questions
          </label>
          <input
            type="number"
            id="noOfQu"
            name="noOfQuestion"
            value={section.totalQuestions}
            onChange={(e) =>
              updateThisSection('totalQuestions', e.target.value)
            }
            className={`mt-1 h-11 w-full rounded-lg border border-gray-300 px-3 text-xs ${
              section.isSelected ? 'bg-white' : 'bg-gray-200'
            }`}
            placeholder="Total Questions"
            disabled={!section.isSelected}
          />
        </div>
        <div>
          <label
            htmlFor="totalTime"
            className="text-xs font-medium text-gray-600"
          >
            Total Time
          </label>
          <input
            type="number"
            id="time"
            name="totalTime"
            value={section.time}
            onChange={(e) => updateThisSection('time', e.target.value)}
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
