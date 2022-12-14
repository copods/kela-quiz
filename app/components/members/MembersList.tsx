import type { User, Role, Invites } from '~/interface/Interface'
import MemberListItem from './MemberListItem'
import { useLoaderData } from '@remix-run/react'
import { useTranslation } from 'react-i18next'

export default function MembersList({
  actionStatus,
}: {
  actionStatus: string | undefined
}) {
  const { t } = useTranslation()

  const membersData = useLoaderData()
  const users = membersData.users

  const loggedInUser = membersData.userId
  const currentWorkspaceId = membersData.currentWorkspaceId
  const currentWorkspaceUserId = membersData.workspaces.find(
    // @TODO: Need to check if there's already Interface for single workspace object
    (el: any) => el.workspaceId === currentWorkspaceId
  ).workspace.createdById
  return (
    <div className="grid grid-cols-12 rounded-lg shadow-base">
      <div className="col-span-full grid grid-cols-10 rounded-lg border border-solid border-gray-200 bg-white">
        <div className="col-gap-3 col-span-full grid grid-cols-10 bg-gray-100 py-4 px-6">
          <h1 className="col-span-2 pl-4 text-sm text-gray-500">
            {t('commonConstants.name')}
          </h1>
          <h1 className="col-span-3 pl-4 text-sm text-gray-500">
            {t('commonConstants.email')}
          </h1>
          <h1 className="col-span-2 pl-4 text-sm text-gray-500">
            {t('members.role')}
          </h1>
          <h1 className="col-span-2 pl-4 text-sm text-gray-500">
            {t('commonConstants.joinedOn')}
          </h1>
          <h1 className="col-span-1 pl-4 text-sm text-gray-500">
            {t('members.action')}
          </h1>
        </div>
        {users.map((user: User & { role?: Role; invites: Invites }) => {
          return (
            <div key={user.id} className="memberRow col-span-10 grid">
              <MemberListItem
                user={user}
                loggedInUser={loggedInUser === user.id}
                actionStatus={actionStatus}
                owner={currentWorkspaceUserId === user.id}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
