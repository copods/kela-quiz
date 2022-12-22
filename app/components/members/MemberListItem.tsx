import { Icon } from '@iconify/react'
import type { Invites, Role, User } from '~/interface/Interface'
import DeletePopUp from '../common-components/DeletePopUp'
import { useEffect, useState } from 'react'
import { useSubmit } from '@remix-run/react'
import { t } from 'i18next'
import moment from 'moment'

import Badge from '~/components/common-components/Badge'

export default function MemberListItem({
  user,
  loggedInUser,
  actionStatus,
  owner,
}: {
  user: User & { role?: Role; invites: Invites }
  loggedInUser: boolean
  actionStatus: string | undefined
  owner: boolean
}) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (actionStatus == 'Member Added Successfully..!') {
      setOpen(false)
    }
  }, [actionStatus])
  const openPopUp = () => {
    if (!loggedInUser) setOpen(!open)
  }
  const submit = useSubmit()
  const deleteUser = () => {
    submit({ action: 'delete', id: user.id }, { method: 'post' })
  }
  return (
    <div className="col-span-full grid grid-cols-10">
      <div className="memberRows col-gap-3 col-span-full grid grid-cols-10 border-t border-solid border-gray-200 px-6 py-4">
        <div className="break-word col-span-2 flex gap-1.5 overflow-ellipsis pl-4 text-base text-gray-700">
          <div>
            {user.firstName} {user.lastName}
          </div>
          <div>{owner ? <Badge>{t('members.owner')}</Badge> : null}</div>
        </div>
        <div className="memberMail col-span-3 flex overflow-ellipsis break-all pl-4">
          <span className="text-base text-gray-700">{user.email}</span>
        </div>
        <div className="break-word col-span-2 flex overflow-ellipsis pl-4">
          <span className="text-base text-gray-700">{user?.role?.name}</span>
        </div>
        <div className="col-span-2 flex overflow-ellipsis break-all pl-4">
          <span className="text-base text-gray-700">
            {moment(user.invites?.joinedAt).format('DD MMMM YY')}
          </span>
        </div>
        <div className="col-span-1 flex gap-4 pl-4">
          <Icon
            id="delete-button"
            tabIndex={0}
            onClick={openPopUp}
            onKeyUp={(e) => {
              if (e.key === 'Enter') openPopUp()
            }}
            icon="ic:outline-delete-outline"
            className={`h-6 w-6 cursor-pointer text-red-500  ${
              loggedInUser && 'cursor-not-allowed text-red-200'
            }`}
          />
        </div>
        <DeletePopUp
          setOpen={setOpen}
          open={open}
          onDelete={deleteUser}
          deleteItem={`${user.firstName} ${user.lastName}`}
          deleteItemType={t('members.member')}
        />
      </div>
    </div>
  )
}
