import { Icon } from '@iconify/react'
import moment from 'moment'

const SectionCard = ({
  name,
  questionsCount,
  createdBy,
  createdAt,
}: {
  name: string
  questionsCount: number
  createdBy: string
  createdAt: string
}) => {
  return (
    <div className="flex flex-col gap-2 rounded-lg p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-700">{name}</h2>
        <Icon className="text-2xl text-gray-600" icon={'mdi:dots-vertical'} />
      </div>
      <div className="flex text-xs text-gray-400">
        <span>By {createdBy}</span>
        <span className="flex">
          <Icon className="text-base" icon={'mdi:circle-small'} />
          {moment(createdAt).format('DD MMM YY')}
        </span>
      </div>
      <div className="flex text-xs text-gray-400">
        Total Questions: {questionsCount}
      </div>
    </div>
  )
}

export default SectionCard
