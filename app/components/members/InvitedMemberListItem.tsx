import { useSubmit } from '@remix-run/react'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Invites } from '~/interface/Interface'
import DeletePopUp from '../common_components/DeletePopUp'
import memberResendIcon from '~/../public/assets/resend-member-invitation.svg'

const InvitedMembersListItem = ({
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

  const { t } = useTranslation()
  const deleteUser = () => {
    submit(
      { action: 'deleteInviteMember', id: invitedMembers.id },
      { method: 'post' }
    )
  }
  const resendMail = () => {
    let data = {
      id: invitedMembers.id,
      action: 'resendMember',
    }
    submit(data, {
      method: 'post',
    })
  }

  return (
    <div className="col-span-full grid grid-cols-10">
      <div className="inviteMemberRow col-gap-3 col-span-full grid grid-cols-10 border-t border-solid border-gray-200 px-6 py-4">
        <div className="col-span-3 overflow-ellipsis break-all pl-4">
          <span className="memberName text-base text-gray-700">
            {invitedMembers.email}
          </span>
        </div>
        <div className="memberMail col-span-2 overflow-ellipsis break-all pl-4">
          <span className="text-base text-gray-700">
            {invitedMembers?.role.name}
          </span>
        </div>
        <div className="break-word col-span-2 overflow-ellipsis pl-4">
          <span className="text-base text-gray-700">
            {invitedMembers?.invitedById?.firstName}{' '}
            {invitedMembers?.invitedById?.lastName}
          </span>
        </div>
        <div className="col-span-2 overflow-ellipsis break-all pl-4">
          <span className="text-base text-gray-700">
            {moment(invitedMembers?.invitedOn).format('DD MMMM YY')}
          </span>
        </div>
        <div className="col-span-1 flex justify-start gap-4 pl-4">
          <span
            tabIndex={0}
            role="button"
            onKeyUp={(e) => {
              if (e.key === 'Enter') resendMail()
            }}
            onClick={() => resendMail()}
            className="cursor-pointer opacity-100"
          >
            <img
              src={memberResendIcon}
              alt="reinvite"
              id="resend-member-invite"
            />
          </span>
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
export default InvitedMembersListItem
