import type { User, Role } from '~/interface/Interface'
import MemberListItem from './MemberListItem'
import { commonConstants, members } from '~/constants/common.constants'
import { useLoaderData } from '@remix-run/react'

export default function MembersList({
  actionStatus,
}: {
  actionStatus: string | undefined
}) {
  const membersData = useLoaderData()
  const users = membersData.users
  const loggedInUser = membersData.userId
  return (
    <div className="grid grid-cols-12 rounded-lg shadow-base">
      <div className="col-span-full grid grid-cols-10 rounded-lg border border-solid border-gray-200 bg-white">
        <div className="col-span-full grid grid-cols-10 bg-tableHeader py-4 px-12">
          <h1 className="col-span-2 text-sm text-gray-500">
            {commonConstants.name}
          </h1>
          <h1 className="col-span-3 text-sm text-gray-500">{members.email}</h1>
          <h1 className="col-span-2 text-sm text-gray-500">{members.role}</h1>
          <h1 className="col-span-2 text-sm text-gray-500">
            {members.addedOn}
          </h1>
          <h1 className="col-span-1 text-sm text-gray-500">{members.action}</h1>
        </div>
        {users.map((user: User & { role?: Role }) => (
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
