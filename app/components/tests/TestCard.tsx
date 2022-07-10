import { Icon } from "@iconify/react"
import moment from "moment"

const TestCard = ({ name, createdBy, createdAt, description }: { name: string, createdBy: string, createdAt: Date, description: string }) => {

  return (
    <div className="rounded-lg p-4 bg-white border border-gray-200">
      <div className="flex justify-between items-center pb-1">
        <h2 className="text-xl font-semibold text-gray-700">{name}</h2>
        <Icon className="text-2xl text-gray-600" icon={'mdi:dots-vertical'} />
      </div>
      <div className="text-xs text-gray-400 flex pb-4">
        <span>By {createdBy}</span>
        <span className="flex">
          <Icon className="text-base" icon={'mdi:circle-small'} />
          {moment(createdAt).format('DD MMM YY')}
        </span>
      </div>
      <div className="text-xs text-gray-400 flex" dangerouslySetInnerHTML={{ __html: description }}>
      </div>
    </div>
  )
}

export default TestCard