import { Icon } from '@iconify/react'
import type { Role, User } from '~/interface/Interface'

import moment from 'moment'
import DeletePopUp from '../DeletePopUp'
import { useEffect, useState } from 'react'
import { useSubmit } from '@remix-run/react'
import { members } from '~/constants/common.constants'

export default function MemberListItem({
  user,
  loggedInUser,
  actionStatus,
}: {
  user: User & { role?: Role }
  loggedInUser: boolean
  actionStatus: string | undefined
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
    submit({ deleteMember: 'delete', id: user.id }, { method: 'post' })
  }
  return (
    <div className="col-span-full grid grid-cols-10">
      <div className="memberRows col-span-full grid grid-cols-10 border-t border-solid border-gray-200 px-6 py-4">
        <div className="col-span-2 overflow-ellipsis break-all pl-4">
          <span className="memberName text-base text-gray-700">
            {user.firstName} {user.lastName}
          </span>
        </div>
        <div className="memberMail col-span-3 overflow-ellipsis break-all pl-4">
          <span className="text-base text-gray-700">{user.email}</span>
        </div>
        <div className="col-span-2 overflow-ellipsis break-all pl-4">
          <span className="text-base text-gray-700">{user?.role?.name}</span>
        </div>
        <div className="col-span-2 overflow-ellipsis break-all pl-4">
          <span className="text-base text-gray-700">
            {moment(user?.createdAt).format('DD MMMM YY')}
          </span>
        </div>
        <div className="col-span-1 pl-4">
          <Icon
            id="delete-button"
            tabIndex={0}
            onClick={openPopUp}
            icon="ic:outline-delete-outline"
            className={`h-6 w-6 cursor-pointer text-red-500  ${
              loggedInUser && 'cursor-not-allowed text-red-300'
            }`}
          />
        </div>
        <DeletePopUp
          setOpen={setOpen}
          open={open}
          onDelete={deleteUser}
          deleteItem={`${user.firstName} ${user.lastName}`}
          deleteItemType={members.member}
        />
      </div>
    </div>
  )
}
