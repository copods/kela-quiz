import { useLoaderData } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import type { Invites } from '~/interface/Interface'
import InvitedMembersListItems from './InvitedMembersListItems'

const InvitedMembersList = ({
  actionStatus,
}: {
  actionStatus: string | undefined
}) => {
  const membersData = useLoaderData()
  const { t } = useTranslation()
  const invitedMembers = membersData.invitedMembers
  return (
    <div className="grid grid-cols-12 rounded-lg shadow-base">
      <div className="col-span-full grid grid-cols-10 rounded-lg border border-solid border-gray-200 bg-white">
        <div className="col-span-full grid grid-cols-10 gap-3 bg-gray-100 py-4 px-6">
          <h1 className="col-span-2 pl-4 text-sm text-gray-500">
            {t('commonConstants.email')}
          </h1>
          <h1 className="col-span-3 pl-4 text-sm text-gray-500">
            {t('members.role')}
          </h1>
          <h1 className="col-span-2 pl-4 text-sm text-gray-500">
            {t('members.role')}
          </h1>
          <h1 className="col-span-2 pl-4 text-sm text-gray-500">
            {t('members.addedOn')}
          </h1>
          <h1 className="col-span-1 pl-4 text-sm text-gray-500">
            {t('members.action')}
          </h1>
        </div>
        {invitedMembers.map((invitedMembers: Invites, index: number) => (
          <div key={index} className="memberRow col-span-10 grid">
            <InvitedMembersListItems
              actionStatus={actionStatus}
              invitedMembers={invitedMembers}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
export default InvitedMembersList
