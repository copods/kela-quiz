import { Icon } from '@iconify/react'
import { Link } from '@remix-run/react'
import Moment from 'moment'
import type { Question, Section, User } from '@prisma/client'

const SectionCard = ({
  section,
  selectedSectionId,
  setSelectedSectionId,
}: {
  section: Section & { questions: Question[]; createdBy: User }
  selectedSectionId: string
  setSelectedSectionId: (e: string) => void
}) => {
  return (
    <div onClick={() => setSelectedSectionId(section.id)}>
      <Link
        id={selectedSectionId}
        to={'/sections/' + section.id}
        className={`flex flex-col gap-2 rounded-2xl p-6 ${
          section.id === selectedSectionId
            ? 'border border-l-8 border-transparent border-primary bg-white pl-[17px] shadow-md'
            : 'border border-gray-200 bg-gray-100'
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-700">
            {section.name}
          </h2>
          <Icon className="text-2xl text-gray-600" icon={'mdi:dots-vertical'} />
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
          Total Questions:{' '}
          {section?.questions?.length ? section?.questions?.length : 0}
        </div>
      </Link>
    </div>
  )
}

export default SectionCard
