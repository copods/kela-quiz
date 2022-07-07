import { Icon } from "@iconify/react"
import moment from 'moment';

const SectionCard = ({ name, questionsCount, createdBy, createdAt }: { name: string, questionsCount: number, createdBy: string, createdAt: string }) => {

  return (
    <div className="rounded-2xl p-6 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-700">{name}</h2>
        <Icon className="text-2xl text-gray-600" icon={'mdi:dots-vertical'} />
      </div>
      <div className="text-xs text-gray-400 flex">
        <span>By {createdBy}</span>
        <span className="flex">
          <Icon className="text-base" icon={'mdi:circle-small'} />
          {moment(createdAt).format('DD MMM YY')}
        </span>
      </div>
      <div className="text-xs text-gray-400 flex">
        Total Questions: {questionsCount}
      </div>
    </div>
  )
}

export default SectionCard