import type { User, Role } from '~/interface/Interface'
import MemberListItem from './MemberListItem'
import { commonConstants, commonMembers } from '~/constants/common.constants'
export default function MembersList({
  data,
  loggedInUser,
  actionStatus,
}: {
  data: User[]
  loggedInUser: string | undefined
  actionStatus: string | undefined
}) {
  return (
    <div className="grid grid-cols-12  bg-[#F9FAFB] ">
      <div className="col-span-full grid grid-cols-10 rounded-lg border-[1px] border-solid border-[#E5E7EB] bg-white">
        <div className="col-span-full grid grid-cols-10 py-4 px-12">
          <h1 className="col-span-2 text-sm  leading-4 text-gray-500">
            {commonConstants.name}
          </h1>
          <h1 className="col-span-3 text-sm leading-4 text-gray-500">
            {commonMembers.email}
          </h1>
          <h1 className="col-span-2 text-sm leading-4 text-gray-500">
            {commonMembers.role}
          </h1>
          <h1 className="col-span-2 text-sm leading-4 text-gray-500">
            {commonMembers.addedOn}
          </h1>
          <h1 className="col-span-1 text-sm leading-4 text-gray-500">
            {commonMembers.action}
          </h1>
        </div>
        {data.map((user: User & { role?: Role }) => (
          <div key={user.id} className="memberRow col-span-10 grid">
            <MemberListItem
              user={user}
              loggedInUser={loggedInUser == user.id}
              actionStatus={actionStatus}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
