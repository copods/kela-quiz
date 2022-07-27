import { Icon } from '@iconify/react'
import { Link } from '@remix-run/react'

import moment from 'moment'

const TestCard = ({
  id,
  name,
  createdBy,
  createdAt,
  description,
}: {
  id: string
  name: string
  createdBy: string
  createdAt: Date
  description: string
}) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between pb-1">
        <h2 className="text-xl font-semibold text-gray-700">{name}</h2>
        <Icon className="text-2xl text-gray-600" icon={'mdi:dots-vertical'} />
      </div>
      <div className="flex pb-4 text-xs text-gray-400">
        <span>By {createdBy}</span>
        <span className="flex">
          <Icon className="text-base" icon={'mdi:circle-small'} />
          {moment(createdAt).format('DD MMM YY')}
        </span>
      </div>
      <div
        className="ql-editor h-fit"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
      <div>
        <Link to={`/tests/${id}`}>
          <span id="preview" className="cursor-pointer text-xl text-primary">
            Preview
          </span>
        </Link>
      </div>
    </div>
  )
}

export default TestCard
