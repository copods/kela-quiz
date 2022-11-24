import { useLoaderData } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import type { Invites } from '~/interface/Interface'
import InvitedMembersListItems from './InvitedMemberListItem'

const InvitedMembersList = ({
  actionStatus,
}: {
  actionStatus: string | undefined
}) => {
  const membersData = useLoaderData()
  const { t } = useTranslation()

  const invitedMember = membersData.invitedMembers
  return (
    <>
      {invitedMember?.length !== 0 && (
        <div className="flex flex-col gap-4 text-2xl">
          <h1
            tabIndex={0}
            role={t('members.invitedMember')}
            aria-label={t('members.invitedMember')}
            id="invited-member-heading"
          >
            {t('members.invitedMember')}
          </h1>

          <div className="grid grid-cols-12 rounded-lg shadow-base">
            <div className="col-span-full grid grid-cols-10 rounded-lg border border-solid border-gray-200 bg-white">
              <div className="col-span-full grid grid-cols-10 gap-3 bg-gray-100 py-4 px-6">
                <h1 className="col-span-3 pl-4 text-sm text-gray-500">
                  {t('commonConstants.email')}
                </h1>
                <h1 className="col-span-2 pl-4 text-sm text-gray-500">
                  {t('members.role')}
                </h1>
                <h1 className="col-span-2 pl-4 text-sm text-gray-500">
                  {t('resultConstants.invitedBy')}
                </h1>
                <h1 className="col-span-2 pl-4 text-sm text-gray-500">
                  {t('members.invitedOn')}
                </h1>
                <h1 className="col-span-1 pl-4 text-sm text-gray-500">
                  {t('members.action')}
                </h1>
              </div>
              {invitedMember.map((invitedMembers: Invites, index: number) => (
                <div key={index} className="memberRow col-span-10 grid">
                  <InvitedMembersListItems
                    actionStatus={actionStatus}
                    invitedMembers={invitedMembers}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default InvitedMembersList
