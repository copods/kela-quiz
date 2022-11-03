import { Icon } from '@iconify/react'
import { useSubmit } from '@remix-run/react'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Invites } from '~/interface/Interface'
import DeletePopUp from '../DeletePopUp'

const InvitedMembersListItems = ({
  invitedMembers,
  actionStatus,
}: {
  invitedMembers: Invites
  actionStatus: string | undefined
}) => {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (actionStatus == 'Member Added Successfully..!') {
      setOpen(false)
    }
  }, [actionStatus])
  const submit = useSubmit()
  const openPopUp = () => {
    setOpen(!open)
  }
  const { t } = useTranslation()
  const deleteUser = () => {
    submit(
      { action: 'deleteInviteMember', id: invitedMembers.id },
      { method: 'post' }
    )
  }
  return (
    <div className="col-span-full grid grid-cols-10">
      <div className="inviteMemberRow col-span-full grid grid-cols-10 gap-3 border-t border-solid border-gray-200 px-6 py-4">
        <div className="break-word col-span-2 overflow-ellipsis pl-4">
          <span className="memberName text-base text-gray-700">
            {invitedMembers.email}
          </span>
        </div>
        <div className="memberMail col-span-3 overflow-ellipsis break-all pl-4">
          <span className="text-base text-gray-700">
            {invitedMembers?.role.name}
          </span>
        </div>
        <div className="break-word col-span-2 overflow-ellipsis pl-4">
          <span className="text-base text-gray-700">
            {invitedMembers.invitedForWorkspace.name}
          </span>
        </div>
        <div className="col-span-2 overflow-ellipsis break-all pl-4">
          <span className="text-base text-gray-700">
            {invitedMembers?.joinedAt === null
              ? 'not joined yet'
              : moment(invitedMembers?.joinedAt).format('DD MMMM YY')}
          </span>
        </div>
        <div className="col-span-1 flex justify-between pl-4">
          <Icon
            id="delete-button"
            tabIndex={0}
            onClick={openPopUp}
            onKeyUp={(e) => {
              if (e.key === 'Enter') openPopUp()
            }}
            icon="ic:outline-delete-outline"
            className="h-6 w-6 cursor-pointer text-red-500 "
          />
        </div>
        <DeletePopUp
          setOpen={setOpen}
          open={open}
          onDelete={deleteUser}
          deleteItem={`${invitedMembers.email}`}
          deleteItemType={t('members.invitedMember')}
        />
      </div>
    </div>
  )
}
export default InvitedMembersListItems
