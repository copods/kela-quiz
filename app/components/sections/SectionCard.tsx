import { Icon } from "@iconify/react"
import { Link } from "@remix-run/react"
import Moment from 'moment';
import type { Section, User } from "@prisma/client";

const SectionCard = ({ section, selectedSectionId, setSelectedSectionId }: { section: (Section & { _count: { questions: number }; createdBy: User }), selectedSectionId: string, setSelectedSectionId: (e: string) => void }) => {

  return (
    <div onClick={() => setSelectedSectionId(section.id)}>
      <Link to={'/sections/' + section.id} className={`rounded-2xl p-6 flex flex-col gap-2 ${section.id === selectedSectionId ? 'bg-white border pl-[17px] border-transparent shadow-md border-l-8 border-primary' : 'bg-gray-100 border border-gray-200'}`}>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-700">{section.name}</h2>
          <Icon className="text-2xl text-gray-600" icon={'mdi:dots-vertical'} />
        </div>
        <div className="text-xs text-gray-400 flex">
          <span>By {section?.createdBy?.firstName} {section?.createdBy?.lastName}</span>
          <span className="flex">
            <Icon className="text-base" icon={'mdi:circle-small'} />
            {Moment(section?.createdAt).format('DD MMM YY')}
          </span>
        </div>
        <div className="text-xs text-gray-400 flex">
          Total Questions: {section?._count.questions}
        </div>
      </Link>
    </div>
  )
}

export default SectionCard