import { Icon } from '@iconify/react'
import moment from 'moment'
import { useState } from 'react'
import InviteCandidatePopup from './InviteCandidatePopup'

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
  const [candidatePopupOpen, onPopupToggle] = useState(false)

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between pb-1">
        <h2 className="text-xl font-semibold text-gray-700">{name}</h2>
        <Icon className="text-2xl text-gray-600" icon={'mdi:dots-vertical'} />
      </div>
      <div className="flex pb-4 text-xs text-gray-500">
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
      <div className="flex flex-row gap-4 text-xs text-primary">
        <span className="cursor-pointer">First Button</span>
        <span className="cursor-pointer">Second Button</span>
        <span className="cursor-pointer" onClick={() => onPopupToggle(true)}>
          Invite Candidate
        </span>
      </div>
      <InviteCandidatePopup
        open={candidatePopupOpen}
        setOpen={onPopupToggle}
        testName={name}
        testId={id}
      />
    </div>
  )
}

export default TestCard
