import { Icon } from '@iconify/react'
import moment from 'moment'
import { sectionsConstants } from '~/constants/common.constants'
const SectionCard = ({
  name,
  isActive,
  questionsCount,
  createdBy,
  createdAt,
}: {
  name: string
  isActive: boolean
  questionsCount: number
  createdBy: string
  createdAt: string
}) => {
  return (
    <div
      className={`section-card flex flex-col gap-2 rounded-lg p-6 ${
        isActive
          ? 'border border-l-8 border-transparent border-l-primary bg-white pl-[17px] shadow-md'
          : 'border border-gray-300 bg-gray-100'
      }`}
      id="section-card"
    >
      <div className="flex items-center justify-between">
        <h2 id="sctionName" className="text-xl font-semibold text-gray-700">
          {name}
        </h2>
        <div className="flex">
          <Icon className="text-2xl text-gray-600" icon={'mdi:dots-vertical'} />
        </div>
      </div>
      <div className="flex text-xs text-gray-400">
        <span>By {createdBy}</span>
        <span id="sectionDate" className="created-by-date flex">
          <Icon className="text-base" icon={'mdi:circle-small'} />
          {moment(createdAt).format('DD MMM YY')}
        </span>
      </div>
      <div className="flex text-xs text-gray-400">
        {sectionsConstants.totalQuestions} {questionsCount}
      </div>
    </div>
  )
}

export default SectionCard
